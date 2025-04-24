"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loadScript } from "../../../lib/loadScript";
import { getSession, signIn } from "next-auth/react";
import GooglePayButton from "@google-pay/button-react";

const phonepeScriptUrl = "https://checkout.phonepe.com/checkout.js";

const PaymentPage = () => {
  const router = useRouter();
  const { id: courseId } = router.query;

  const [email, setEmail] = useState("");
  const [isGuest, setIsGuest] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"phonepe" | "gpay" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadScript(phonepeScriptUrl).catch(() => {
      console.error("Failed to load PhonePe script");
    });
  }, []);

  const handleLogin = () => {
    signIn("email", { email, callbackUrl: `/course/${courseId}` });
  };

  const handleRegister = () => {
    router.push(`/signup?email=${encodeURIComponent(email)}&redirect=/course/${courseId}`);
  };

  const handlePhonePePayment = async () => {
    setError("");
    setIsLoading(true);

    const session = await getSession();
    if (!session) {
      setIsGuest(true);
      setIsLoading(false);
      return;
    } else {
      setIsGuest(false);
    }

    const orderRes = await fetch(`/api/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId, email, paymentMethod: "phonepe", amount: 500 }),
    });
    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      setError(orderData.error || "Failed to create order");
      setIsLoading(false);
      return;
    }

    try {
      const paymentRequest = {
        merchantId: orderData.merchantId,
        transactionId: orderData.transactionId,
        amount: orderData.amount,
        redirectUrl: `${window.location.origin}/signup?email=${encodeURIComponent(email)}&redirect=/dashboard/student/courses/${courseId}`,
        mobileNumber: "",
        paymentInstrument: "UPI",
        merchantOrderId: orderData.id,
        merchantUserId: email,
        callbackUrl: `${window.location.origin}/api/payment/phonepe-callback`,
      };
      (window as any).PhonePe.openPayment(paymentRequest);
    } catch {
      setError("PhonePe payment failed to start");
    }
    setIsLoading(false);
  };

  const onGooglePayLoadPaymentData = async () => {
    // Removed unused paymentData parameter to fix TS warning
    // Handle Google Pay payment data here, e.g., send to backend for verification
    router.push(`/signup?email=${encodeURIComponent(email)}&redirect=/dashboard/student/courses/${courseId}`);
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
        />

        {isGuest && email && (
          <div className="mb-4 space-x-4">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Log In
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Register
            </button>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Select Payment Method</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setPaymentMethod("phonepe")}
              className={`px-4 py-2 rounded border ${
                paymentMethod === "phonepe" ? "border-blue-600 bg-blue-100" : "border-gray-300"
              }`}
            >
              PhonePe
            </button>
            <button
              onClick={() => setPaymentMethod("gpay")}
              className={`px-4 py-2 rounded border ${
                paymentMethod === "gpay" ? "border-blue-600 bg-blue-100" : "border-gray-300"
              }`}
            >
              GPay
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {paymentMethod === "phonepe" && (
          <button
            onClick={handlePhonePePayment}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Pay ₹5 with PhonePe"}
          </button>
        )}

        {paymentMethod === "gpay" && (
          <GooglePayButton
            environment="TEST"
            buttonSizeMode="fill"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example", // Replace with your gateway
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "01234567890123456789", // Replace with your merchant ID
                merchantName: "E-Learning Platform",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: "5.00",
                currencyCode: "INR",
                countryCode: "IN",
              },
            }}
            onLoadPaymentData={onGooglePayLoadPaymentData}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
