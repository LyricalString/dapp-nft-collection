import { useEffect, useState } from 'react';
import './App.css';
import { GiBoltSpellCast } from 'react-icons/gi';

function App() {
  const [account, setAccount] = useState("");

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    } else {
      console.log('Please install MetaMask!');
    }
  }

  useEffect(() => {
    initConnection();
  }, [])

  return (
    <div className='page'>
      <div className='header'>
        <img src={require('./assets/images/logo.webp')} className='artIcon' />
        <p>
          11/15
          <span>
            <GiBoltSpellCast style={{ marginLeft: "5px" }} />
          </span>
        </p>
        {account === "" ? (
          <button onClick={initConnection} className='button'>Connect</button>
        ) : (
          <p>...{account.substring(account.length - 7)}</p>
        )
        }
      </div>
    </div >
  );
}

export default App;
