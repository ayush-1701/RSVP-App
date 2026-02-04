import { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      setStats(res.data);
    };

    load();
  }, []);

  if (!stats) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total RSVPs" value={stats.total_rsvps} />
        <StatCard title="Yes" value={stats.YES} />
        <StatCard title="No" value={stats.NO} />
        <StatCard title="Maybe" value={stats.MAYBE} />
        <StatCard title="Guests" value={stats.total_guests} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
