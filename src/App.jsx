import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(" ");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "+=_-?/>.<,:;";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className="p-10 flex flex-col items-center">
      <div className="bg-gray-700 w-2xl  py-8 px-5  rounded-md">
        <h1 className="text-4xl text-center  mb-5 text-white">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="bg-white h-12 w-[80%] px-2 "
            type="text"
            value={password}
            placeholder="Generate Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="w-[20%] bg-orange-300 cursor-pointer active:bg-orange-500 "
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-around mt-4 text-white">
          <div className="w-1/3">
            <input
              type="range"
              min={8}
              max={16}
              className=" cursor-pointer "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="">Length: {length}</label>
          </div>
          <div className="w-1/3 flex justify-center">
            <input
              type="checkbox"
              className="mx-2"
              id="numberinput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="w-1/3 flex justify-center">
            <input
              type="checkbox"
              className="mx-2"
              defaultChecked={numberAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
