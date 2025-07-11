import React from 'react';
import { FaLocationArrow } from "react-icons/fa";

const InputField = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[60%] relative">
        <div className="rounded-full moving-gradient-bg p-1" >
          <div className="flex items-center bg-gray-800 rounded-full pl-4 pr-10">
            <input 
              className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none py-2"
              type="text"
              placeholder="Ask me anything..."
            />
          </div>
        </div>
        <button className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white hover:text-cyan-300">
          <FaLocationArrow size={18} />
        </button>
      </div>
    </div>
  );
};

export default InputField;
