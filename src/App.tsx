import React, { useCallback, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core'
import {useETHBalances} from './state/wallet/hooks'; 

// import ApplicationUpdater from "./state/application/updater";
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

import { useActiveWeb3React } from "./hooks/index";
import { updateBlockNumber } from "./state/application/actions";
import { useDispatch } from "react-redux";
import useDebounce from "./hooks/useDebounce";
import useIsWindowVisible from "./hooks/useIsWindowVisible";


 const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,137,43114,56]
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
			{/* <ApplicationUpdater /> */}
      <MulticallUpdater />
		</>
	);
}

function App() {
  

  const { activate, deactivate } = useWeb3React();
  const { active, chainId, account, } = useWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ""];
  console.log(userEthBalance)
  const { library} = useActiveWeb3React();
  console.log(library?.getBlockNumber())
  const dispatch = useDispatch();
  const windowVisible = useIsWindowVisible();
  const [state, setState] = useState<{
    chainId: number | undefined;
    blockNumber: number | null;
  }>({
    chainId,
    blockNumber: null
  });
// update application
  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState(state => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== "number")
            return { chainId, blockNumber };
          return {
            chainId,
            blockNumber: Math.max(blockNumber, state.blockNumber)
          };
        }
        return state;
      });
    },
    [chainId, setState]
  );
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined;

    setState({ chainId, blockNumber: null });

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch(error =>
        console.error(
          `Failed to get block number for chainId: ${chainId}`,
          error
        )
      );

    library.on("block", blockNumberCallback);
    return () => {
      library.removeListener("block", blockNumberCallback);
    };
  }, [dispatch, chainId, library, blockNumberCallback, windowVisible]);

  const debouncedState = useDebounce(state, 100);

  useEffect(() => {
    if (
      !debouncedState.chainId ||
      !debouncedState.blockNumber ||
      !windowVisible
    )
      return;
    dispatch(
      updateBlockNumber({
        chainId: debouncedState.chainId,
        blockNumber: debouncedState.blockNumber
      })
    );
  }, [
    windowVisible,
    dispatch,
    debouncedState.blockNumber,
    debouncedState.chainId
  ]);
// update muticall


  useEffect(()=>{
    activate(Injected)
  },[])


console.log(state)


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
									<BalanceText style={{ flexShrink: 0 }} className="text">
										{/* {formatConnectorName()} */}
										{Math.floor(Number(userEthBalance?.toSignificant(4)) * 1000000) / 1000000}
									</BalanceText>
								) : null}

          </>
  );
}

export default App;
 

