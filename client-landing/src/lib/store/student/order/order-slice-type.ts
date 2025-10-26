import { Status } from "@/lib/global-types/type";

// 🔹 What the frontend sends to backend
export interface IOrderData {
  studentName: string;
  studentEmail: string;
  studentPhoneNo: string;
  studentAddress: string;
  courseId: number;
  paymentMethod: "esewa" | "khalti" | "qr";
  totalAmount: number;
  remarks?: string;
}

// 🔹 What backend returns
export interface IOrderResponse {
  message: string;
  redirectUrl?: string; // for eSewa
  data?: {
    pidx?: string;
    payment_url?: string; // for Khalti
  };
}

// 🔹 Redux slice state
export interface IOrderSliceState {
  orderResponse: IOrderResponse | null; // store backend response, not request payload
  status: Status;
  error?: string | null; // helpful for debugging / error handling
}