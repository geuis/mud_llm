import { readFileSync, existsSync } from 'fs';
import GameMap from "./imports/gameMap.mjs";

// clear the terminal
console.clear();

const map = new GameMap();
const firstRoomId = 'first-room-entrance-id'

const mapJsonPath = `${process.cwd()}/data/map.json`;

if (existsSync(mapJsonPath)) {
  map.rooms = JSON.parse(readFileSync(mapJsonPath));
} else {
  // add initial room
  map.addRoom({
    id: firstRoomId,
    name: 'Entrance',
    description: 'You are in a dimly lit hallway.',
    numberOfExits: 4
  });
}

map.currentRoomId = firstRoomId;

map.promptPlayer();
