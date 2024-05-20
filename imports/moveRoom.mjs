import { existsSync } from 'fs';
import generateRoomImage from './generateRoomImage.mjs';

const checkRoomImage = async (description, roomId) => {
  // check if room has image
  if (!existsSync(`${process.cwd()}/data/room_images/${roomId}.jpg`)) {
    try {
      const imageId = await generateRoomImage(description, roomId);
    } catch (err) {
      console.error('Error generating image for room:', roomId);
      console.error(err);
    }
  }
};

async function moveRoom(direction) {
  const availableExits = this.rooms[this.currentRoomId].exits;

  if (!(direction in availableExits)) {
    console.log(`Can't go that way.`);
    return;
  }

  // get the id for the room in the direction indicated
  const roomId = this.rooms[this.currentRoomId].exits[direction];

  // if it exits, set it as the current room and return
  if (this.rooms[roomId]) {
    this.currentRoomId = roomId;

    await checkRoomImage(this.rooms[roomId].description, roomId);

    return;
  }

  // room doesn't exist so add it
  await this.addRoom({
    id: roomId,
    previousRoomId: this.currentRoomId,
    previousDirection: direction,
    numberOfExits: Math.floor(Math.random() * 3)
  });

  this.currentRoomId = roomId;

  await checkRoomImage(this.rooms[roomId].description, roomId);
}

export default moveRoom;
