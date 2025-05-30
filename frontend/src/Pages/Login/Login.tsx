import { useForm } from "react-hook-form";
import { useState } from "react";
import { verifyCredsFunction } from "../../API/LoginApi";
import { useMutation } from "@tanstack/react-query";
import { LoginType } from "../../Reducer/Login/LoginSlice";
import { useNavigate } from "react-router-dom";
import Form from "../../Component/Form";
import { setisLoggedIn } from "../../Reducer/Login/LoginSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

const Login = () => {
  const { register, handleSubmit } = useForm<LoginType>();

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate } = useMutation({
    mutationFn: (creds: LoginType) => verifyCredsFunction(creds),
    onSuccess: (data) => {
      dispatch(setisLoggedIn(true)); // ✅ This is valid
      sessionStorage.setItem("token", data.token);
      navigate("/products");
    },
    onError: (error: any) => {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Login failed. Please try again.");
      }
    },
  });

  const onSubmit = (creds: LoginType) => {
    mutate(creds);
  };

  return (
    <div className=" justify-center items-center ">
      <Form
        label={"Login"}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
      />
      <div className="text-center text-blue-500">
        <a href="/register">Dont have an account,click here to register</a>
      </div>
    </div>
  );
};
export default Login;
