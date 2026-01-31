import { X } from "lucide-react";

const PopupModal = ({ isOpen, onClose, title, message, type = "success" }) => {
  if (!isOpen) return null;

  const isError = type === "error";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-xl font-bold ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {title}
          </h2>

          <button onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md text-white ${
              isError
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
