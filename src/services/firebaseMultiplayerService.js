// Firebase-basierter Multiplayer Service
// Synchronisiert Spieler ÜBER alle Browser und Tabs hinweg via Firebase Realtime Database

import { database } from '../config/firebase';
import { ref, set, update, remove, onValue, off } from 'firebase/database';

export class FirebaseMultiplayerService {
  constructor(roomId, userId, userName) {
    this.roomId = roomId;
    this.userId = userId;
    this.userName = userName;
    this.localPlayers = new Map(); // userId -> playerData
    this.listeners = [];
    this.playerRefsWatching = new Map(); // Track active listeners

    console.log(`🔥 Firebase Multiplayer Service initialized for room: ${this.roomId}`);

    // Starte Synchronisation
    this.startSync();
  }

  startSync() {
    // Firebase path: /rooms/{roomId}/players
    const playersRef = ref(database, `rooms/${this.roomId}/players`);

    console.log(`🔥 Starting Firebase listener for room: ${this.roomId}`);

    // Höre auf alle Spieler in diesem Raum
    const unsubscribe = onValue(
      playersRef,
      (snapshot) => {
        console.log(`📡 Firebase event fired! Snapshot exists: ${snapshot.exists()}`);

        if (snapshot.exists()) {
          const allPlayers = snapshot.val();
          console.log(`📊 Firebase returned ${Object.keys(allPlayers).length} players:`, Object.keys(allPlayers));

          // Vergleiche mit meiner lokalen Liste
          this.syncPlayers(allPlayers);
        } else {
          console.log(`⚠️ Firebase snapshot exists but is empty`);
        }
      },
      (error) => {
        console.error(`❌ Firebase sync error for room ${this.roomId}:`, error);
      }
    );

    // Speichere diesen Listener und Unsubscribe für später
    this.mainPlayersRef = playersRef;
    this.firebaseUnsubscribe = unsubscribe;
  }

  syncPlayers(firebaseData) {
    const currentPlayerIds = new Set(this.localPlayers.keys());
    const firebasePlayerIds = new Set(Object.keys(firebaseData || {}));

    console.log(`🔄 Syncing players - Firebase has ${firebasePlayerIds.size} players, local has ${currentPlayerIds.size}`);

    // Finde neue Spieler und aktualisiere bestehende
    for (const playerId of firebasePlayerIds) {
      const playerData = firebaseData[playerId];

      if (!currentPlayerIds.has(playerId)) {
        // NEUER SPIELER
        console.log(`🎮 New player from Firebase: ${playerData.userName} (${playerId})`);
        this.localPlayers.set(playerId, playerData);
        this.notifyListeners('playerJoined', playerData);
      } else {
        // BESTEHENDES SPIELER - PRÜFE POSITION UPDATE
        const localPlayer = this.localPlayers.get(playerId);

        // Prüfe ob Position sich geändert hat
        if (
          localPlayer.position.x !== playerData.position.x ||
          localPlayer.position.y !== playerData.position.y ||
          localPlayer.position.z !== playerData.position.z
        ) {
          console.log(`📍 Position update from Firebase for ${playerData.userName}: (${playerData.position.x.toFixed(2)}, ${playerData.position.y.toFixed(2)}, ${playerData.position.z.toFixed(2)})`);
          localPlayer.position = playerData.position;
          localPlayer.timestamp = playerData.timestamp;
          this.notifyListeners('playerMoved', { userId: playerId, position: playerData.position });
        }

        // Prüfe ob Rotation sich geändert hat
        if (
          localPlayer.rotation?.x !== playerData.rotation?.x ||
          localPlayer.rotation?.y !== playerData.rotation?.y ||
          localPlayer.rotation?.z !== playerData.rotation?.z
        ) {
          console.log(`🔄 Rotation update from Firebase for ${playerData.userName}`);
          localPlayer.rotation = playerData.rotation;
          this.notifyListeners('playerRotated', { userId: playerId, rotation: playerData.rotation });
        }
      }
    }

    // Finde entfernte Spieler
    for (const playerId of currentPlayerIds) {
      if (!firebasePlayerIds.has(playerId)) {
        console.log(`👋 Player left: ${playerId}`);
        this.localPlayers.delete(playerId);
        this.notifyListeners('playerLeft', { userId: playerId });
      }
    }
  }

