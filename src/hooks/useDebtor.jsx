import { useEffect, useState } from "react";
import API from "../utils/API";

export const useDebtor = () => {
  const [debtors, setDebtors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDebtors, setFilteredDebtors] = useState([]);

  const fetchDebtors = async () => {
    setLoading(true);
    try {
      const response = await API.get("/debtor");
      if (Array.isArray(response.data?.data)) {
        setDebtors(response.data.data);
        setFilteredDebtors(response.data.data);
      } else {
        setDebtors([]);
        setFilteredDebtors([]);
      }
    } catch (err) {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDebtors();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredDebtors(debtors);
    } else {
      const filtered = debtors.filter(
        (debtor) =>
          debtor.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          debtor.phone_numbers.some((phone) =>
            phone.number.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredDebtors(filtered);
    }
  }, [searchQuery, debtors]);

  const addDebtor = async (formData) => {
    setLoading(true);
    try {
      const response = await API.post("/debtor", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.data) {
        await fetchDebtors();
        return response.data.data;
      }
      throw new Error("Mijoz ma'lumotlari noto'g'ri");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error?.message ||
        "Mijozni qo'shishda xatolik yuz berdi";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getDebtorById = async (id) => {
    setLoading(true);
    try {
      const response = await API.get(`/debtor/${id}`);
      console.log("API Response:", response); // Debug log

      if (response.data?.data) {
        // Ensure debts array exists
        const debtorData = {
          ...response.data.data,
          debts: response.data.data.debts || [],
        };
        return debtorData;
      }
      throw new Error("Ma'lumotlar topilmadi");
    } catch (err) {
      console.error("Error fetching debtor:", err); // Debug log
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error?.message ||
        "Mijoz ma'lumotlarini yuklashda xatolik yuz berdi";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateFavorite = async (id, isFavorite) => {
    try {
      await API.patch(`/debtor/${id}`, { is_favorite: isFavorite });
      await fetchDebtors();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message ||
        "Mijoz ma'lumotlarini yangilashda xatolik yuz berdi";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteDebtor = async (id) => {
    setLoading(true);
    try {
      await API.delete(`/debtor/${id}`);
      setDebtors((prevDebtors) =>
        prevDebtors.filter((debtor) => debtor.id !== id)
      );
      return true;
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message ||
        "Qarzdorni o'chirishda xatolik yuz berdi";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    debtors: filteredDebtors,
    loading,
    error,
    addDebtor,
    updateFavorite,
    getDebtorById,
    deleteDebtor,
    setSearchQuery,
    refetch: fetchDebtors,
  };
};
