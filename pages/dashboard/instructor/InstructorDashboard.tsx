"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadScript } from "../../../lib/loadScript";
import { getSession, useSession } from "next-auth/react";

const phonepeScriptUrl = "https://checkout.phonepe.com/checkout.js";

const PaymentPage = () => {
  const router = useRouter();
  const { id: courseId, email: queryEmail, paymentMethod: queryPaymentMethod } = router.query;

  const { data: session } = useSession();

  const [email, setEmail] = useState(typeof queryEmail === "string" ? queryEmail : "");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"gpay" | "phonepe" | null>(
    typeof queryPaymentMethod === "string" && (queryPaymentMethod === "gpay" || queryPaymentMethod === "phonepe")
      ? queryPaymentMethod
      : null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    loadScript(phonepeScriptUrl).catch(() => {
      console.error("Failed to load PhonePe script");
    });
  }, []);

  useEffect(() => {
    if (session && email && paymentMethod) {
      // Auto trigger payment after login
      handlePayment();
    }
  }, [session]);

  const redirectToLoginOrSignup = () => {
    if (!email || !paymentMethod) {
      setError("Please enter email and select a payment method before proceeding.");
      return;
    }
    // Redirect to login page with email and paymentMethod as query params
    router.push(`/login?email=${encodeURIComponent(email)}&redirect=/course/${courseId}/payment?email=${encodeURIComponent(email)}&paymentMethod=${paymentMethod}`);
  };

  const handlePayment = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!paymentMethod) {
      setError("Please select a payment method");
      return;
    }
    setIsLoading(true);

    const sessionCheck = await getSession();
    if (!sessionCheck) {
      setIsLoading(false);
      return;
    }

    try {
      const orderRes = await fetch(`/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, email, paymentMethod, amount: 500 }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setError(orderData.error || "Failed to create order");
        setIsLoading(false);
        return;
      }

      if (paymentMethod === "gpay" || paymentMethod === "phonepe") {
        const paymentRequest = {
          merchantId: orderData.merchantId,
          transactionId: orderData.transactionId,
          amount: orderData.amount,
          redirectUrl: `${window.location.origin}/course/${courseId}`,
          mobileNumber: "9480355659", // Payment received to this number
          paymentInstrument: "UPI",
          merchantOrderId: orderData.id,
          merchantUserId: email,
          callbackUrl: `${window.location.origin}/api/payment/phonepe-callback`,
        };
        if (paymentMethod === "phonepe") {
          (window as any).PhonePe.openPayment(paymentRequest);
        } else if (paymentMethod === "gpay") {
          // For GPay, redirect to UPI payment URL
          const upiUrl = `upi://pay?pa=9480355659@upi&pn=E-Learning%20Platform&am=${(orderData.amount / 100).toFixed(2)}&cu=INR&tn=Payment%20for%20course%20${courseId}`;
          window.location.href = upiUrl;
        }
      }
    } catch {
      setError("Payment failed to start");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-bold mb-6">Course Payment</h1>

      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <label className="block mb-2 font-semibold">Email Address</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={!!session}
        />

        {!session && (
          <>
            <label className="block mb-2 font-semibold">Select Payment Method</label>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setPaymentMethod("gpay")}
                className={`px-4 py-2 rounded border ${paymentMethod === "gpay" ? "border-blue-600 bg-blue-100" : "border-gray-300"}`}
              >
                GPay
              </button>
              <button
                onClick={() => setPaymentMethod("phonepe")}
                className={`px-4 py-2 rounded border ${paymentMethod === "phonepe" ? "border-blue-600 bg-blue-100" : "border-gray-300"}`}
              >
                PhonePe
              </button>
            </div>
            <button
              onClick={redirectToLoginOrSignup}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Continue to Login / Register
            </button>
          </>
        )}

        {session && (
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Pay ₹5"}
          </button>
        )}

        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default PaymentPage;
