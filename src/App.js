import { useState } from "react";
import Weather from "./Weather";

function App() {
  const [city, setCity] = useState("Chennai");
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setCity(input.trim());
      setInput("");
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mt-10 mb-6">🌤 Weather App</h1>

  
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row mb-6 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Enter city"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 rounded-l-lg border border-gray-300 focus:outline-none flex-1 mb-2 sm:mb-0"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

    
      <Weather location={city} />
    </div>
  );
}

export default App;
