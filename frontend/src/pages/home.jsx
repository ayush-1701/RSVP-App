import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex justify-center py-6 relative">
      <div className="relative w-full max-w-[420px]">
        {/* Invitation Image */}
        <img
          src="/Invitation_final.png"
          alt="House Warming Invitation"
          className="w-full rounded-xl shadow-lg"
        />
      </div>

      {/* Floating Action Buttons */}
      <FloatingActions />
    </div>
  );
}

function FloatingActions() {
  const shareText = encodeURIComponent(
    "You're invited to our House Warming Ceremony 🪔✨\n\n" +
    "Please RSVP here:\n" +
    window.location.origin
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 md:hidden">
      
      {/* WhatsApp Share */}
      <a
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          bg-green-600 text-white
          px-4 py-3 rounded-full
          shadow-lg
          font-semibold
          hover:bg-green-700
          transition
          flex items-center gap-2
        "
      >
        🔗 Share
      </a>

      {/* Google Maps */}
      <a
        href="https://maps.app.goo.gl/fLWDEgWatH8fLUvc9"
        target="_blank"
        rel="noopener noreferrer"
        className="
          bg-blue-600 text-white
          px-4 py-3 rounded-full
          shadow-lg
          font-semibold
          hover:bg-blue-700
          transition
          flex items-center gap-2
        "
      >
        📍 Location
      </a>

      {/* RSVP */}
      <Link
        to="/rsvp"
        className="
          bg-amber-600 text-white
          px-5 py-3 rounded-full
          shadow-lg
          font-semibold
          hover:bg-amber-700
          transition
          text-center
        "
      >
        RSVP
      </Link>
    </div>
  );
}
