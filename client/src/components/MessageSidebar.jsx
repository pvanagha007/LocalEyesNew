// src/components/MessageSidebar.jsx - Enhanced Version
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import ChatModal from "./ChatModal";

export default function MessageSidebar({ onClose }) {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen to user's chats in real-time
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    console.log("Setting up chats listener for user:", currentUser.uid);
    
    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", currentUser.uid),
      orderBy("lastMessageTime", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastMessageTime: doc.data().lastMessageTime?.toDate() || new Date()
      }));
      
      console.log("Chats updated:", chatList);
      setChats(chatList);
      setLoading(false);
    }, (error) => {
      console.error("Error listening to chats:", error);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const openChat = (chat) => {
    // Find the other participant
    const otherParticipantId = chat.participants.find(id => id !== currentUser.uid);
    const otherParticipantName = chat.participantNames[otherParticipantId] || "Unknown User";
    
    console.log("Opening chat with:", { otherParticipantId, otherParticipantName });
    
    setSelectedChat({
      id: otherParticipantId,
      name: otherParticipantName
    });
    setChatModalOpen(true);
  };

  const closeChatModal = () => {
    setChatModalOpen(false);
    setSelectedChat(null);
  };

  const formatTime = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <>
      {/* Chat Modal */}
      <ChatModal
        isOpen={chatModalOpen}
        onClose={closeChatModal}
        recipientName={selectedChat?.name || ''}
        recipientId={selectedChat?.id || ''}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-14 w-80 h-[calc(100vh-3.5rem)] bg-white shadow-xl border-l border-gray-200 z-40">
        <div className="p-4 border-b border-gray-200 bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-600">Messages</h3>
              <p className="text-sm text-gray-600">{chats.length} conversation{chats.length !== 1 ? 's' : ''}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="overflow-y-auto h-full">
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Loading messages...</p>
            </div>
          ) : chats.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="font-medium">No messages yet</p>
              <p className="text-sm mt-2">Click "Message" on any review to start chatting with local guides!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {chats.map((chat) => {
                const otherParticipantId = chat.participants.find(id => id !== currentUser.uid);
                const otherParticipantName = chat.participantNames?.[otherParticipantId] || "Unknown User";
                
                return (
                  <div
                    key={chat.id}
                    onClick={() => openChat(chat)}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {otherParticipantName.split(' ').map(name => name[0]).join('').toUpperCase()}
                      </div>
                      
                      {/* Chat Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-green-600 truncate group-hover:text-green-700">
                              {otherParticipantName}
                            </h4>
                            <p className="text-sm text-gray-600 truncate mt-1">
                              {chat.lastMessage || "No messages yet"}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                            {formatTime(chat.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Debug Info (Remove in production) */}
        <div className="p-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          <p>User: {currentUser?.email}</p>
          <p>UID: {currentUser?.uid?.substring(0, 12)}...</p>
        </div>
      </div>
    </>
  );
}