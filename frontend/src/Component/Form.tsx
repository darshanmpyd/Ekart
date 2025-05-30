import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

interface FormProps {
  label: string;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  errorMsg?: string;
}

const Form = ({
  label,
  register,
  handleSubmit,
  onSubmit,
  errorMsg,
}: FormProps) => {
  return (
    <div className="flex justify-center items-center w-full  p-2 mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          {label}
        </h2>

        <input
          {...register("username")}
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {label}
        </button>

        {errorMsg && (
          <p className="mb-4 text-red-600 text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </div>
  );
};

export default Form;
