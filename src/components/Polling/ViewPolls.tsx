import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useChatScroll from '../Chat/ChatScroll';
import Header from '../Sidebar/Header/Header';
import { BasicIcons } from '@/assets/BasicIcons';

// Define the interface for a single poll
interface IPoll {
  id: string;
  question: string;
  options: string[];
}

const ViewPolls = () => {
  // State to store fetched polls
  const [polls, setPolls] = useState<IPoll[]>([]);

  // Ref for scrolling based on poll changes
  const ref = useChatScroll(polls);

  // Function to fetch poll data from Pinata using IPFS hash
  const fetchPollsFromIPFS = async () => {
    try {
        const res = await axios.get('https://api.pinata.cloud/data/pinList?status=pinned', {
            headers: {
              pinata_api_key: `76d92b17caf26289fe6c`,  
              pinata_secret_api_key: `91d3521125be00147dc0ff64096ab8706c7533c236bfc9114a47618c5a470090`,
            },
        });

        if (res.data.count > 0) {
            // Get the first pinned item
            const firstItem = res.data.rows[0];
            // Extract the IPFS hash
            const ipfsHash = firstItem.ipfs_pin_hash;

            // Now fetch the actual data using the IPFS hash
            const pollRes = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);

            // Set the fetched data to state
            setPolls([pollRes.data]);
        } else {
            console.error('No pinned items found on Pinata.');
        }
    } catch (error) {
        console.error('Error fetching polls from IPFS:', error);
        throw error; // Throw the error to be caught and handled by the caller
    }
};

  useEffect(() => {
    fetchPollsFromIPFS();
  }, []); // Fetch polls only once when the component mounts

  // Function to handle voting on a poll
  const handleVote = (pollId: string, optionIndex: number) => {
    // Implement logic to handle voting on the poll
    console.log('Vote:', pollId, 'Option:', optionIndex);
  };

  // Function to handle manual refresh
  const handleRefresh = () => {
    fetchPollsFromIPFS();
  };

  return (
    <div className="w-1/4 h-4/5 p-2 mr-3 bg-[#191B1F] rounded-lg">
      <div className="flex flex-col h-full">
        {/* Header for the View Polls section */}
        <Header
          title="View Polls"
          icon={BasicIcons.chat} // Use an appropriate polling icon here
          onClose={() => {}}
        />
        {/* Refresh button */}
        <button onClick={handleRefresh} className="mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Refresh
        </button>
        {/* List of polls */}
        <div ref={ref} className="overflow-auto mt-2 flex-col h-full">
          {polls.map((poll: IPoll) => (
            <div key={poll.id} className="p-4 border-b border-gray-700">
              {/* Display the poll question */}
              <div className="mb-2 text-lg">{poll.question}</div>
              {/* Display options as radio buttons */}
              {poll.options.map((option, index) => (
                <div key={`${poll.id}-${index}`} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`${poll.id}-${index}`}
                    name={poll.id}
                    value={option}
                    onChange={() => handleVote(poll.id, index)}
                  />
                  <label htmlFor={`${poll.id}-${index}`} className="ml-2">{option}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPolls;
