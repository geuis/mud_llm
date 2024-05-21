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

    if (result.status === 200) {
      const data = await result.json();
  
      return {
        success: true,
        data
      };
    } else {
      return {
        success: false
      }
    }
  } catch (err) {
    console.error('generateRoomImage error:', err);
    console.error(err.message);

    throw err;
  }
};

export default generateRoomImage;
