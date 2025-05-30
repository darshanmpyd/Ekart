// LoadingSpinner.tsx
import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full w-full py-10">
      <FaSpinner className="animate-spin text-4xl text-blue-600" />
    </div>
  );
}
