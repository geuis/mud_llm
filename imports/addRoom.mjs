import { randomUUID } from 'crypto';
import generateRoomDescription from './generateRoomDescription.mjs';

// const addRoom = async ({ id = randomUUID(), name = null, description = null, numberOfExits = 4, previousRoomId = null, previousDirection = null }) => {
async function addRoom({ id = randomUUID(), name = null, description = null, numberOfExits = 4, previousRoomId = null, previousDirection = null }) {
  const room = {
    id,
    name,
    description
  };

  // create id's for new rooms that don't exist yet as exits of the current room.
  const directions = {
    'n': randomUUID(),
    'e': randomUUID(),
    's': randomUUID(),
    'w': randomUUID(),
  };
  const opposing = {
    'n': 's',
    'e': 'w',
    's': 'n',
    'w': 'e',
  };

  // overwrite the randomly generated UUID for the direction the player just came from
  // with the ID of the previous room.
  if (previousRoomId && previousDirection) {
    directions[opposing[previousDirection]] = previousRoomId;
  }

  // delete a number of exits randomly
  let numExitsToDelete = Object.keys(directions).length - 1 - numberOfExits;

  while (numExitsToDelete > 0) {
    const keys = Object.keys(directions);
    const index = keys[Math.floor(Math.random() * keys.length)];

    // don't delete the exit to the previous room
    if (index !== opposing[previousDirection]) {
      delete directions[index];

      numExitsToDelete--;
    }
  }

  room.exits = directions;

  // generate the room name and description via LLM
  if (!name || !description) {
    const { roomName, roomDescription } = await generateRoomDescription();

    room.name = roomName;
    room.description = roomDescription;
  }

  // add the new room to the map
  this.rooms[room.id] = room;

  // sets the initial room id such as for the very first room at the start
  if (!this.currentRoomId) {
    this.currentRoomId = room.id;
  }
};

export default addRoom;
