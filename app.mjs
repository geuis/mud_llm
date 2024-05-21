import { readFileSync, existsSync } from 'fs';
import GameMap from "./imports/gameMap.mjs";
import generateRoomDescription from './imports/generateRoomDescription.mjs';

try {
  // clear the terminal
  console.clear();

  const map = new GameMap();
  const firstRoomId = 'first-room-entrance-id';
  const mapJsonPath = `${process.cwd()}/data/map.json`;

  if (existsSync(mapJsonPath)) {
    map.rooms = JSON.parse(readFileSync(mapJsonPath));
  } else {
    const { roomName, roomDescription } = await generateRoomDescription({ initialRoom: true });
    // const roomName = 'The quiet hill';
    // const roomDescription = 'You stand on a small grassy hill overlooking a prairie with a river running through it. Far in the distance on the horizon is a distant castle.';

    // add initial room
    await map.addRoom({
      id: firstRoomId,
      name: roomName,
      description: roomDescription,
      numberOfExits: 4
    });
  }

  map.currentRoomId = firstRoomId;

  map.promptPlayer();
} catch (err) {
  console.error(err);
}
