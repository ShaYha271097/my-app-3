import React, { useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'
import {useETHBalances} from './state/wallet/hooks'; 

import ApplicationUpdater from "./state/application/updater";
import MulticallUpdater from "./state/muiticall/updater";
// const CoinbaseWallet = new WalletLinkConnector({
//   url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//   appName: "Web3-react Demo",
//   supportedChainIds: [1, 3, 4, 5, 42],
//  });
 
//  const WalletConnect = new WalletConnectConnector({
//   rpcUrl: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
//  });
 
 const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,137]
 });
const BalanceText = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 576px) {
		font-size: 12px;
	}
`;


function Updaters() {
	return (
		<>
			<ApplicationUpdater />
      <MulticallUpdater />
		</>
	);
}

function App() {
  

  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account } = useWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  console.log(userEthBalance)


  useEffect(()=>{
    activate(Injected)
  },[])
  return (
       <>
       	<Updaters />
          <span>hello</span>
          {/* <button onClick={() => { activate(Injected) }}>Metamask</button> */}
          <button onClick={deactivate}>Disconnect</button>
            <div>Connection Status: {active ? 'true' : 'false'}</div>
          <div>Account: {account}</div>
          <div>Network ID: {chainId}</div>
          {account && userEthBalance ? (
	 							     	<BalanceText style={{ flexShrink: 0 }}   className="text">
	 							     
                        </BalanceText>
                      ) : null} 

          </>
  );
}

export default App;
 

