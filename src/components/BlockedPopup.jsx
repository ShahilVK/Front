import { X } from "lucide-react";

const BlockedPopup = ({ open, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">
            Account Blocked
          </h2>
          <X />
        </div>

        <p className="text-gray-700 mb-6">
          Your account has been blocked by the administrator.
          You are no longer allowed to access this platform.
        </p>

        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockedPopup;
