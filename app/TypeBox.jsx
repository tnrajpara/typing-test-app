"use client";
import { useState, useRef, useEffect } from "react";
import jsonArr from "./temp";
import { Turret_Road } from "next/font/google";

const TypeBox = () => {
  const [inputValue, setInputValue] = useState("");
  // const [completed, setCompleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeOver, setTimeOver] = useState(false);
  const [wrongWord, setWrongWord] = useState(false);
  const [arr, setarr] = useState(jsonArr.slice(0, 10));
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    if (seconds <= 0) {
      setTimeOver(true);
    }
  }, [seconds]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.toLowerCase() === arr[currentIndex].text.toLowerCase()) {
      if (currentIndex <= arr.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        console.log(currentIndex);
        setInputValue("");
      }
      if (currentIndex === arr.length - 1) {
        setarr(jsonArr.slice(10, 20));
        setCurrentIndex(0);
      }
    }
    let wordArr = arr[currentIndex].text.toLowerCase().split("");
    let inputArr = value.toLowerCase().split("");

    for (let i = 0; i < inputArr.length; i += 1) {
      if (inputArr[i] === wordArr[i]) {
        setWrongWord(false);
      }
      if (inputArr[i] !== wordArr[i]) {
        setWrongWord(true);
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
    <div
      className=""
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <div className="flex justify-center items-center">
        <h1 className="text-center text-4xl text-yellow-500 px-5 py-5 font-mono lg:mb-5">
          Typing Writer
        </h1>
        <h2>{seconds}</h2>
      </div>

      <div className="bg-[#323437]  text-[#d1d0c5] font-mono">
        <div className="">
          {timeOver ? (
            <div className="flex justify-center items-center ">
              <div className=" px-3 py-5">
                <h1 className="text-center text-2xl font-sans">Time Over</h1>
                <h4 className="text-gray-400">{currentIndex}</h4>
                <button onClick={() => window.location.reload()}>
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center flex-col">
              <div className="flex flex-wrap h-full justify-center items-center my-5">
                {arr.map((word, index) => (
                  <div key={index}>
                    <p className="text-[#646669] text-xl w-4/5">
                      {word.text.split(" ").map((letter, i) => (
                        <letter
                          key={i}
                          className={
                            index === currentIndex && !wrongWord
                              ? "bg-white text-gray-900 px-0.5 py-0.5 ml-5"
                              : "text-[#646669] ml-5"
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
                className="bg-[#323437] border-white border outline-none w-4/5 mx-auto p-2 mt-5"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeBox;
