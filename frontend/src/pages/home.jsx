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
  );
}
