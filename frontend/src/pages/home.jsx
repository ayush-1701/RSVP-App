import { Link } from "react-router-dom";
// import invitation from "../assets/Invitation_final.png";

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

        {/* <a
          href="https://maps.app.goo.gl/fLWDEgWatH8fLUvc9"
          target="_blank"
          rel="noopener noreferrer"
          className="
            block mt-4 text-center
            text-amber-700 font-medium
            underline hover:text-amber-900
          "
        >
          📍 View Location on Google Maps
        </a> */}


        {/* RSVP Here with glow */}
        <Link
          to="/rsvp"
          className="
            absolute bottom-[8%] left-1/2 -translate-x-1/2
            text-lg font-semibold text-amber-800 underline
            animate-pulse
            drop-shadow-[0_0_8px_rgba(251,191,36,0.7)]
            hover:text-amber-900
          "
        >
          RSVP Here
        </Link>
      </div>

      {/* Floating Mobile Button */}
      <FloatingRSVP />
    </div>
  );
}

function FloatingRSVP() {
  return (
    <Link
      to="/rsvp"
      className="
        fixed bottom-5 right-5 z-50
        md:hidden
        bg-amber-600 text-white
        px-5 py-3 rounded-full
        shadow-lg
        font-semibold
        hover:bg-amber-700
        transition
      "
    >
      RSVP
    </Link>
  );
}