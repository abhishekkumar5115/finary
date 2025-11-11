import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Invoice {
  id: string;
  amount: number;
  client: {
    name: string;
  };
  status: string;
}

const PayInvoice = () => {
  const { invoiceId } = useParams() as { invoiceId: string };
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get(`/invoices/${invoiceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvoice(response.data);
      } catch (error: any) {
        setError("Invoice Not Found!");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);

  const handlePayment = async () => {
    try {
      const keyResponse = await api.get("/payments/Razorpay-key");
      const key = keyResponse.data.key;

      const orderResponse = await api.post(`/invoices/${invoiceId}/create-order`);
      const order = orderResponse.data;

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Finary",
        description: `Payment for ${invoiceId}`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            await api.post("/payments/verify-payment", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              invoiceId: invoiceId,
            });
            alert("Payment Successful and Verified!");
            setInvoice((prev) => (prev ? { ...prev, status: "PAID" } : null));
          } catch (error) {
            alert("Payment verification failed! Please contact support.");
          }
        },
        prefill: {
          name: invoice?.client?.name,
        },
        theme: {
          color: "#2563eb",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed!", error);
      alert("Payment setup failed! Please try again.");
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading invoice details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!invoice) return <p className="text-center text-gray-500 mt-10">No invoice found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Invoice Payment
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Invoice ID:</span>
            <span>{invoice.id}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Client:</span>
            <span>{invoice.client.name}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Amount:</span>
            <span>₹{invoice.amount}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Status:</span>
            <span
              className={`font-semibold ${
                invoice.status === "PAID"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handlePayment}
            disabled={invoice.status === "PAID"}
            className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
              invoice.status === "Paid"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {invoice.status === "PAID" ? "Already Paid" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayInvoice;
