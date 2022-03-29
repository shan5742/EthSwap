import React, { useState } from "react";
import TokenLogo from "../logo.png";
import EthLogo from "../eth-logo.png";

export default function SellForm({ ethBalance, tokenBalance, buyTokens }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    let etherAmount = window.web3.utils.toWei(inputValue, "ether");
    buyTokens(etherAmount);
  };
  return (
    <>
      <div>Sell Form</div>
      <div
        style={{
          padding: 32,
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 12, fontWeight: "bold", color: "black" }}>
            Input
          </p>
          <p style={{ fontSize: 12, color: "black", opacity: 0.6 }}>
            Balance: {window.web3.utils.fromWei(ethBalance, "ether")}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 32,
            justifyContent: "space-between",
          }}
        >
          <input
            style={{ width: "80%", padding: 8, borderRadius: 8 }}
            type="text"
            placeholder="0"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={EthLogo} height={32} alt="" />
            <p style={{ marginLeft: 8, marginBottom: 0 }}>ETH</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 12, fontWeight: "bold", color: "black" }}>
            Output
          </p>
          <p style={{ fontSize: 12, color: "black", opacity: 0.6 }}>
            Balance: {window.web3.utils.fromWei(tokenBalance, "ether")}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 32,
            justifyContent: "space-between",
          }}
        >
          <input
            style={{ width: "80%", padding: 8, borderRadius: 8 }}
            type="text"
            placeholder="0"
            disabled
            value={inputValue * 100}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={TokenLogo} height={32} alt="" />
            <p style={{ marginLeft: 8, marginBottom: 0 }}>SHAN</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "black", opacity: 0.6 }}>
            Exchange Rate
          </p>
          <p style={{ fontSize: 12, color: "black", opacity: 0.6 }}>
            1 ETH = 100 SHAN
          </p>
        </div>
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: 8,
            backgroundColor: "#343A3F",
            color: "white",
            fontWeight: "bold",
            fontSize: 24,
            border: "none",
            borderRadius: 8,
          }}
        >
          Swap
        </button>
      </div>
    </>
  );
}
