// src/services/chatService.js
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  where,
  getDocs,
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase/config";

// Create or get existing chat between two users
export const createOrGetChat = async (user1Id, user2Id, user1Name, user2Name) => {
  // Create a consistent chat ID regardless of who initiates
  const chatId = [user1Id, user2Id].sort().join('_');
  
  try {
    // Create chat document with participant info
    const chatRef = doc(db, 'chats', chatId);
    await setDoc(chatRef, {
      participants: [user1Id, user2Id],
      participantNames: {
        [user1Id]: user1Name,
        [user2Id]: user2Name
      },
      lastMessage: "",
      lastMessageTime: serverTimestamp(),
      createdAt: serverTimestamp()
    }, { merge: true });
    
    return chatId;
  } catch (error) {
    console.error("Error creating/getting chat:", error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (chatId, senderId, senderName, message) => {
  try {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      senderId,
      senderName,
      message: message.trim(),
      timestamp: serverTimestamp(),
      read: false
    });

    // Update last message in chat document
    const chatRef = doc(db, 'chats', chatId);
    await setDoc(chatRef, {
      lastMessage: message.trim(),
      lastMessageTime: serverTimestamp()
    }, { merge: true });

  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Listen to messages in real-time
export const listenToMessages = (chatId, callback) => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(messages);
  });
};

// Get user's chat list
export const getUserChats = async (userId) => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting user chats:", error);
    return [];
  }
};