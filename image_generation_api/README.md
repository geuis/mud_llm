# Install
New terminal

```
vscode:
cmd-shift-p, "Terminal: Create New Terminal"
```

```
vscode:
cmd-shift-p, choose "Python: Create Environment"
Choose a python3 interpreter

cmd-shift-p, choose "Python: Select Interpreter"
Choose the .venv/bin/python3 interpreter

Activate
. ./.venv/bin/activate
```



Dependencies
```
pip3 install diffusers transformers accelerate fastapi --upgrade
```

# Subsequent use
Activate

<!-- ```
. ./.venv/bin/activate
``` -->

 <!-- │                                                     │                                                                                                                                                                       
 │  Serving at: http://127.0.0.1:8000                  │                                                                                                                                                                       
 │                                                     │                                                                                                                                                                       
 │  API docs: http://127.0.0.1:8000/docs               │                                                                                                                                                                       
 │                                                     │                                                                                                                                                                       
 │  Running in development mode, for production use:   │                                                                                                                                                                       
 │                                                     │                                                                                                                                                                       
 │  fastapi run   -->

 ./run.sh