  addPlayer(userId, userName, isLocalPlayer = false) {
    const playerData = {
      userId,
      userName,
      position: {
        x: Math.random() * 80 - 40,
        y: 1,
        z: Math.random() * 80 - 40,
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },
      isLocalPlayer,
      hasWebcam: isLocalPlayer,
      timestamp: Date.now(),
    };

    // Speichere in Firebase
    const playerRef = ref(database, `rooms/${this.roomId}/players/${userId}`);
    console.log(`📝 Adding player to Firebase - Room: ${this.roomId}, Player: ${userName}`);
    set(playerRef, playerData).then(() => {
      console.log(`✅ Player saved to Firebase successfully: ${userName}`);
    }).catch(err => {
      console.error(`❌ Error adding player to Firebase:`, err);
    });

    // Lokal hinzufügen
    this.localPlayers.set(userId, playerData);
    this.notifyListeners('playerJoined', playerData);

    return playerData;
  }

  removePlayer(userId) {
    // Entferne aus Firebase
    const playerRef = ref(database, `rooms/${this.roomId}/players/${userId}`);
    remove(playerRef).catch(err => {
      console.error(`❌ Error removing player from Firebase:`, err);
    });

    // Lokal entfernen
    this.localPlayers.delete(userId);
    this.notifyListeners('playerLeft', { userId });
  }

  updatePlayerPosition(userId, position) {
    const player = this.localPlayers.get(userId);
    if (player) {
      player.position = position;
      player.timestamp = Date.now();

      // Update Firebase mit Retry-Logik
      const playerRef = ref(database, `rooms/${this.roomId}/players/${userId}`);
      const maxRetries = 3;
      const retryDelay = 500; // ms

      const attemptUpdate = (retryCount = 0) => {
        update(playerRef, {
          position,
          timestamp: Date.now(),
        })
          .then(() => {
            // Erfolgreich - kein Logging erforderlich (normal)
          })
          .catch(err => {
            if (retryCount < maxRetries) {
              // Retry nach kurzer Verzögerung
              setTimeout(() => attemptUpdate(retryCount + 1), retryDelay);
              console.warn(`⚠️ Position update failed, retry ${retryCount + 1}/${maxRetries}`);
            } else {
              // Alle Retries erschöpft
              console.error(`❌ Position update failed after ${maxRetries} retries:`, err);
            }
          });
      };

      attemptUpdate();
      this.notifyListeners('playerMoved', { userId, position });
    }
  }

  updatePlayerRotation(userId, rotation) {
    const player = this.localPlayers.get(userId);
    if (player) {
      player.rotation = rotation;

      // Update Firebase mit Retry-Logik
      const playerRef = ref(database, `rooms/${this.roomId}/players/${userId}`);
      const maxRetries = 3;
      const retryDelay = 500;

      const attemptUpdate = (retryCount = 0) => {
        update(playerRef, {
          rotation,
        })
          .then(() => {
            // Success
          })
          .catch(err => {
            if (retryCount < maxRetries) {
              setTimeout(() => attemptUpdate(retryCount + 1), retryDelay);
              console.warn(`⚠️ Rotation update failed, retry ${retryCount + 1}/${maxRetries}`);
            } else {
              console.error(`❌ Rotation update failed after ${maxRetries} retries:`, err);
            }
          });
      };

      attemptUpdate();
      this.notifyListeners('playerRotated', { userId, rotation });
    }
  }

  getPlayer(userId) {
    return this.localPlayers.get(userId);
  }

  getAllPlayers() {
    return Array.from(this.localPlayers.values());
  }

  getRemotePlayers() {
    return Array.from(this.localPlayers.values()).filter(
      (p) => p.userId !== this.userId
    );
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notifyListeners(type, data) {
    this.listeners.forEach((listener) => {
      listener({ type, data });
    });
  }

  dispose() {
    // Entferne diesen Spieler aus Firebase wenn er den Raum verlässt
    this.removePlayer(this.userId);

    // Cleanup Firebase listeners
    if (this.firebaseUnsubscribe) {
      console.log(`🧹 Unsubscribing from Firebase listener for room ${this.roomId}`);
      this.firebaseUnsubscribe();
    }

    if (this.mainPlayersRef) {
      off(this.mainPlayersRef);
    }

    this.listeners = [];
    console.log(`✓ Firebase Multiplayer Service disposed for room ${this.roomId}`);
  }
}

export default FirebaseMultiplayerService;
