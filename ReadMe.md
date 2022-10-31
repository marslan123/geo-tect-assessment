# Solution

## Prerequisites

1. Node Js (Any LTE version)

## Backend Instruction

1. Open CLI Terminal.
2. Navigate to backend directory
3. Install Dependencies by running `npm install`.
4. then run `npm start` command to start the server.
5. The server will be start and running in Port 4000

## Frontend Instruction

1. Open the CLI Terminal.
2. Navigate to frontend directory client by doing `cd client`
3. Install Dependencies by running `yarn`.
4. then run `yarn start` command to start the frontend.

## Project Structure

Frontend project contain total 3 pages

1. Game Board that track the active players and their individual players movements.
2. Login page for individual players(for unique Id).
3. Player game board that contain the UI part of a game controller.

Backend project build on following steps

1. Socket connection is used for players to communicate between their game controller and game board. Socket connection are divided in two namespaces.
   i. game controller:
   This controller is used to display the player movements in the board. That who the square is moving in the board.
   ii. players controller:
   This controller is used to register players D-pad and action button and connect them to the board.
2. Game board that contain the UI part of a game controller is been created in ejs view to display the player movements.

## Project Hosting

This section will explain how to to run and connect the project with mobile and display its working.

### Game Board

Game board is created in to ways:

1. In EJS Template page is hosted in <http://localhost:4000>
2. In ReactJS View the page is hosted in <http://localhost:3000/game-board>

### Player Board

This section is divided 2 segments:

#### Player Identification Section

This section will get player mane as an identification along with the uuid to register user game controller events. After successfully registration the user will be navigated to the game controller page.

this page is hosted in <http://localhost:3000>

#### Player Game Controller Page

This section will get display user remote type game controller. In game controller their are following main function.

1. Left Panel
   This panel is a d-pad menu which contains the left, right, top and bottom button so the player can controls the square box on the game board.
2. Right Panel
   This panel is a action menu which contains the A, B button which alows to change the color of the square box back and forth.
3. A logout button which is used to log out from the game.

This page is hosted in <http://localhost:3000/player-board> is only accessible as along a valid uuid is given.

## Note

1. To run the app in the mobile device directly enter the same player identification/ home page url in the mobile browser using **Ip-Address** of your system/mac e.g:
   Replacing this
   url <http://localhost:3000>
   with <http://your-ip-address:3000>
   etc. <http://192.168.xx.xx:3000>

2. TO make the above point in working state these rules must be fulfilled:
   i. All servers (backend and frontend) must be connected to the same one network in the machine.
   ii.The frontend server connection must be made using IP address of the system not by >localhost
   (e.g mobile device not work with the localhost/127.0.0.1 ip address so we have to provide the machine IP address)
   **for this section the url must be changed in the Ip-Address in this following file of frontend `client/src/config/index.js`**

### Extra-Note

1. Ip-Address can also be found when you run the frontend server with this line **On Your Network**
2. Default Ports for ReactJS Frontend is 3000 and for backend server is 4000 access the url according to the port number you are using to run the frontend/backend server
