import React, { useState } from 'react';
import useChatScroll from '../Chat/ChatScroll';
import { nanoid } from 'nanoid';
import useStore from '@/store/slices';
import { BasicIcons } from '@/assets/BasicIcons';
import { useDataMessage } from '@huddle01/react/hooks';
import Header from '../Sidebar/Header/Header';

interface IPoll {
    question: string;
    options: string[];
  }

const Polling = () => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '']); // Initial options, adjust as needed
 
  const setIsPollingOpen = useStore((state) => state.setIsPollingOpen);
  // Define addPoll function directly in the component
  const addPoll = (newPoll: IPoll) => {
    // You can implement the logic to add the new poll to the state here
    console.log('Adding poll:', newPoll);
    // For example, if you have a store, you can dispatch an action to add the poll:
    // dispatch(addPollAction(newPoll));
  };
  
  const ref = useChatScroll(options); // Assuming options change triggers scroll

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
    // Validate question and options
    if (question.trim() && options.every((option) => option.trim())) {
      const newPoll = {
        question: question.trim(),
        options: options.map((option) => option.trim()),
      };
      addPoll(newPoll);
      // Reset form
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
          icon={BasicIcons.chat} // Use an appropriate polling icon here
          onClose={() => setIsPollingOpen(false)}
        />
        <div ref={ref} className="overflow-auto mt-2 flex-col h-full">
          {/* Polling form */}
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
