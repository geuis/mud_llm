# mud-llm

Its probably a temporary name. 

This is a terminal app based on node.js and python3 that uses an LLM to generate room descriptions in the style of old-school MUDs.

It also uses a locally hosted version of Stable Diffusions Turbo model to generate images based on the descriptions.

As the user, you navigate through the map using north, east, south, and west. The map is randomly generated as you navigate through it.

Be aware, the LLM prompts are still fairly unsophisticated (it really, really seems to prefer taverns and chandelliers for example), and the progression from location to location isn't always as smooth or fleshed out as it eventually might be.

Still, its fun to wander around a bit.

## Installation

The only external dependency right now is that you will need an API key from https://groq.com. Eventually I'll move the text generation into a locally run light-weight model, but for now it depends on the Groq api.

Once you get the api key, create a `.env` file in the root directory and add the following to it:

```
NODE_NO_WARNINGS=1
GROQ_API_KEY=<your api key>
```

After this, installation *should* be as simple as running `./run.sh`.
The bash script should handle installing the Python dependencies for the image generator and setting up the node.js app.

Be aware that during setup the first time, the Stable Diffusion Turbo model will be downloaded. It's about 10gb or so and may take a while depending on your connection speed.

If you run into issues, file an issue on the Github repo.
