import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white floral-border rounded-2xl p-8 text-center max-w-md">

        <div className="text-4xl mb-4">🙏</div>

        <h1 className="font-serif text-2xl mb-2">
          Thank You
        </h1>

        <p className="text-gray-600 mb-6">
          We have received your response and look forward to seeing you.
        </p>

        <Link
          to="/"
          className="inline-block bg-gold text-white px-6 py-2 rounded-full"
        >
          Back to Invitation
        </Link>
      </div>
    </div>
  );
}
