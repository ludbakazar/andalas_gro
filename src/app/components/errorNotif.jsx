"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorNotification() {
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!isVisible || !error) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center justify-between bg-amber-300 text-black text-sm font-medium px-4 py-3 rounded-md shadow-lg max-w-xs md:max-w-md">
        <span>Error: {error}</span>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-2 p-1 rounded-full hover:bg-red-600 transition-colors"
          aria-label="Close error message"
        ></button>
      </div>
    </div>
  );
}
