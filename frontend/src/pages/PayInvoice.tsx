import {useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface Invoice {
    id : string,
    amount : number,
    client : {
        name : string
    },
    status : string
}

const PayInvoice = () =>{
    const {invoiceId }= useParams() as { invoiceId: string };
    const [invoice,setInvoice] = useState<Invoice | null>(null);
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState<string | null>(null)

    useEffect(()=>{
        const fetchInvoice = async ()=>{
            try{
                const token = localStorage.getItem('access_token');
                const response = await api.get(`/invoices/${invoiceId}`,
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setInvoice(response.data);
            }catch(error:any){
                setError("Failed to fetch Invoice details");
            }finally{
                setLoading(false)
            }
        }

        fetchInvoice();
    },[invoiceId])

    const handlePayment = async()=>{
        try{
           //public key from backend
           const keyResponse = await api.get('/payments/Razorpay-key');
           const key = keyResponse.data.key;
           

           //payment order
           const orderResponse  = await api.post(`/invoices/${invoiceId}/create-order`);
           const order = orderResponse.data;

           const options = {
            key: key,
            amount : order.amount,
            currency : order.currency,
            name : "Finary",
            description : `Payment for ${invoiceId}`,
            order_id : order.id,

            //on payment success
            handler : async function(response:any){
                try {
                    await api.post('/payments/verify-payment',{
                        razorpay_payment_id : response.razorpay_payment_id,
                        razorpay_order_id : response.razorpay_order_id,
                        razorpay_signature : response.razorpay_signature,
                        invoiceid : invoiceId
                    });
                    alert("Payment Successful and Verified!");

                    setInvoice(prev=>prev?{...prev,status:'PAID'}:null);
                } catch (error) {
                    alert("Payment verification failed! Please contact support.")
                }
            },
            prefill:{
                name : invoice?.client?.name
            },
            theme:{
                color: '#007bff',
            }
           }
           const rzp = new window.Razorpay(options);
           rzp.open();
        }catch(error){
            console.error('Payment failed!', error);
            alert('Payment setup failed! Please try again.');
        }
    }

      if (loading) return <p>Loading invoice details...</p>;
      if (error) return <p style={{ color: "red" }}>{error}</p>;
      if (!invoice) return <p>No invoice found.</p>;


    return(
        <div style={styles.container}>
            <h2>Invoice Payment</h2>
            <div style={styles.card}>
                <p><strong>Invoice ID:</strong> {invoice.id}</p>
                <p><strong>Client:</strong> {invoice.client.name}</p>
                <p><strong>Amount:</strong> ₹{invoice.amount}</p>
                <p><strong>Status:</strong> {invoice.status}</p>

                <button style={styles.button} onClick={handlePayment}>
                Pay Now
                </button>
            </div>
        </div>
    )
}


const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "white",
    color:"black",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "700px",
    textAlign: "left" as const,
  },
  button: {
    marginTop: "16px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "black",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};


export default PayInvoice;