// 'use server';
// import IntroPage from '@/components/IntroPage/IntroPage';
// import "@twa-dev/sdk";
// interface RoomDetails {
//   message: string;
//   data: {
//     roomId: string;
//   };
// }

// const createRandomRoom = async () => {
//   const res = await fetch('https://api.huddle01.com/api/v1/create-room', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: 'Test Room',
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': process.env.API_KEY ?? '',
//     },
//     cache: 'no-store',
//   });
//   const data: RoomDetails = await res.json();
//   console.log('Response data:', data);
//   const { roomId } = data.data;
//   return roomId;
// };

// export default async function Home() {
//   const roomId = await createRandomRoom();
//   return <IntroPage roomId={roomId} />;
 
// }
import IntroPage from '@/components/IntroPage/IntroPage';
import "@twa-dev/sdk";

interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

const createRandomRoom = async () => {
  try {
    const res = await fetch('https://api.huddle01.com/api/v1/create-room', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Room',
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY ?? '',
      },
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to create room');
    }

    const data: RoomDetails = await res.json();
    console.log('Response data:', data);

    if (!data.data || !data.data.roomId) {
      throw new Error('Room ID not found in response data');
    }

    return data.data.roomId;
  } catch (error) {
    console.error('Error creating room:', error);
    // Handle error gracefully, e.g., return a default room ID or rethrow the error
    throw error;
  }
};

export default async function Home() {
  try {
    const roomId = await createRandomRoom();
    return <IntroPage roomId={roomId} />;
  } catch (error) {
    // Handle error gracefully, e.g., show an error message
    console.error('Error in Home page:', error);
    return <div>Error occurred: {error.message}</div>;
  }
}
