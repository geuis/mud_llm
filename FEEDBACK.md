<!-- - No where near as intrusive or disruptive to workflow as Copilot. Copilot reminds me a lot of Clippy. Constantly substituting random code and comments. -->
- It continuously tries to autofill code as I'm typing. Its extremely distracting and unhelpful. This is one of my main complaints about Copilot. There should be a mechanism to either turn down how often it does that or even better, a keyboard shortcut that only does it when requested.

- When using the integrated chat interface, new responses don't scroll into view automatically.
- Scrollbars in the sidebar are a little too narrow to comfortably use

- When starting with a new file and there's no existing code, it isn't able to add code to the file. Generates the following style of "error" message:

```Unfortunately, there is no previous code provided in this context. The code snippet you've given is a class definition for a `Room` object with methods to set its name, description, and exits. Without any existing code to modify, I cannot apply the suggested edit. Please provide the previous code you want to modify, and I'll be happy to apply the suggested changes.```

- Sometimes if the existing interaction (cmd-L) is too long, the LLM gets stuck in a loop and repeats itself over and over. It then generated an error like:
```
Error: HTTP 500 Internal Server Error from https://proxy-server-green-l6vsfbzhba-uw.a.run.app/stream_chat Error in Continue free trial server: 400 {"type":"error","error":{"type":"invalid_request_error","message":"messages: first message must use the \"user\" role"}}
```

- Overall the Claude 3 model is pretty capable. However after code starts getting moderately complex it starts to lose the ability to provide working or valid fixes/code even after multiple corrections.

- It would be nice to have a way to "undo" the last action.

- It would be nice to have an autosave after accepting all changes. Integrate this with something like nodemon to auto restart the server.