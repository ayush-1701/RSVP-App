import { Link } from "react-router-dom";
import Diya from "../components/diya";

export default function Home() {
  return (
    
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Diya />

      <div className="max-w-xl w-full text-center border border-gold rounded-2xl p-8 bg-white shadow-sm">
        <div className="floral-bg floral-border rounded-2xl p-8 bg-white">
        {/* Ganesh Symbol */}
        <div className="text-4xl mb-3">🐘</div>

        <p className="font-serif text-sm text-olive tracking-widest uppercase mb-2">
          With the blessings of Lord Ganesha
        </p>

        {/* Invitors */}
        <p className="font-serif text-gray-700 mb-4">
          <strong>Mr. Nirmal Kumar Singh</strong> <br />
          & <br />
          <strong>Mrs. Sarita Singh</strong>
        </p>

        <p className="font-serif text-gray-600 mb-6">
          cordially invite you and your family to grace the occasion of their
        </p>

        {/* Title */}
        <h1 className="font-cursive text-5xl text-gold mb-4">
          House Warming
        </h1>

        <p className="font-serif text-gray-700 mb-6">
          ceremony of their new residence
        </p>

        {/* Event Details */}
        <div className="space-y-2 font-serif text-gray-700">
          <p className="text-lg font-semibold">
            Saturday, 28th February 2026
          </p>
          <p>at 11:30 AM</p>

          <div className="text-sm mt-2 leading-relaxed">
            Flat 2002, Tower 3, 20<sup>th</sup> Floor <br />
            VTP Beaumonde <br />
            Kharadi, Pune
          </div>

          <a
            href="https://maps.app.goo.gl/xEkoouQdQ3Ds6T378"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 text-sm text-gold underline"
          >
            View Location on Google Maps
          </a>
        </div>

        {/* CTA */}
        <div className="mt-2">
          <Link
            to="/rsvp"
            className="inline-block  bg-gold text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition"
          >
            RSVP Here
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          Your presence will add grace to the occasion
        </p>
        </div>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            "You are cordially invited to our House Warming Ceremony on 28th Feb 2026 at VTP Beaumonde, Kharadi. Please RSVP here: " +
            window.location.href
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-2 text-sm text-green-700 underline"
        >
          Share invitation on WhatsApp
        </a>

      </div>

      <Diya />

    </div>
  );
}
