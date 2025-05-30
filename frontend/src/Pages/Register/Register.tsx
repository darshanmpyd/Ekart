import { useState } from "react";
import { LoginType } from "../../Reducer/Login/LoginSlice";
import { RegisterApi } from "../../API/RegisterApi";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Form from "../../Component/Form";

const Register = () => {
  const { register, handleSubmit } = useForm<LoginType>();
  const [errorMsg, setErrorMsg] = useState("");
  const { mutate, data } = useMutation({
    mutationFn: (inputs: LoginType) => RegisterApi(inputs),
    onError: (error: any) => {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Register failed. Please try again.");
      }
    },
  });

  const onSubmit = (inputs: LoginType) => {
    setErrorMsg("");

    mutate(inputs);
  };

  return (
    <div>
      <Form
        label={"Register"}
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errorMsg={errorMsg}
      />
      {data && <a href="login">click to login page</a>}
    </div>
  );
};

export default Register;
