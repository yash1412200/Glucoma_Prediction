"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getProfileApi } from "@/lib/user";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileApi();
        console.log("PROFILE:", data);

        setProfile({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="space-y-8 max-w-[900px] mx-auto px-4 sm:px-6">
      {/* TITLE */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800">
        Profile
      </h2>

      {/* CARD */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border shadow-md space-y-6">
        {loading && <p className="text-sm text-gray-500">Loading profile...</p>}

        {!loading && (
          <>
            {/* FORM (VERTICAL) */}
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-500">Full Name</label>

                <input
                  className="mt-1 w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={profile.name}
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500">Email</label>

                <input
                  className="mt-1 w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={profile.email}
                  readOnly
                />
              </div>
            </div>

            {/* BUTTON */}
            <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto">
              Save Changes
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
