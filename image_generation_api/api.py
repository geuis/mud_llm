import uuid
from diffusers import AutoPipelineForText2Image
import torch
from PIL import Image
from fastapi import FastAPI, Response, HTTPException
from pydantic import BaseModel
from io import BytesIO
import re
from pathlib import Path

# device = torch.device("mps")
# https://www.mindfiretechnology.com/blog/archive/an-introduction-to-hugging-face-and-their-pipelines/
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("# Loading sdxl-turbo")
pipe = AutoPipelineForText2Image.from_pretrained(
    "stabilityai/sdxl-turbo", torch_dtype=torch.float16
)

pipe.to("mps")


app = FastAPI(debug=True)


class Prompt(BaseModel):
    id: str
    description: str


# prompt = "A knight wearing golden armor, in the style of a Magic the Gathering card."
# curl -X POST -H "Content-Type: application/json" -d '{"description": "Your prompt description here"}' http://localhost:8000/api/generate


@app.post("/api/generate")
async def generate_image(prompt: Prompt):
    roomId = prompt.id
    promptDescription = prompt.description
    # Generate a short name based on the description
    short_name = generate_short_name(promptDescription)
    # Create a filename with the short name and .jpg extension
    #filename = f"{short_name}.jpg"

    try:
        image = pipe(
            prompt=promptDescription, num_inference_steps=1, guidance_scale=0.0
        ).images[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating image: {str(e)}")

    img_bytes = BytesIO()
    try:
        image.save(img_bytes, format="JPEG")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving image: {str(e)}")

    img_bytes = img_bytes.getvalue()

    # save the image to disk
    current_file_directory = Path(__file__).resolve().parent
    data_imgs_dir = current_file_directory.parent / 'data' / 'room_images'
    print(data_imgs_dir)
    
    print(f"Saving image to {data_imgs_dir}/{roomId}.jpg")
    
    image.save(f"{data_imgs_dir}/{roomId}.jpg")

    # Create a response object with the image data
    # response = Response(content=img_bytes, media_type="image/png")
    # response.headers["Content-Disposition"] = f"attachment; filename={filename}"

    # return response
    return {"status": "ok"}


def generate_short_name(description: str):
    # Remove any non-word characters from the description
    cleaned_description = re.sub(r"\W+", " ", description)

    # Split the description into words
    words = cleaned_description.split()

    # Take the first three words
    short_name = "_".join(words[:4])

    # Limit the short name to 20 characters
    short_name = short_name[:20].lower()
    id = str(uuid.uuid4())[:8]

    return f"{short_name}_{id}"
