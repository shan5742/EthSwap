import React from "react";

export default function FormSwitcher({ setCurrentForm }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 32,
      }}
    >
      <button
        style={{
          background: "none",
          border: "none",
          fontSize: 18,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
        onClick={() => setCurrentForm("buy")}
      >
        Buy
      </button>
      <button
        style={{
          background: "none",
          border: "none",
          fontSize: 18,
          fontWeight: "bold",
          textDecoration: "underline",
        }}
        onClick={() => setCurrentForm("sell")}
      >
        Sell
      </button>
    </div>
  );
}
