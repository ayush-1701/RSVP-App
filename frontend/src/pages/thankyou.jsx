import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center space-y-6">
        
        {/* Icon / Emoji */}
        <div className="text-5xl">🙏</div>

        {/* Heading */}
        <h2 className="text-3xl font-serif text-amber-700">
          Thank You!
        </h2>

        {/* Message */}
        <p className="text-gray-700 text-lg leading-relaxed">
          Your response has been received successfully.
          <br />
          We truly appreciate you taking the time to confirm.
        </p>

        <p className="text-gray-600">
          We look forward to celebrating this special occasion with you.
        </p>

        {/* Primary CTA */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 py-3 rounded-xl font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-all shadow-md"
        >
          Back to Invitation
        </button>

        {/* Optional secondary action (comment out if not needed) */}
        <button
          onClick={() => navigate("/rsvp")}
          className="w-full py-2 rounded-xl font-medium text-amber-700 border border-amber-300 hover:bg-amber-50 transition-all"
        >
          Submit Another RSVP
        </button>
      </div>
    </div>
  );
}
