import { useEffect, useState } from "react";
import "./App.css";
import { GiBoltSpellCast } from "react-icons/gi";
import abi from "./abi/abi.json";
import { ethers } from "ethers";
import data from "./data/data.json";

function App() {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [nfts, setNfts] = useState(data);

  const balance = async (nft) => {
    const contract = new ethers.Contract(nft.address, abi, provider);
    const tempBalance = await contract.balanceOf(account);
    const tempNfts = [...nfts.list];
    const tempNft = tempNfts.find((item) => item.id === nft.id);
    tempNft.owner = tempBalance > 0;
    tempNft.count = tempBalance.toString();
    setNfts({ list: tempNfts });
  };

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      console.log("1");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("2");
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      console.log("3");
      setProvider(tempProvider);
      setAccount(accounts[0]);
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const checkCollection = async () => {
    data.list.forEach((nft) => {
      balance(nft);
    });
  };

  useEffect(() => {
    initConnection();
  }, []);

  useEffect(() => {
    checkCollection();
  }, [account]);

  return (
    <div className="page">
      <div className="header">
        <img src={require("./assets/images/logo.webp")} className="artIcon" />
        <p>
          11/15
          <span>
            <GiBoltSpellCast style={{ marginLeft: "5px" }} />
          </span>
        </p>
        {account === "" ? (
          <button onClick={initConnection} className="button">
            Connect
          </button>
        ) : (
          <p>...{account.substring(account.length - 7)}</p>
        )}
      </div>
      <div className="main">
        {nfts.list.map((nft, index) => {
          return (
            <div key={index} className="card">
              <div style={{ position: "relative" }}>
                <a
                  target={"_blank"}
                  href={`https://opensea.io/collection/${nft.link}`}
                >
                  <img
                    src={require(`./assets/images/logo.webp`)}
                    className="cardImage"
                  />
                </a>
                <GiBoltSpellCast
                  className="cardImage"
                  style={{ opacity: nft.owner ? 1 : 0.2 }}
                />
                <p className="counter">{nft.count}</p>
              </div>
              <img
                src={require(`./assets/images/${nft.id}.${nft.type}`)}
                className="nftImage"
                style={{ opacity: nft.owner ? 1 : 0.2 }}
              />
              <p className="nftText">{nft.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
