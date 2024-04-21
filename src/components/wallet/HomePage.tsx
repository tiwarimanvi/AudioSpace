import {TonConnectButton,useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
// import React from 'react';

const HomePage = () => {
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  return (
    // <div>
    //   <TonConnectButton />
    // </div>
    <div className="connect-wallet-button">
    {wallet ? (
        <button onClick={() => tonConnectUi.disconnect()}>
            Disconnect Wallet
        </button>
    ) : (
        <TonConnectButton onClick={() => tonConnectUi.openModal()}></TonConnectButton>
    )}
</div>
  );
};

export default HomePage;
