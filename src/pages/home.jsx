import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const destinations = [
  { title: "India", img: "/assets/india.jpg", desc: "Spiritual journeys & vibrant culture" },
  { title: "Japan", img: "/assets/japan.jpg", desc: "Tradition meets cutting-edge modernity" },
  { title: "China", img: "/assets/china.jpg", desc: "Ancient wonders & bustling cities" },
  { title: "Singapore", img: "/assets/singapore.jpg", desc: "Futuristic skyline & lush gardens" },
  { title: "Vietnam", img: "/assets/vietnam.jpg", desc: "Scenic landscapes & rich heritage" },
];

const whyChooseUs = [
  { title: "Verified Hosts", desc: "All guides are vetted for authenticity", icon: "/assets/verified-icon.svg" },
  { title: "Instant Chat", desc: "Connect instantly with your guide", icon: "/assets/chat-icon.svg" },
  { title: "Women Safe Zones", desc: "Dedicated safe travel experiences", icon: "/assets/safezone-icon.svg" },
  { title: "Real Traveller Reviews", desc: "Read honest reviews from other explorers", icon: "/assets/reviews-icon.svg" },
];

const travellerStories = [
  {
    name: "Sophia Martinez",
    location: "Seville, Spain",
    photo: "/assets/story1.jpg",
    excerpt:
      "Discovering hidden flamenco spots and back-alley tapas stands with my local guide made me fall in love with Seville all over again.",
  },
  {
    name: "Rahul Sharma",
    location: "Varanasi, India",
    photo: "/assets/story2.jpg",
    excerpt:
      "Wandering the dawn markets along the Ganges with a guide’s insider tips turned my spiritual journey into something unforgettable.",
  },
  {
    name: "Yuki Tanaka",
    location: "Kyoto, Japan",
    photo: "/assets/story3.jpg",
    excerpt:
      "Cherry blossoms and ancient temples come alive when you have a storyteller by your side. This was the highlight of my trip.",
  },
];

export default function Home() {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.25 * i, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-brand text-softyellow sticky top-0 z-20">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/assets/logo.svg" alt="LocalEyes logo" className="h-8 w-auto" />
          <span className="text-2xl font-bold text-softyellow">LocalEyes</span>
        </Link>
        <div className="space-x-4">
          <Link to="/become-guide" className="hover:underline text-softyellow">
            Become a Guide
          </Link>
          <Link to="/find-guide" className="hover:underline text-softyellow">
            Find Your Guide
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        className="relative min-h-[60vh] flex items-center justify-center text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
        variants={fadeIn}
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-olive/70 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative px-6 py-12 text-softyellow">
          <h2 className="text-4xl md:text-6xl font-bold mb-3">
            See the World Through Local Eyes
          </h2>
          <p className="italic mb-6">
            Unforgettable journeys, curated by people who call it home.
          </p>
          <p className="max-w-xl mx-auto mb-8 opacity-90">
            Connect with local guides and discover authentic travel experiences you won't find in a brochure.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/become-guide" className="btn btn-primary">
              Become a Guide
            </Link>
            <Link to="/find-guide" className="btn btn-secondary">
              Find Your Guide
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Featured Destinations */}
      <motion.section
        className="section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-2 text-center">Featured Destinations</h3>
        <p className="text-brand/70 text-center mb-6">
          Swipe or scroll to explore your next adventure
        </p>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-5 md:gap-6 md:overflow-visible">
          {destinations.map((place, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="card flex-shrink-0 group overflow-hidden"
            >
              <div className="aspect-[3/4] w-full overflow-hidden relative">
                <img src={place.img} alt={place.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand/55 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-center px-4">
                  <p className="text-softyellow text-sm">{place.desc}</p>
                </div>
              </div>
              <div className="p-4 text-center font-semibold">{place.title}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="section-peach"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h3>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {whyChooseUs.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative group bg-softyellow p-6 rounded-lg shadow-card transition hover:shadow-xl"
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
                <img src={item.icon} alt={item.title} className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold mb-2 mt-4">{item.title}</h4>
              <p className="text-brand/80">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Traveller Stories (extra vertical spacing) */}
      <motion.section
        className="section-olive-faint mt-16 mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={4}
        variants={fadeIn}
      >
        <h3 className="text-3xl font-bold mb-4 text-center">Traveller Stories</h3>
        <p className="mb-8 max-w-xl mx-auto text-center text-brand/80">
          Real moments, real memories — hear from explorers who’ve walked in local footsteps.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {travellerStories.map((t, i) => (
            <motion.div
              key={i}
              className="card p-6"
              whileHover={{ y: -5, boxShadow: "0 20px 30px rgba(0,0,0,0.15)" }}
            >
              <img
                src={t.photo}
                alt={t.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-softyellow"
              />
              <h4 className="font-bold text-center">{t.name}</h4>
              <p className="text-sm text-brand/70 text-center mb-2">{t.location}</p>
              <p className="text-sm text-brand/90 text-center">{t.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-brand text-softyellow py-8 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={5}
        variants={fadeIn}
      >
        {/* Brand Info */}
        <div>
          <div className="flex items-center mb-2">
            <img src="/assets/logo.svg" alt="LocalEyes logo" className="h-6 w-auto" />
            <span className="ml-2 font-bold text-softyellow">LocalEyes</span>
          </div>
          <p className="text-softyellow/90">
            Connecting travellers with authentic local experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold mb-2 text-softyellow">Quick Links</h5>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="text-softyellow hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/become-guide" className="text-softyellow hover:underline">
                Become a Guide
              </Link>
            </li>
            <li>
              <Link to="/find-guide" className="text-softyellow hover:underline">
                Find Your Guide
              </Link>
            </li>
            <li>
              <a href="#" className="text-softyellow hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h5 className="font-bold mb-2 text-softyellow">Follow Us</h5>
          <p className="text-softyellow">IG • X • LinkedIn</p>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="font-bold mb-2 text-softyellow">Newsletter</h5>
          <input
            type="email"
            placeholder="Your email"
            className="w-full bg-white text-brand placeholder-text-brand/50 px-3 py-2 rounded mb-2"
          />
          <button className="w-full btn btn-secondary">Subscribe</button>
        </div>
      </motion.footer>
    </div>
  );
}
