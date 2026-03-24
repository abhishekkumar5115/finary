import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export interface Invoice {
    id: string;
    client: { // Conceptually the supplier
        name: string;
    };
    amount: number;
    created_at: string;
    due_date?: string;
    status?: string;
}

// Fetch all invoices
export const useInvoices = () => {
    return useQuery({
        queryKey: ["invoices"],
        queryFn: async (): Promise<Invoice[]> => {
            const response = await api.get("/invoices");
            return response.data;
        },
    });
};

// Add a new invoice
export const useAddInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newInvoice: Record<string, unknown>) => {
            const response = await api.post("/invoices", newInvoice);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
        },
    });
};
