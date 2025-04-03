import { useState } from "react";
import API from "../utils/API";

export const useDebt = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addDebt = async (debtData) => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("next_payment_date", debtData.next_payment_date);
      formData.append("debt_period", debtData.debt_period);
      formData.append("debt_sum", debtData.debt_sum);
      formData.append("total_debt_sum", debtData.total_debt_sum);
      formData.append("description", debtData.description || "");
      formData.append("debtor", debtData.debtor);
      formData.append("debt_status", debtData.debt_status || "active");

      if (debtData.images && debtData.images.length > 0) {
        debtData.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const response = await API.post("/debts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error?.message ||
        "Nasiyani qo'shishda xatolik yuz berdi";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addDebt,
  };
};
