// src/components/ChatModal.jsx - Enhanced Version
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  setDoc,
  getDoc 
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function ChatModal({ isOpen, onClose, recipientName, recipientId }) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  // Generate chat ID (consistent between users)
  const chatId = [currentUser?.uid, recipientId].sort().join('_');

  // Get display name for current user (from email)
  const getCurrentUserDisplayName = () => {
    if (currentUser?.email) {
      const emailName = currentUser.email.split('@')[0];
      return emailName.replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return 'User';
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen to messages in real-time
  useEffect(() => {
    if (!isOpen || !currentUser || !recipientId) {
      setMessages([]);
      setError("");
      return;
    }

    console.log("Setting up message listener for chatId:", chatId);
    console.log("Current user:", currentUser.uid, "Email:", currentUser.email);
    console.log("Recipient ID:", recipientId, "Name:", recipientName);
    
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log("Messages snapshot received:", snapshot.size, "messages");
        const messageList = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date()
          };
        });
        
        console.log("Processed messages:", messageList);
        setMessages(messageList);
        setError("");
      }, 
      (error) => {
        console.error("Error listening to messages:", error);
        setError(`Failed to load messages: ${error.message}`);
      }
    );

    return () => {
      console.log("Cleaning up message listener");
      unsubscribe();
    };
  }, [isOpen, currentUser, recipientId, chatId, recipientName]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading || !currentUser) return;

    const messageText = newMessage.trim();
    console.log("Sending message:", messageText);
    setLoading(true);
    setError("");
    
    try {
      const currentUserDisplayName = getCurrentUserDisplayName();
      
      // First, ensure chat document exists
      const chatRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatRef);
      
      const chatData = {
        participants: [currentUser.uid, recipientId],
        participantNames: {
          [currentUser.uid]: currentUserDisplayName,
          [recipientId]: recipientName
        },
        lastMessage: messageText,
        lastMessageTime: serverTimestamp()
      };

      if (!chatDoc.exists()) {
        console.log("Creating new chat document");
        chatData.createdAt = serverTimestamp();
      }

      await setDoc(chatRef, chatData, { merge: true });
      console.log("Chat document updated");

      // Add message to subcollection
      const messagesRef = collection(db, "chats", chatId, "messages");
      const messageDoc = await addDoc(messagesRef, {
        text: messageText,
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        senderName: currentUserDisplayName,
        recipientId: recipientId,
        recipientName: recipientName,
        createdAt: serverTimestamp()
      });

      console.log("Message sent successfully:", messageDoc.id);
      setNewMessage("");
      
    } catch (error) {
      console.error("Error sending message:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      setError(`Failed to send message: ${error.message}`);
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  const currentUserDisplayName = getCurrentUserDisplayName();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col m-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                {recipientName.split(' ').map(name => name[0]).join('').toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{recipientName}</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Debug Info (Remove in production) */}
          <div className="px-4 py-2 bg-gray-50 text-xs text-gray-600 border-b">
            <p>You ({currentUserDisplayName}): {currentUser?.uid?.substring(0, 8)}...</p>
            <p>Chatting with ({recipientName}): {recipientId?.substring(0, 8)}...</p>
            <p>Chat ID: {chatId?.substring(0, 16)}...</p>
            <p>Messages: {messages.length}</p>
            {error && <p className="text-red-600">Error: {error}</p>}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Start your conversation with {recipientName}!</p>
                <p className="text-sm mt-2">Send your first message below</p>
              </div>
            ) : (
              messages.map((message) => {
                const isFromCurrentUser = message.senderId === currentUser?.uid;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        isFromCurrentUser
                          ? 'bg-blue-500 text-white rounded-br-sm'
                          : 'bg-gray-200 text-gray-800 rounded-bl-sm'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-between mt-1 ${
                        isFromCurrentUser ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        <p className="text-xs">
                          {message.createdAt?.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                        {isFromCurrentUser && (
                          <svg className="w-3 h-3 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Message ${recipientName}...`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}