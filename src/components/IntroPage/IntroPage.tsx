'use client';

// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';


// type LobbyPageProps = {
//   roomId: string;
// };

// const IntroPage: React.FC<LobbyPageProps> = ({ roomId }) => {
//   const { push } = useRouter();

//   useEffect(() => {
//     push(`/${roomId}/lobby`);
//   }, []);

//   return null;
// };
// export default IntroPage;
// 'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

type IntroPageProps = {
  roomId: string;
};

const IntroPage: React.FC<IntroPageProps> = ({ roomId }) => {
  useEffect(() => {
    window.location.href = `/${roomId}/lobby`;
  }, [roomId]); // Add roomId to the dependency array

  // Since the redirection happens with window.location.href, you don't need to return any JSX
  return null;
};

export default IntroPage;
