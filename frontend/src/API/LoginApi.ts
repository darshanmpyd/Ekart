import { LoginType } from "../Reducer/Login/LoginSlice";

const endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
export const verifyCredsFunction = async (data: LoginType) => {
  const response = await fetch(`${endpoint}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result?.msg || "Login failed");
  }

  return result;
};
