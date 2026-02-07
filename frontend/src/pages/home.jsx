import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    // Wake up backend (Render cold start prevention)
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/health/ping`).catch(() => {
      // ignore errors – this is best-effort only
    });
  }, []);

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
  const haptic = () => {
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const shareText = encodeURIComponent(
    "You're invited to our House Warming Ceremony 🪔✨\n\n" +
      "Please RSVP here:\n" +
      window.location.origin
  );

  const baseBtn =
    "flex items-center justify-center gap-2 " +
    "h-11 min-w-[96px] px-4 rounded-full " +
    "text-sm font-medium text-white " +
    "shadow-md transition active:scale-95";

  return (
    <>
      <div
        className="
          fixed bottom-4 left-1/2 -translate-x-1/2
          z-50 md:hidden
          flex gap-3
        "
      >
        {/* Share */}
        <a
          onClick={haptic}
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseBtn} bg-green-600 hover:bg-green-700`}
        >
          🔗<span>Share</span>
        </a>

        {/* Location */}
        <a
          onClick={haptic}
          href="https://maps.app.goo.gl/fLWDEgWatH8fLUvc9"
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseBtn} bg-blue-600 hover:bg-blue-700`}
        >
          📍<span>Location</span>
        </a>

        {/* RSVP */}
        <a
          onClick={haptic}
          href="/rsvp"
          className={`
            ${baseBtn}
            bg-amber-600 hover:bg-amber-700
            animate-pulse
            shadow-[0_0_14px_rgba(251,191,36,0.5)]
          `}
        >
          📝<span>RSVP</span>
        </a>
      </div>

      {/* DESKTOP RSVP BUTTON */}
      <Link
        to="/rsvp"
        className="
          hidden md:flex
          fixed right-6 top-1/2 -translate-y-1/2 z-40
          bg-amber-600 hover:bg-amber-700
          text-white font-semibold
          px-6 py-3 rounded-full
          shadow-xl
          transition
          animate-pulse
        "
      >
        🎉 RSVP
      </Link>
    </>

    
    
  );
}