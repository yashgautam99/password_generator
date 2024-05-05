import { useCallback, useState, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  function handleCopy() {
    navigator.clipboard.writeText(password);
  }

  const handleToggleNumber = () => {
    setNumberAllowed((prev) => !prev);
  };

  const handleToggleChar = () => {
    setCharAllowed((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl mb-6">Password Generator</h1>
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            className="w-full rounded-lg p-3 outline-none"
          />
          <button
            className="bg-blue-900 text-white rounded-lg px-6 py-3 ml-2"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
        <div className="mb-4 flex items-center">
          <label className="text-gray-700 mr-4">Length:</label>
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer w-2/3"
            onChange={(e) => setLength(e.target.value)}
          />
          <span className="text-gray-700 ml-2">{length}</span>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={handleToggleChar}
            className="mr-2"
          />
          <label htmlFor="characterInput" className="text-gray-700 mr-4">
            Include Characters
          </label>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={handleToggleNumber}
            className="mr-2"
          />
          <label htmlFor="numberInput" className="text-gray-700">
            Include Numbers
          </label>
        </div>
        <button
          className="bg-blue-900 text-white rounded-lg px-6 py-3 w-full"
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
