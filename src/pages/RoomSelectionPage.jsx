import React, { useState } from 'react';
import './RoomSelectionPage.css';

export default function RoomSelectionPage() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [maxPeople, setMaxPeople] = useState(2);

  const createRoom = () => {
    const newRoom = {
      name: roomName,
      maxPeople,
      link: `/rooms/${roomName.replaceAll(' ', '-')}`,
    };
    setRooms([...rooms, newRoom]);
    setRoomName('');
  };

  return (
    <div className="room-selection-page">
      <h2>Raumauswahl</h2>
      <div>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Raumname"
        />
        <input
          type="number"
          value={maxPeople}
          onChange={(e) => setMaxPeople(e.target.value)}
          placeholder="Max. Personen"
        />
        <button onClick={createRoom}>Raum erstellen</button>
      </div>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <a href={room.link}>{room.name} (Max: {room.maxPeople})</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
