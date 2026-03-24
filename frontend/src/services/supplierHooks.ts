import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export interface Supplier {
    id: string;
    name: string;
    email: string;
    // any other fields based on backend
}

// Fetch all suppliers
export const useSuppliers = () => {
    return useQuery({
        queryKey: ["suppliers"],
        queryFn: async (): Promise<Supplier[]> => {
            const response = await api.get("/clients"); // Backend uses /clients
            return response.data;
        },
    });
};

// Add a new supplier
export const useAddSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newSupplier: Pick<Supplier, 'name' | 'email'>) => {
            const response = await api.post("/clients", newSupplier);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
        },
    });
};
