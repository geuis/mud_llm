import { writeFileSync } from 'fs';
import { createInterface } from 'readline';
import terminalImage from 'terminal-image';
import moveRoom from './moveRoom.mjs';
import addRoom from './addRoom.mjs';

const mapJsonPath = `${process.cwd()}/data/map.json`;

// Create the readline interface once
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

class GameMap {
  constructor() {
    this.rooms = {};
    this.currentRoomId = null;

    this.moveRoom = moveRoom;
    this.addRoom = addRoom;
  }

  validDirections = new Set(['n', 'e', 's', 'w']);
  // directionNames = {
  //   n: 'north',
  //   e: 'east',
  //   s: 'south',
  //   w: 'west'
  // };
  commands = {
    map: () => {
      console.log(this.rooms);
    },
    help: () => {
      console.log(
        ' Directions are n, e, s, w. \n',
        'Commands are map, help.'
      );
    },
    look: async () => {
      await this.displayRoom();
    }
  };

  saveMap() {
    try {
      writeFileSync(mapJsonPath, JSON.stringify(this.rooms, null, 2));
    } catch (err) {
      throw err;
    }
  }

  async promptPlayer() {
    await this.displayRoom();

    readline.question('Enter a direction or command: ', async (input) => {
      if (this.commands[input]) {
        await this.commands[input]();
      } else if (this.validDirections.has(input)) {
        await this.moveRoom(input.trim().toLowerCase());
      } else {
        console.log(`Command "${input}" not found.`);
      }

      this.promptPlayer();
    });
  }

  async displayRoom() {
    const room = this.rooms[this.currentRoomId];

    // console.log(`\n${this.currentRoomId}`);
    console.log(`${room.name}\n${room.description}`);

    console.log(await terminalImage.file(`./data/room_images/${room.id}.jpg`, { width: '50%', height: '50%' }));

    console.log('Exits:');

    for (let key in room.exits) {
      console.log(`- ${key}`);
    }
  }
}

export default GameMap;
