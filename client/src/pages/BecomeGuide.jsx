import { Link } from "react-router-dom";

export default function BecomeGuide() {
  return (
    <div className="bg-brand text-white min-h-screen flex items-center justify-center font-inter">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Become a Guide Page</h1>
        
        {/* Guide Auth Links */}
        <div className="space-x-4">
          <Link 
            to="/guide-signup" 
            className="bg-softyellow text-brand px-6 py-3 rounded-lg font-semibold hover:bg-softyellow/90 transition"
          >
            Sign Up as Guide
          </Link>
          <Link 
            to="/guide-login" 
            className="border-2 border-softyellow text-softyellow px-6 py-3 rounded-lg font-semibold hover:bg-softyellow hover:text-brand transition"
          >
            Login as Guide
          </Link>
        </div>
        
        {/* Back to Home */}
        <div className="mt-6">
          <Link 
            to="/" 
            className="text-softyellow/70 hover:text-softyellow underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}