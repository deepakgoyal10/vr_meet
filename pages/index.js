import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const router = useRouter();
  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };
  const joinRoom = () => {
    if (roomId) router.push(roomId);
    else {
      alert("Please provide a room id");
    }
  };
  const [roomId, setRoomId] = useState("");
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
      <h1 className="text-2xl font-bold">VR Meet</h1>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter room id"
          className="rounded-md px-2 py-1"
          onChange={(e) => setRoomId(e?.target?.value)}
          value={roomId}
        />
        <button
          className="bg-black text-white font-semibold px-2 py-1 rounded-md"
          onClick={joinRoom}
        >
          Join room
        </button>
      </div>
      <span>----------------OR-----------------</span>
      <button onClick={createAndJoin}>Create a new room</button>
    </div>
  );
}

export default Home;
