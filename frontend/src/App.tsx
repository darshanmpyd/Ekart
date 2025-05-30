import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Routes/Router";
import { useDispatch } from "react-redux";
import { setisLoggedIn } from "./Reducer/Login/LoginSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "./store";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    dispatch(setisLoggedIn(!!token));
    setAuthChecked(true);
  }, [dispatch]);

  if (!authChecked) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
