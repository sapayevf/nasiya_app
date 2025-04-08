import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "../utils/API";

export const useDebtor = () => {
  const queryClient = useQueryClient();

  // Fetch all debtors
  const {
    data: debtors = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["debtors"],
    queryFn: async () => {
      const response = await API.get("/debtor");
      return response.data?.data || [];
    },
  });

  // Add a new debtor
  const addDebtorMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await API.post("/debtor", formData);
      return response.data.data;
    },
    onSuccess: (newDebtor) => {
      queryClient.setQueryData(["debtors"], (oldDebtors = []) => [
        newDebtor,
        ...oldDebtors,
      ]);
    },
  });

  // Get debtor by ID
  const useDebtorById = (id) => {
    return useQuery({
      queryKey: ["debtor", id],
      queryFn: async () => {
        const response = await API.get(`/debtor/${id}`);
        return response.data.data;
      },
      enabled: !!id,
    });
  };

  // Delete debtor
  const deleteDebtorMutation = useMutation({
    mutationFn: async (id) => {
      await API.delete(`/debtor/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["debtors"], (oldDebtors = []) =>
        oldDebtors.filter((debtor) => debtor.id !== deletedId)
      );
    },
  });

  return {
    debtors,
    loading,
    error: error?.message || null,
    addDebtor: addDebtorMutation.mutateAsync,
    refetch: () => queryClient.invalidateQueries({ queryKey: ["debtors"] }),
    useDebtorById,
    deleteDebtor: deleteDebtorMutation.mutateAsync,
  };
};

export default useDebtor;
