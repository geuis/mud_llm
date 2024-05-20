import { createInterface } from 'readline';
import moveRoom from './moveRoom.mjs';
import addRoom from './addRoom.mjs';

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
    look: () => {
      this.displayRoom();
    }
  };

  promptPlayer() {
    this.displayRoom();

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

  displayRoom() {
    console.log(this.rooms);

    const room = this.rooms[this.currentRoomId];

    console.log(`\n${this.currentRoomId}`);
    console.log(`${room.name}\n${room.description}`);
    console.log('Exits:');

    for (let key in room.exits) {
      console.log(`- ${key} - ${room.exits[key]}`);
    }
  }
}

export default GameMap;
