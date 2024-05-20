import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompt = `
Your purpose is to generate creative descriptions of rooms that a player exploring a MUD-style game will encounter. The descriptions should range from brief to a few hundred words at most. You will be provided with the description of the neighboring room the player entered from. You should base the new room description off of the neighboring room so that it appears the player is traversing an area and that the new room is near the old room.

Do not include descriptions of neighboring rooms and exits. 
Do not indicate any specific object or door as a point of interest.
Do not add any non-visual descriptions such as describing sounds or indicating how the player feels about the location.

Only describe the current room. 

Generate a short name for the room.

Respond with a JSON object that includes the room name and description using the keys "name" and "description".

Think about these instructions carefully and step by step.
`;

function promptGenerator(previousRoomDescription, previousDirection) {
  const directionNames = {
    n: 'north',
    e: 'east',
    s: 'south',
    w: 'west'
  };

  return `Previous room description: ${previousRoomDescription}` +
    `\nThe player entered from the ${directionNames[previousDirection]}.`;
};

async function generateRoomDescription(previousRoomDescription, previousDirection) {
  let usage = null;
  let room = {
    roomName: null,
    roomDescription: null
  };

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: promptGenerator(previousRoomDescription, previousDirection) }
      ],
      model: 'Llama3-70b-8192',
    });

    usage = chatCompletion.usage;
    const message = JSON.parse(chatCompletion.choices[0].message.content);

    room.roomName = message.name;
    room.roomDescription = message.description;
  } catch (err) {
    console.error(err);
    console.log('Usage:', usage);
  }

  return room;
}

export default generateRoomDescription;
