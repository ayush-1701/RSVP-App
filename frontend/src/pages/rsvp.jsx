import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";


const EVENT_ID = "64fb308d-75d2-4b15-aa14-de50ee35950b";

export default function RSVP() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "", // phone number only
    status: "",
    guests: "",
    arrival_time: "",
  });

  const isNo = form.status === "NO";

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    // allow digits only & max 10 characters
    const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
    handleChange("contact", digitsOnly);
  };

  const submit = async () => {
    if (!form.name || !form.contact || !form.status) {
      alert("Please fill all required fields 🙏");
      return;
    }

    if (form.contact.length !== 10) {
      alert("Please enter a valid 10-digit phone number 📱");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/rsvp`, {
        name: form.name,
        contact: form.contact,
        status: form.status,
        guests: isNo ? 0 : Number(form.guests || 0),
        arrival_time: isNo ? null : form.arrival_time || null,
        event_id: EVENT_ID,
      });
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });

      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
        <h2 className="text-3xl font-serif text-center text-amber-700">
          RSVP
        </h2>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            className="w-full border border-amber-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className="w-full border border-amber-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="10-digit mobile number"
            value={form.contact}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
        </div>

        {/* Attendance */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Will you attend the ceremony? *
          </label>
          <select
            className="w-full border border-amber-200 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={form.status}
            onChange={(e) => {
              handleChange("status", e.target.value);
              if (e.target.value === "NO") {
                handleChange("guests", "");
                handleChange("arrival_time", "");
              }
            }}
          >
            <option value="">Please select an option</option>
            <option value="YES">Yes, I will attend 😊</option>
            <option value="MAYBE">Maybe 🤞</option>
            <option value="NO">No, I won’t be able to attend 😔</option>
          </select>
        </div>

        {/* Guests */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Number of Guests
          </label>
          <input
            type="number"
            min="1"
            disabled={isNo}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2
              ${
                isNo
                  ? "bg-gray-100 cursor-not-allowed border-gray-200"
                  : "border-amber-200 focus:ring-amber-400"
              }`}
            placeholder={
              isNo
                ? "Not required if you are not attending"
                : "Enter total number of guests"
            }
            value={form.guests}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || Number(value) > 0) {
                handleChange("guests", value);
              }
            }}
          />
        </div>

        {/* Arrival Time */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Expected Arrival Time
          </label>
          <input
            type="time"
            disabled={isNo}
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2
              ${
                isNo
                  ? "bg-gray-100 cursor-not-allowed border-gray-200"
                  : "border-amber-200 focus:ring-amber-400"
              }`}
            value={form.arrival_time}
            onChange={(e) => handleChange("arrival_time", e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition-all
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600 hover:bg-amber-700 shadow-md"
            }`}
        >
          {loading ? "Submitting..." : "Submit RSVP"}
        </button>
      </div>
    </div>
  );
}
