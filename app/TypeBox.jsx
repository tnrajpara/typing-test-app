"use client";
import { useState, useRef, useEffect } from "react";
import words from "./words";

const TypeBox = () => {
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeOver, setTimeOver] = useState(false);
  const [wrongWord, setWrongWord] = useState(false);
  const [arr, setArr] = useState([]);
  const [seconds, setSeconds] = useState(30);
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [countCharacter, setCountCharacters] = useState(0);
  const secondArrRef = useRef([]);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
    if (seconds <= 0) {
      setTimeOver(true);
      calculateSpeed();
    }
  }, [seconds]);

  useEffect(() => {
    const firstArr = shuffle(jsonArr.slice(0, 30));
    secondArrRef.current = shuffle(jsonArr.slice(30, 60));
    setArr(firstArr);
  });

  const calculateSpeed = () => {
    let speed = Math.floor((countCharacter / 5 / (30 - seconds)) * 60);
    setSpeed(speed);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value.toLowerCase() === arr[currentIndex].text.toLowerCase()) {
      if (currentIndex <= arr.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setInputValue("");
        setCount((count) => count + 1);
      }
      if (currentIndex === arr.length - 1) {
        setArr(secondArrRef.current);
        setCurrentIndex(0);
      }
    }
    let wordArr = arr[currentIndex].text.toLowerCase().split("");
    let inputArr = value.toLowerCase().split("");

    for (let i = 0; i < inputArr.length; i += 1) {
      if (inputArr[i] === wordArr[i]) {
        setWrongWord(false);
        setCountCharacters(countCharacter + 1);
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
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="flex justify-between items-center px-4 py-4 lg:mb-5 flex-wrap">
        <h1 className="text-center text-4xl text-yellow-500  font-serif ">
          Typing Writer
        </h1>
        <h2 className="text-center text-2xl font-serif text-yellow-500">
          {seconds}
        </h2>
      </div>

      <div className="bg-[#323437]  text-[#d1d0c5]">
        <div className="">
          {timeOver ? (
            <div className="flex justify-center items-center flex-col font-mono">
              <h1 className="text-center text-2xl ">Time Over</h1>
              <h4 className="text-gray-400">{speed}</h4>
              <button onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex justify-center flex-col">
              <div className="flex flex-wrap h-full justify-center items-center my-5">
                {arr.map((word, index) => (
                  <div key={word.id}>
                    <p className="text-[#646669] text-xl w-4/5 ">
                      {word.text.split(" ").map((letter, i) => (
                        <letter
                          key={i}
                          className={
                            index === currentIndex
                              ? wrongWord
                                ? "bg-red-500 text-white px-0.5 py-0.5 ml-5"
                                : "bg-white text-gray-900 px-0.5 py-0.5 ml-5"
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
