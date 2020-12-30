import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { animated, useSpring } from "react-spring";
import { useVibrate } from "react-use";

import { fadeIn } from "../animations.js";

export default function Select({ children, label, onChange, options }) {
  const [isSelecting, setSelecting] = useState(false);
  const [hasSelected, setSelected] = useState(false);

  const fadeInSpring = useSpring(fadeIn({ delay: 150 }));

  useVibrate(hasSelected, [300], false);

  return (
    <animated.div
      className="w-64 flex flex-col pl-4 md:pl-12 mt-4"
      style={fadeInSpring}
    >
      <label className="text-sm text-white">{label}</label>
      <div className="mt-1 relative">
        <button
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 sm:text-sm"
          onClick={() => setSelecting(!isSelecting)}
        >
          <span className="flex items-center">
            <span className="ml-3 block truncate">{children}</span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {isSelecting && (
          <div className="mt-1 w-full rounded-md bg-white shadow-lg max-h-36 overflow-y-scroll">
            {options.map((option) => (
              <ul
                key={option}
                className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                onClick={() => {
                  onChange(option);
                  setSelected(true);
                  setSelecting(false);
                }}
                onBlur={() => {
                  setSelected(false);
                }}
              >
                <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                  <div className="flex items-center">
                    <span className="ml-3 block font-normal truncate">
                      {option}
                    </span>
                  </div>
                  {option === children && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <FontAwesomeIcon className="text-sm" icon={faCheck} />
                    </span>
                  )}
                </li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </animated.div>
  );
}
