# TodolistappClient

This project uses Angular version 17.3.6, NodeJS 20.12.2 and .NET 8.0  

This project solution file is created using Visual Studio 2022 and can be used to start both the server and the client.  

Alternatively, run Release/TodoListApp.Server.exe and visit `http://localhost:5000/`  

## Further Improvements

This project is only meant to be a demo. If we were to make it a fully fledged product, it could use some improvements:  

- Implement a user login system to protect the page and support multiple users. This includes additional angular components, generation of tokens (JWT for example) and additional checks at route controllers.
- Track API usage to limit throughput and potentially block malicious access
- Switch to a better CSS. I chose not to use Angular Material for minimum dependency.
