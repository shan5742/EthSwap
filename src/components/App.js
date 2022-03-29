import React, { useEffect, useState } from "react";
import Web3 from "web3";
// Import smart contract ABIs
import EthSwap from "../abis/EthSwap.json";
import Token from "../abis/Token.json";
import Main from "./Main";
// Import components
import Nav from "./Nav";

export default function App() {
  const [account, setAccount] = useState("");
  const [tokenContract, setTokenContract] = useState({});
  const [ethSwapContract, setEthSwapContract] = useState({});
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeb3();
    loadBlockChainData();
    console.log("WEB3", window.web3);
  }, []);

  // Load web3
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  // Grab data from blockchain
  const loadBlockChainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const ethBalanceData = await web3.eth.getBalance(accounts[0]);
    setEthBalance(ethBalanceData);
    setAccount(accounts[0]);

    // Load token
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address);
      setTokenContract(token);
      let tokenBalanceData = await token.methods.balanceOf(accounts[0]).call();
      console.log("Balance", tokenBalanceData.toString());
      setTokenBalance(tokenBalanceData.toString());
    } else {
      window.alert("Token contract not deployed to connected network");
    }

    // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId];
    if (ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address);
      setEthSwapContract(ethSwap);
    } else {
      window.alert("EthSwap contract not deployed to connected network");
    }

    setLoading(false);
  };

  const buyTokens = (etherAmount) => {
    setLoading(true);
    ethSwapContract.methods
      .buyTokens()
      .send({ value: etherAmount, from: account })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };

  const sellTokens = (tokenAmount) => {
    setLoading(true);
    tokenContract.methods
      .approve(ethSwapContract.address, tokenAmount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        ethSwapContract.methods
          .sellTokens(tokenAmount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false);
          });
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Nav account={account} />
      <div>
        <div>
          <main role="main">
            <div>
              <Main
                ethBalance={ethBalance}
                tokenBalance={tokenBalance}
                buyTokens={buyTokens}
                sellTokens={sellTokens}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
