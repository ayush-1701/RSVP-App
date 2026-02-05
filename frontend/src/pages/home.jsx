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

function haptic() {
  if (navigator.vibrate) {
    navigator.vibrate(20); // subtle haptic
  }
}

function FloatingActions() {
  const shareText = encodeURIComponent(
    "You're invited to our House Warming Ceremony 🪔✨\n\n" +
      "Please RSVP here:\n" +
      window.location.origin
  );

  return (
    <div
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        z-50
        md:hidden
        flex items-center gap-3
        bg-white/80 backdrop-blur
        px-3 py-2
        rounded-full
        shadow-lg
      "
    >
      {/* Share */}
      <a
        onClick={haptic}
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          text-sm
          px-3 py-1.5
          rounded-full
          bg-green-600 text-white
          font-medium
          hover:bg-green-700
          transition
        "
      >
        🔗 Share
      </a>

      {/* Location */}
      <a
        onClick={haptic}
        href="https://maps.app.goo.gl/fLWDEgWatH8fLUvc9"
        target="_blank"
        rel="noopener noreferrer"
        className="
          text-sm
          px-3 py-1.5
          rounded-full
          bg-blue-600 text-white
          font-medium
          hover:bg-blue-700
          transition
        "
      >
        📍 Location
      </a>

      {/* RSVP */}
      <Link
        onClick={haptic}
        to="/rsvp"
        className="
          text-sm
          px-4 py-1.5
          rounded-full
          bg-amber-600 text-white
          font-semibold
          hover:bg-amber-700
          transition
          animate-pulse
          shadow-[0_0_10px_rgba(251,191,36,0.6)]
        "
      >
        RSVP
      </Link>
    </div>
  );
}