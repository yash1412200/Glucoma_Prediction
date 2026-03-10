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
    <div className="space-y-8 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold">Profile</h2>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        {loading && <p className="text-sm text-gray-500">Loading profile...</p>}

        {!loading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-500">Full Name</label>

                <input
                  className="mt-1 w-full border rounded-lg p-3 text-sm"
                  value={profile.name}
                  readOnly
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500">Email</label>

                <input
                  className="mt-1 w-full border rounded-lg p-3 text-sm"
                  value={profile.email}
                  readOnly
                />
              </div>
            </div>

            <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto">
              Save Changes
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
