import { useState, useEffect } from "react";
import API from "../utils/API";

export const fetchUserProfile = async (token) => {
  try {
    const response = await API.get("/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("User Profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profilni olishda xatolik:", error);
    throw error;
  }
};

export const useUserProfile = (token) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const getUserProfile = async () => {
      try {
        const profile = await fetchUserProfile(token);
        setUserProfile(profile);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, [token]);

  return { userProfile, loading, error };
};
