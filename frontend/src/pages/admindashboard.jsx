import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}`,
    },
  };

  const loadStats = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/stats`,
        authHeaders
      );
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load admin stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading admin dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="YES" value={stats.YES} color="green" />
        <StatCard label="MAYBE" value={stats.MAYBE} color="amber" />
        <StatCard label="NO" value={stats.NO} color="red" />
        <StatCard
          label="TOTAL GUESTS"
          value={stats.total_guests}
          color="blue"
        />
      </div>

      <RSVPTable authHeaders={authHeaders} />
      <ArrivalHeatmap authHeaders={authHeaders} />

      <div className="mt-10">
        <button
          onClick={loadStats}
          className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
        >
          🔄 Refresh Stats
        </button>
      </div>
    </div>
  );
}

/* ---------- STAT CARD ---------- */

function StatCard({ label, value, color }) {
  const map = {
    green: "bg-green-100 text-green-800",
    amber: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
  };

  return (
    <div className={`rounded-xl p-4 shadow ${map[color]}`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

/* ---------- RSVP TABLE ---------- */

function RSVPTable({ authHeaders }) {
  const [rsvps, setRsvps] = useState([]);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin/rsvps-list`,
      authHeaders
    );
    setRsvps(res.data);
  };

  const filtered = rsvps.filter(
    (r) => filter === "ALL" || r.status === filter
  );

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">📋 RSVP List</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="ALL">All</option>
          <option value="YES">YES</option>
          <option value="MAYBE">MAYBE</option>
          <option value="NO">NO</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Guests</th>
              <th className="p-3 text-left">Arrival</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.contact}</td>
                <td className="p-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="p-3">
                  {r.status === "NO" ? "-" : r.guests}
                </td>
                <td className="p-3">
                  {r.arrival_time ? formatTime(r.arrival_time) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- ARRIVAL HEATMAP ---------- */

function ArrivalHeatmap({ authHeaders }) {
  const [data, setData] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/admin/arrival-heatmap`,
      authHeaders
    );
    setData(res.data);
  };

  const max = Math.max(...Object.values(data), 1);

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">
        ⏰ Arrival Time Heatmap
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Object.entries(data).map(([time, count]) => {
          const intensity = count / max;
          return (
            <div
              key={time}
              className="rounded-lg p-3 text-center text-sm font-medium"
              style={{
                background: `rgba(251, 191, 36, ${
                  0.2 + intensity * 0.6
                })`,
              }}
            >
              <div>{formatTime(time)}</div>
              <div className="text-xs text-gray-700">
                {count} guests
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- HELPERS ---------- */

function StatusBadge({ status }) {
  const map = {
    YES: "bg-green-100 text-green-800",
    MAYBE: "bg-amber-100 text-amber-800",
    NO: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}

function formatTime(t) {
  const [h, m] = t.split(":");
  const hour = Number(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
}
