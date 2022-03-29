import React, { useState } from "react";
import BuyForm from "./BuyForm";
import FormSwitcher from "./FormSwitcher";
import SellForm from "./SellForm";

export default function Main({ tokenBalance, ethBalance, buyTokens }) {
  const [currentForm, setCurrentForm] = useState("buy");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 64,
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <FormSwitcher setCurrentForm={setCurrentForm} />

      {currentForm === "buy" ? (
        <BuyForm
          tokenBalance={tokenBalance}
          ethBalance={ethBalance}
          buyTokens={buyTokens}
        />
      ) : (
        <SellForm
          tokenBalance={tokenBalance}
          ethBalance={ethBalance}
          buyTokens={buyTokens}
        />
      )}
    </div>
  );
}
