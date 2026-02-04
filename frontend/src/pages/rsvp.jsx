import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EVENT_ID = "64fb308d-75d2-4b15-aa14-de50ee35950b";

export default function RSVP() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    status: "YES",
    guests: 0,
    message: "",
  });

  const submit = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/rsvp/`,
      { ...form, event_id: EVENT_ID }
    );
    // alert("Thank you for your response 🙏");
    navigate("/thank-you");

  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white border border-gold rounded-2xl p-6 w-full max-w-md shadow-sm space-y-4">

        <h2 className="text-2xl font-serif text-center">
          RSVP
        </h2>

        <p className="text-center text-sm text-gray-600">
          We look forward to celebrating this special occasion with you
        </p>

        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Your Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Contact Number / Email"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-3 py-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="YES">Yes, I will attend</option>
          <option value="NO">Regretfully, unable to attend</option>
          <option value="MAYBE">Tentative</option>
        </select>

        <input
          type="number"
          min="0"
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Number of attendees"
          value={form.guests}
          onChange={(e) =>
            setForm({ ...form, guests: Number(e.target.value) })
          }
        />

        <textarea
          className="w-full border rounded-lg px-3 py-2"
          placeholder="Message (optional)"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button
          onClick={submit}
          className="w-full bg-gold text-black py-2 rounded-full font-medium hover:opacity-90"
        >
          Submit Response
        </button>
      </div>
    </div>
  );
}
