import { LoginType } from "../Reducer/Login/LoginSlice";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
export const RegisterApi = async (inputs: LoginType) => {
  const response = await fetch(`${endpoint}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputs),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.msg || "Register unsuccessfull");
  }
  return data;
};
