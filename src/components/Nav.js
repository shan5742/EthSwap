import React from "react";
import Identicon from "identicon.js";
export default function Nav({ account }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 8px",
        backgroundColor: "#343A3F",
      }}
    >
      <a
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: "bold",
        }}
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
      >
        EthSWAP
      </a>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            color: "white",
            fontSize: 16,
            margin: 0,
            opacity: 0.5,
            marginRight: 16,
          }}
        >
          {account}
        </p>
        {account && (
          <img
            width={30}
            height={30}
            src={`data:image/png;base64,${new Identicon(
              account,
              30
            ).toString()}`}
            alt=""
          />
        )}
      </div>
    </nav>
  );
}
