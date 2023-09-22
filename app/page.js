"use client";
import React, { useEffect, useState } from "react";
import jsonArr from "./temp";

const Page = () => {
  const [word, setWord] = useState("");
  const [copyArr, setCopyArr] = useState(jsonArr);
  const [wordIndex, setWordIndex] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [loadedWords, setLoadedWords] = useState(25);
  const [timer, setTimer] = useState(60); // 60 seconds timer

  const handleInputChange = (e) => {
    const userInput = e.target.value.trim();
    setWord(userInput);

    if (userInput === copyArr[wordIndex].text) {
      setWordIndex(wordIndex + 1);
      setCorrectWords(correctWords + 1);
      setWord("");

      if (correctWords + 1 === loadedWords) {
        setCopyArr((prevCopyArr) => [
          ...prevCopyArr,
          ...jsonArr.slice(loadedWords, loadedWords + 25),
        ]);
        setLoadedWords(loadedWords + 25);
      }
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const renderWord = (word, index) => {
    const isCurrentWord = index === wordIndex;
    const isCorrect = index < wordIndex;
    return (
      <>
        <div>
          <span
            key={word.id}
            className={`${
              isCurrentWord
                ? "bg-emerald-800 p-1 text-emerald-100 text-2xl rounded-md"
                : isCorrect
                ? "text-emerald-50"
                : ""
            } `}
          >
            {word.text}
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="space-y-5 mt-10 mb-10">
        <span className="text-4xl text-emerald-100 text-center">
          Typing Test
        </span>
        <p className="text-center ">Time left: {timer} seconds</p>
      </h1>
      <div className="flex flex-wrap bg-gray-900 p-10 w-2/3 rounded-xl space-x-3 space-y-3 justify-center text-2xl">
        {copyArr
          .slice(0, loadedWords)
          .map((word, index) => renderWord(word, index))}
      </div>
      {timer === 0 && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-md">
            <p className="text-2xl text-emerald-100">
              Your score is {correctWords}
            </p>
            <button
              className="bg-emerald-800 text-emerald-100 p-2 rounded-md mt-3"
              onClick={() => {
                setTimer(60);
                setWordIndex(0);
                setCorrectWords(0);
              }}
            >
              Try again
            </button>
          </div>
        </div>
      )}
      <input
        type="text"
        value={word}
        onChange={handleInputChange}
        className="bg-text-100 p-2 w-4/5 fixed bottom-4 bg-gray-700 rounded-lg text-2xl text-emerald-100"
      />
    </div>
  );
};

export default Page;
