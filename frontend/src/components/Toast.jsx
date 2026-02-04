import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3s

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyles =
    "fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-white text-sm transition-all";

  const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-white opacity-80 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
