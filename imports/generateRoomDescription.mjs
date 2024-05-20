// import Groq from 'groq-sdk';

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// const chatCompletion = await groq.chat.completions.create({
//   messages: [{ role: 'user', content: 'Explain the importance of low latency LLMs' }],
//   model: 'mixtral-8x7b-32768',
// });

// console.log(chatCompletion.choices[0].message.content);
// const reply = await map.generateRoomDescription();
// console.log(reply);


async function generateRoomDescription() {
  const x = {
    roomName: 'name' + Math.random(),
    roomDescription: 'woo a room description' + Math.random()
  };

  return x;
}

export default generateRoomDescription;
