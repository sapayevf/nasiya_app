import { useState, useEffect } from "react";
import API from "../utils/API";

export const fetchDebtors = async () => {
  try {
    const response = await API.get("/debtor");
    return response.data;
  } catch (error) {
    console.error("Mijozlarni olishda xatolik:", error);
    throw error;
  }
};

const useDebtor = () => {
  const [debtors, setDebtors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDebtors = async () => {
      try {
        const data = await fetchDebtors();
            
        setDebtors(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getDebtors();
  }, []);

  return { debtors, loading, error };
};

export default useDebtor;
