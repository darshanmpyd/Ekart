import { useState } from "react";
import Modal from "react-modal";

interface CounterInterface {
  title: string;
  handleSubmit: (count: number) => void;
}

const CounterModal = ({ title, handleSubmit }: CounterInterface) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const increaseCount = () => setCount((prev) => prev + 1);
  const decreaseCount = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: 0,
      border: "none",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
    },
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
      >
        {title}
      </button>

      <Modal isOpen={open} onRequestClose={closeModal} style={customStyles}>
        <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center relative">
          <button
            onClick={closeModal}
            className="absolute top-3 right-4 text-red-500 hover:text-red-700 text-xl font-bold"
          >
            ×
          </button>

          <h2 className="text-lg font-semibold mb-4">Select Quantity</h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={decreaseCount}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
            >
              −
            </button>
            <span className="text-xl font-medium">{count}</span>
            <button
              onClick={increaseCount}
              className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              handleSubmit(count);
              closeModal();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CounterModal;
