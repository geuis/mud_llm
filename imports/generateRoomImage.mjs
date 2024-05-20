const imageGenerationUrl = 'http://localhost:8000/api/generate';

const generateRoomImage = async (description = '', id = null) => {
  try {
    const result = await fetch(imageGenerationUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description, id })
    });

    const data = await result.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export default generateRoomImage;
