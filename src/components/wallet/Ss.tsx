// import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";


// const Ss = ({ onClick }: { onClick: () => void }) => {
//   const wallet = useTonWallet();
//   const [tonConnectUi] = useTonConnectUI();
//   return (
//     <div className="connect-wallet-button">
//       {wallet ? (
//         <button 
//         onClick={onClick}
//         className='flex items-center justify-center bg-[#246BFD] text-slate-100 rounded-md p-2 mt-2 w-full'>
//             Start Space
//         </button>
//     ) : (
//         <TonConnectButton onClick={() => tonConnectUi.openModal()}></TonConnectButton>
//     )}
//     </div>
//   );
// };

// export default Ss;


import Image from 'next/image';
import { TonConnectButton, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

const Ss = ({ onClick}: { onClick: () => void}) => {
  const wallet = useTonWallet();
  const [tonConnectUi] = useTonConnectUI();
  // Add condition to handle click event only if wallet exists
  const handleClick = () => {
    if (wallet) {
      onClick(); // Call onClick only if wallet exists
    } else {
      tonConnectUi.openModal(); // Open modal to connect wallet
    }
  };

  return (
    <div className="connect-wallet-button">
      {wallet ? (
        <button 
        onClick={handleClick} // Use handleClick instead of onClick directly
        // Disable button if isJoining
        className='flex items-center justify-center bg-[#246BFD] text-slate-100 rounded-md p-2 mt-2 w-full'
      > Start Space
          <Image
            alt='narrow-right'
            width={30}
            height={30}
            src='/images/arrow-narrow-right.svg'
            className='w-6 h-6 ml-1'
          />
      </button>
    ) : (
        <TonConnectButton onClick={() => tonConnectUi.openModal()}></TonConnectButton>
    )}
    </div>
  );
};

export default Ss;
