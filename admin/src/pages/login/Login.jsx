import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, { userName, password });
    if (!error) {
      navigate("/");
      window.location.reload();
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isFetching ? (
        <span>Processing. Please wait...</span>
      ) : (
        <>
          <input
            style={{ padding: 10, marginBottom: 20 }}
            type="text"
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            style={{ padding: 10, marginBottom: 20 }}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={{ padding: 10, width: 100 }} onClick={handleClick}>
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
