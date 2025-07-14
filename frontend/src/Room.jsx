import { useState } from "react";

function Room({ onJoin }) {
  const [roomInput, setRoomInput] = useState("");

  const handleJoin = () => {
    if (roomInput.trim() !== "") {
      onJoin(roomInput.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 to-white">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-semibold tracking-wide">Collaborative Whiteboard</h1>
      </nav>

      {/* Main Form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Join a Room</h2>

          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <button onClick={handleJoin} className="w-full relative inline-flex items-center justify-center p-0.75 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Join Room
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
