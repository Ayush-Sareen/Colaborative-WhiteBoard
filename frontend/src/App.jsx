
import { useState } from "react";
import Room from "./Room.jsx";
import Whiteboard from "./Whiteboard.jsx";

function App() {
  const [roomId, setRoomId] = useState(null);

  return roomId ? (
    <Whiteboard roomId={roomId} />
  ) : (
    <Room onJoin={setRoomId} />
  );
}

export default App;

