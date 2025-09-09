// src/pages/Dashboard.jsx - Updated with MessageSidebar Integration
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ChatModal from "../components/ChatModal";
import MessageSidebar from "../components/MessageSidebar";

// Mock data for destinations and reviews
const destinationData = [
  {
    id: 1,
    location: "Rome, Italy",
    mainImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop"
    ],
    reviewer: "Test Guide",
    reviewerId: "Ua6z1uTcGJQoo8ucGl6vePvYlDn2", // Test Guide UID
    reviewText: "A local guide in Rome, I have shown many the hidden gems beyond the Colosseum - secret underground passages and a local trattoria that's been family-run for 200 years. Message me for an absolutely magical experience!",
    rating: 5,
    timeAgo: "2 days ago"
  },
  {
    id: 2,
    location: "Agra, India", 
    mainImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop"
    ],
    reviewer: "Raj Veerendar",
    reviewerId: "guide_raj_veerendar_002",
    reviewText: "I guided Sarah Williams through the sunrise view of Taj Mahal and shared stories about its architecture that you won't find in guidebooks. The early morning crowd-free experience was priceless.",
    rating: 5,
    timeAgo: "4 days ago"
  },
  {
    id: 3,
    location: "Cusco, Peru",
    mainImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&h=600&fit=crop"
    ],
    reviewer: "Diego Martinez",
    reviewerId: "guide_diego_martinez_003",
    reviewText: "I helped Ana acclimatize properly before Machu Picchu and took her through ancient Inca trails that tourists never see. Her knowledge of Quechua culture was incredible.",
    rating: 4,
    timeAgo: "1 week ago"
  },
  {
    id: 4,
    location: "New York, USA",
    mainImage: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop"
    ],
    reviewer: "Emily Johnson",
    reviewerId: "guide_emily_johnson_004",
    reviewText: "I showed Jake NYC like a true local - from hidden speakeasies near the Statue of Liberty to the best pizza slice in Brooklyn. Felt like I had a friend in the city!",
    rating: 5,
    timeAgo: "3 days ago"
  },
  {
    id: 5,
    location: "Singapore",
    mainImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508964942900-2662e8e2fea0?w=800&h=600&fit=crop"
    ],
    reviewer: "Li Wei",
    reviewerId: "guide_li_wei_005",
    reviewText: "I guided Priya through Singapore's amazing food scene and green spaces around Changi. The hawker center recommendations were spot-on!",
    rating: 4,
    timeAgo: "5 days ago"
  }
];

// Star Rating Component
function StarRating({ rating }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
    </div>
  );
}

// Image Carousel Component
function ImageCarousel({ images, location }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-80 bg-gray-200 rounded-lg overflow-hidden group">
      <img 
        src={images[currentImage]} 
        alt={location}
        className="w-full h-full object-cover"
      />
      
      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Image indicators */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImage ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Location overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white text-lg font-semibold">{location}</h3>
      </div>
    </div>
  );
}

// Review Card Component with Message Button
function ReviewCard({ reviewer, reviewText, rating, timeAgo, reviewerId, onMessage }) {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-4">
        {/* Profile Picture Placeholder */}
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {reviewer.split(' ').map(name => name[0]).join('')}
        </div>
        
        {/* Review Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold text-green-600">{reviewer}</h4>
              <p className="text-sm text-gray-500">{timeAgo}</p>
            </div>
            <StarRating rating={rating} />
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">{reviewText}</p>
          
          {/* Engagement buttons */}
          <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">Like</span>
            </button>
            
            {/* Message Button */}
            <button 
              onClick={() => onMessage(reviewer, reviewerId)}
              className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm">Message</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showMessageSidebar, setShowMessageSidebar] = useState(false);
  
  // Chat Modal State
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState({ name: '', id: '' });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Handle Message Button Click from Review Card
  const handleMessageGuide = (guideName, guideId) => {
    console.log("Opening chat with:", { guideName, guideId });
    setSelectedGuide({ name: guideName, id: guideId });
    setChatModalOpen(true);
    // Close the sidebar when opening a chat from review card
    setShowMessageSidebar(false);
  };

  const closeChatModal = () => {
    setChatModalOpen(false);
    setSelectedGuide({ name: '', id: '' });
  };

  const closeMessageSidebar = () => {
    setShowMessageSidebar(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Chat Modal */}
      <ChatModal 
        isOpen={chatModalOpen}
        onClose={closeChatModal}
        recipientName={selectedGuide.name}
        recipientId={selectedGuide.id}
      />

      {/* Message Sidebar */}
      {showMessageSidebar && (
        <MessageSidebar onClose={closeMessageSidebar} />
      )}

      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">LocalEyes</span>
            </div>
            
            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Messages Icon */}
              <button 
                onClick={() => setShowMessageSidebar(!showMessageSidebar)}
                className="relative p-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              
              {/* Profile Icon */}
              <div className="relative group">
                <button className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-green-600 truncate">{currentUser?.email}</p>
                    <p className="text-xs text-gray-500 truncate">UID: {currentUser?.uid?.substring(0, 8)}...</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${showMessageSidebar ? 'mr-80' : ''}`}>
        {/* Welcome Section */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Welcome back, {currentUser?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600">Discover amazing destinations and connect with local guides</p>
          <p className="text-sm text-gray-500 mt-1">Your UID: {currentUser?.uid}</p>
        </motion.div>

        {/* Feed */}
        <div className="space-y-8">
          {destinationData.map((destination, index) => (
            <motion.div 
              key={destination.id}
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Destination Carousel */}
              <ImageCarousel 
                images={destination.images} 
                location={destination.location} 
              />
              
              {/* Review Card with Message Button */}
              <ReviewCard 
                reviewer={destination.reviewer}
                reviewerId={destination.reviewerId}
                reviewText={destination.reviewText}
                rating={destination.rating}
                timeAgo={destination.timeAgo}
                onMessage={handleMessageGuide}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}