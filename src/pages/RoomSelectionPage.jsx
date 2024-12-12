import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import für Übersetzungen
import './RoomSelectionPage.css';

export default function RoomSelectionPage() {
  const { t } = useTranslation(); // Übersetzungsfunktion einbinden

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
      <h2>{t('room_selection_title')}</h2> {/* Raumauswahl-Titel übersetzt */}
      <div>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder={t('room_name')} // Übersetztes Placeholder
        />
        <input
          type="number"
          value={maxPeople}
          onChange={(e) => setMaxPeople(e.target.value)}
          placeholder={t('max_people')} // Übersetztes Placeholder
        />
        <button onClick={createRoom}>{t('create_room')}</button> {/* Button-Text übersetzt */}
      </div>
      <ul>
        {rooms.map((room, index) => (
          <li key={index}>
            <a href={room.link}>
              {room.name} ({t('max_label')}: {room.maxPeople})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
