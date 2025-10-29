// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function KhaltiVerifyPage() {
//   const [message, setMessage] = useState("Verifying your payment...");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const params = new URLSearchParams(window.location.search);
//         const pidx = params.get("pidx");
//         const purchase_order_id = params.get("purchase_order_id");

//         if (!pidx || !purchase_order_id) {
//           setMessage("⚠️ Missing payment reference or purchase order.");
//           return;
//         }

//         // Call backend verification API
//         const res = await axios.post(
//           "http://localhost:7900/teaching/student/verify-khalti-payment",
//           { pidx, purchase_order_id }
//         );

//         if (res.data.message === "Payment Verified Successfully!") {
//           setMessage("✅ Payment Successful! You are enrolled.");
//         } else {
//           setMessage("❌ Payment Failed or Not Verified.");
//         }
//       } catch (error: any) {
//         console.error(error);
//         setMessage("⚠️ Verification failed. Please contact support.");
//       }
//     };

//     verifyPayment();
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
//       <h2>{message}</h2>
//       <p>You can close this window once verification completes.</p>
//     </div>
//   );
// }


//2nd
'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const KhaltiVerifyPage = () => {
  const params = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const pidx = params.get("pidx");
      const purchase_order_id = params.get("purchase_order_id");

      if (!pidx || !purchase_order_id) {
        setStatus("Missing payment details.");
        return;
      }
      //http://localhost:7900/teaching/student/verify-khalti-payment
      try {
        const res = await axios.post("http://localhost:7900/teaching/student/verify-khalti-payment", {
          pidx,
          purchase_order_id,
        });
        setStatus(res.data.message || "Payment verified successfully!");
      } catch (err: any) {
        console.error(err);
        setStatus("Verification failed or server error.");
      }
    };

    verifyPayment();
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-10 text-center">
        <h1 className="text-2xl font-semibold mb-3">Khalti Payment Verification</h1>
        <p className="text-gray-700">{status}</p>
      </div>
    </div>
  );
};

export default KhaltiVerifyPage;
