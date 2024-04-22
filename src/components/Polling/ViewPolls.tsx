import React from 'react';
import useChatScroll from '../Chat/ChatScroll';
import Header from '../Sidebar/Header/Header';
import { BasicIcons } from '@/assets/BasicIcons';
import useStore from '@/store/slices';
// Define the interface for a single poll
interface IPoll {
  id: string;
  question: string;
  options: string[];
}

const ViewPolls = () => {
  // Assuming useStore is your custom hook to fetch polls from your store
  // Replace useStore with your actual state management hook
  const polls: IPoll[] = []; // Fetch polls from your store here

  const setIsViewPollsOpen = useStore((state) => state.setIsViewPollsOpen);

  // Ref for scrolling based on poll changes
  const ref = useChatScroll(polls);

  // Function to handle voting on a poll
  const handleVote = (pollId: string, optionIndex: number) => {
    // Implement logic to handle voting on the poll
    console.log('Vote:', pollId, 'Option:', optionIndex);
  };

  return (
    <div className="w-1/4 h-4/5 p-2 mr-3 bg-[#191B1F] rounded-lg">
      <div className="flex flex-col h-full">
        {/* Header for the View Polls section */}
        <Header
          title="View Polls"
          icon={BasicIcons.chat} // Use an appropriate polling icon here
          onClose={() => setIsViewPollsOpen(false)}
        />
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
