import GameMap from "./imports/gameMap.mjs";

// clear the terminal
console.clear();

const map = new GameMap();

// add initial room
map.addRoom({
  name: 'Entrance',
  description: 'You are in a dimly lit hallway.',
  numberOfExits: 4
});

// map.displayRoom();
map.promptPlayer();
