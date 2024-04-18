"use client";
import { useState, useRef, useEffect } from "react";
import jsonArr from "./temp";
import { Input } from "postcss";

const TypeBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [completed, setCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongWord, setWrongWord] = useState();

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.toLowerCase() === jsonArr[currentIndex].text.toLowerCase()) {
      if (currentIndex < jsonArr.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        console.log(currentIndex);
        setInputValue("");
      } else {
        setCompleted(true);
      }
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentIndex]);

  return (
    <div className="h-screen bg-[#323437]">
      <h1 className="text-center text-4xl text-yellow-500 px-5 py-5 font-mono">
        Typing Writer
      </h1>

      <div className="bg-[#323437]  flex items-center justify-center text-center text-[#d1d0c5]">
        <div className="flex flex-wrap w-full">
          {completed ? (
            <div>All spellings completed!</div>
          ) : (
            <div>
              <div className="flex flex-wrap ">
                {jsonArr.map((word, index) => (
                  <div key={index}>
                    <p className="text-[#646669] text-xl">
                      {word.text.split(" ").map((letter, i) => (
                        <letter
                          key={i}
                          className={
                            index === currentIndex
                              ? "text-white ml-5"
                              : "text-[#646669] ml-5 "
                          }
                        >
                          {letter}
                        </letter>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                ref={inputRef}
                className="bg-[#323437] border-white outline-none w-11/12 p-2 mt-5"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeBox;
