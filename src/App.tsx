import React, { useEffect, useRef, useState } from 'react';
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { AarcProvider } from './context/AarcProvider';
import DynamicAarcApp from './components/DynamicAarcApp';
import "@aarc-xyz/eth-connector/styles.css"
import './App.css';
import { AarcFundKitModal } from '@aarc-xyz/fundkit-web-sdk';
import { aarcConfig } from './config/aarcConfig';
import { TOKEN_ADDRESS_SYMBOL_MAP } from './constants';

declare global {
  interface Window {
    __VUE__: boolean;
  }
}

window.__VUE__ = true;

const App = () => {
  const aarcModalRef = useRef(new AarcFundKitModal(aarcConfig));
  const aarcModal = aarcModalRef.current;
  const [tokenAddress, setTokenAddress] = useState('');

  useEffect(() => {
    // Get the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Check if 'tokenAddress' parameter exists
    const tokenAddress = searchParams.get('tokenAddress');
    const chainId = searchParams.get('chainId');

    // If tokenAddress parameter is found, log it
    if (tokenAddress) {
      console.log('Token Address found:', tokenAddress);
      console.log('chainId: ', chainId);
      setTokenAddress(tokenAddress);
      aarcModal.updateDestinationToken(tokenAddress, Number(chainId));
    } else {
      console.log('No tokenAddress parameter found in URL');
    }
  }, [aarcModal]); // Empty dependency array ensures this runs once when component mounts


  return (
    <React.StrictMode>
      <DynamicContextProvider
      theme="auto"
        settings={{
          environmentId: import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID,
          walletConnectors: [EthereumWalletConnectors],
        }}
      >
        <AarcProvider aarcModal={aarcModal}>
          <DynamicAarcApp
            isDark={true}
            logoLight="/logo.png"
            logoDark="/logo.png"
            aarcModal={aarcModal}
            tokenSymbol={TOKEN_ADDRESS_SYMBOL_MAP[tokenAddress]}
          />
        </AarcProvider>
      </DynamicContextProvider>
    </React.StrictMode>
  );
};

export default App;