import React, { useState } from 'react';
import useChatScroll from '../Chat/ChatScroll';
import { nanoid } from 'nanoid';
import axios from 'axios'; // Import Axios
import { BasicIcons } from '@/assets/BasicIcons';
import Header from '../Sidebar/Header/Header';
import useStore from '@/store/slices';

interface IPoll {
  question: string;
  options: string[];
}

const Polling = () => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const setIsPollingOpen = useStore((state) => state.setIsPollingOpen);
  const addPoll = async (newPoll: IPoll) => {
    try {
      const pollData = JSON.stringify(newPoll);
      
      const res = await axios({
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data: {
          pinataMetadata: {
            name: 'PollData.json' // You can change the name as needed
          },
          pinataContent: JSON.parse(pollData)
        },
        headers: {
          pinata_api_key: `76d92b17caf26289fe6c`,  
          pinata_secret_api_key: `91d3521125be00147dc0ff64096ab8706c7533c236bfc9114a47618c5a470090`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Poll data pinned to IPFS:', res.data);
      // You can handle the response here, maybe dispatch an action if you're using Redux
    } catch (error) {
      console.error('Error pinning poll data to IPFS:', error);
      // You can handle errors here, maybe display an error message to the user
    }
  };

  const ref = useChatScroll(options);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const updatedOptions = [...options];
      updatedOptions.splice(index, 1);
      setOptions(updatedOptions);
    }
  };

  const handleChangeOption = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCreatePoll = () => {
    if (question.trim() && options.every((option) => option.trim())) {
      const newPoll = {
        question: question.trim(),
        options: options.map((option) => option.trim()),
      };
      addPoll(newPoll);
      setQuestion('');
      setOptions(['', '']);
    } else {
      // Handle validation error
      // Example: Display an error message
    }
  };

  return (
    <div className="text-white w-1/4 h-4/5 p-2 mr-3 bg-[#191B1F] rounded-lg ">
      <div className="flex flex-col h-full">
        <Header
          title="Polling"
          icon={BasicIcons.chat}
          onClose={() =>setIsPollingOpen(false)}
        />
        <div ref={ref} className="overflow-auto mt-2 flex-col h-full">
          <div className="p-4">
            <input
              type="text"
              placeholder="Enter your question"
              className="p-2 rounded-lg w-full bg-[#343744] text-sm mb-3"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {options.map((option, index) => (
              <div key={nanoid()} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  className="p-2 rounded-lg w-full bg-[#343744] text-sm mr-2"
                  value={option}
                  onChange={(e) => handleChangeOption(index, e.target.value)}
                />
                <button
                  className="p-1 rounded-full bg-red-500 text-white"
                  onClick={() => handleRemoveOption(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              className="p-2 rounded-lg bg-green-500 text-white"
              onClick={handleAddOption}
            >
              Add Option
            </button>
            <button
              className="mt-2 p-2 rounded-lg bg-blue-500 text-white"
              onClick={handleCreatePoll}
            >
              Create Poll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Polling;