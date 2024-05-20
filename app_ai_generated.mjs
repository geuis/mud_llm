import { createInterface } from 'readline';
import { faker } from '@faker-js/faker';

// Create the readline interface once
const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

class Room {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.visitedRooms = {}; // Add visitedRooms property to keep track of visited rooms
  }

  addExit(direction, room) {
    this.exits[direction] = room;
  }

  generateExits() {
    const numExits = Math.floor(Math.random() * 4) + 1; // Generate 1-4 exits
    const directions = ['north', 'east', 'south', 'west'];
    const shuffledDirections = directions.sort(() => 0.5 - Math.random());

    for (let i = 0; i < numExits; i++) {
      const direction = shuffledDirections[i];
      if (!this.exits[direction]) {
        const newDescription = faker.lorem.sentences(3); // Generate a new description
        const newRoomName = `Room ${Object.keys(rooms).length + 1}`;
        let newRoom = rooms[newRoomName];
        if (!newRoom) {
          newRoom = new Room(newRoomName, newDescription);
          rooms[newRoomName] = newRoom;
        }
        this.addExit(direction, newRoom);
      }
    }
  }
}

const rooms = {};

// Create the initial room
const entrance = new Room('Entrance', 'You find yourself in a dimly lit entrance hall.');
rooms['Entrance'] = entrance;
entrance.generateExits(); // Generate exits for the initial room

let currentRoom = entrance;

const displayRoom = () => {
  console.log(`\n${currentRoom.name}\n${currentRoom.description}`);
  console.log('Exits:');
  Object.keys(currentRoom.exits).forEach(exit => {
    console.log(`- ${exit}`);
  });
};

const movePlayer = (direction) => {
  const nextRoom = currentRoom.exits[direction];
  if (nextRoom) {
    currentRoom.visitedRooms[nextRoom.name] = nextRoom; // Add the new room to visitedRooms of the previous room
    currentRoom = nextRoom;
    if (Object.keys(currentRoom.exits).length === 0) {
      currentRoom.generateExits();
    }
    displayRoom();
  } else {
    console.log('You cannot go that way.');
  }
};

const promptPlayer = () => {
  readline.question('Enter a direction: ', direction => {
    movePlayer(direction.trim().toLowerCase());
    promptPlayer();
  });
};

displayRoom();
promptPlayer();
