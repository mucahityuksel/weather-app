'use client';

import { useEffect, useState } from "react";

interface ErrorMessageProps {
  message: string;
  duration?: number; // opsiyonel: kaç saniye sonra otomatik kapanacak
}

const ErrorMessage = ({ message, duration = 5000 }: ErrorMessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;

    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!visible || !message) return null;

  return (
    <div
      className="
        max-w-md mx-auto
        bg-red-100 text-red-800 border border-red-300
        rounded-xl px-5 py-3 flex items-center gap-3
        shadow-md
        transition-opacity duration-500 ease-in-out
        opacity-100
      "
      style={{ opacity: visible ? 1 : 0 }}
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 flex-shrink-0 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M4.93 19.07a10 10 0 1114.14 0l-7.07 7.07-7.07-7.07z" />
      </svg>
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default ErrorMessage;
