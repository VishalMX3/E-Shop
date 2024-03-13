import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Lp = () => {
  const { error } = useSelector((state) => state.user);

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
      <Link to="/login">
        <button
          style={{
            border: "none",
            width: 120,
            borderRadius: 5,
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Login as Admin
        </button>
      </Link>
      {error && (
        <span style={{ color: "red" }}>Wrong Credentials...Plz try again</span>
      )}
    </div>
  );
};

export default Lp;
