##Introduction
This project includes two Java (1.6) programs that demonstrate client and server communication through a simple application level protocol. The server program runs first and listens on a port selected by the user. Then the client program is executed and the client creates a socket connection to the server on the same port.
The protocol used here is a simple one. Once the connection is established and the client receives the “ready” message from the server the client can begin by first sending one of the following commands:
1. Uppercase 2. Lowercase 3. Reverse 4. Exit

If the command entered by the client is valid the server will respond with a “200 OK” message. Now the client can begin sending the message. When the server encounters a “.” it knows that this is the end of the message and begins to manipulate the message and converts it all to uppercase, lowercase, or reverse depending on the command issued by the client.
The server responds with the formatted message and gets ready for the next command. On the “Exit” command the client and server will close the connection.

##Execution Instructions
Execute ServerSocket first and input a port number. If you are not running the program as root you will need to use a port number greater than 1024.
Finally, run ClientSocket and input the same port number that the ServerSocket is listening on.
You can now send one of the four commands listed above.