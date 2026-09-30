# 🎮 Wooden Tic-Tac-Toe

A classic **Tic-Tac-Toe game with a realistic wooden board theme**, built using only **HTML, CSS, and JavaScript**.

The project supports **Two Player mode** and **Computer mode** with three AI difficulty levels, along with score tracking, timer, sound effects, player names, and responsive design.

---

## ✨ Features

* 🪵 Traditional wooden board design
* 👥 Two Player mode
* 🤖 Player vs Computer mode
* 🎯 Three AI difficulty levels:

  * Easy
  * Medium
  * Impossible
* 🧠 Minimax algorithm for Impossible mode
* 🏆 Automatic winner detection
* 🤝 Automatic draw detection
* ✨ Winning line animation
* ⏱️ 10-second move timer
* 🔢 Move counter
* 👤 Custom player names
* 🔊 Sound effects
* 🔇 Sound on/off option
* 📊 Scoreboard
* 💾 Score saved using Local Storage
* 🎉 Winner and draw result popup
* 🔄 New Round option
* ♻️ Reset Score option
* 📱 Responsive design for mobile and desktop
* 🌳 Wooden texture, shadows and 3D-style board effects

---

## 📁 Project Structure

```text
Wooden-Tic-Tac-Toe/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the structure of the game:

* Game title
* Player names
* Scoreboard
* Game mode buttons
* Difficulty selection
* Timer
* 3 × 3 game board
* Game controls
* Result popup

### `style.css`

Contains the complete visual design:

* Wooden background
* Wooden game board
* Cell styling
* X and O appearance
* Buttons
* Scoreboard
* Winning animation
* Result popup
* Responsive layout

### `script.js`

Contains the complete game logic:

* Player moves
* Computer moves
* Win detection
* Draw detection
* Timer
* Score system
* AI difficulty
* Minimax algorithm
* Sound effects
* Local Storage
* Winning-line calculation

---

## 🛠️ Technologies Used

* **HTML5** – Structure
* **CSS3** – Styling and responsive design
* **JavaScript** – Game logic and AI
* **Local Storage** – Saving scores
* **Web Audio API** – Sound effects

No external frameworks or libraries are required.

---

## 🎮 Game Modes

### 👥 Two Players

Two people can play on the same device.

* Player X starts.
* Players take turns.
* The first player to complete a row, column or diagonal wins.

### 🤖 Computer

Play against the computer.

The computer plays as **O**.

The computer automatically makes its move after the player.

---

## 🧠 AI Difficulty

### 🟢 Easy

The computer selects an available cell randomly.

This makes the game suitable for beginners.

### 🟡 Medium

The computer:

1. Checks whether it can win.
2. Blocks the player's winning move.
3. Tries to take the center.
4. Tries to take a corner.
5. Selects another available cell.

### 🔴 Impossible

The computer uses the **Minimax algorithm**.

Minimax evaluates possible future moves and selects the move with the best game outcome.

This provides optimal play for the 3 × 3 Tic-Tac-Toe game.

---

## 🏆 Winning Conditions

A player wins when they get three identical symbols in:

### Horizontal

```text
X | X | X
---------
O | O | 
---------
  |   |
```

### Vertical

```text
X | O |
---------
X | O |
---------
X |   |
```

### Diagonal

```text
X | O |
---------
O | X |
---------
  |   | X
```

There are **8 possible winning combinations**.

---

## 🤝 Draw Detection

If all **9 boxes are filled** and neither player has completed a winning combination, the game ends in a draw.

The game checks for a draw **after every valid move**, including the 9th move.

---

## ⏱️ Timer

Each player has **10 seconds** to make a move.

If the timer reaches zero, an available cell is automatically selected.

The timer stops when:

* A player wins
* The game ends in a draw
* The computer is making its move

---

## 🔢 Move Counter

The game displays the current number of moves.

Example:

```text
Move 5 / 9
```

The counter reaches:

```text
Move 9 / 9
```

when the board is completely filled.

---

## 👤 Player Names

Players can enter their own names.

For example:

```text
Player X: Anwitha
Player O: Priya
```

The game then displays whose turn it is using the entered names.

---

## 🔊 Sound Effects

The game includes simple sound effects created using JavaScript.

Sounds are played for:

* Making a move
* Winning
* Draw

The sound can be turned on or off using the **Sound** button.

---

## 📊 Scoreboard

The scoreboard keeps track of:

* Player X wins
* Player O wins

Scores are saved using **Local Storage**, so they remain available even after refreshing the browser.

The **Reset Score** button clears the saved scores.

---

## 💾 Local Storage

The project uses browser Local Storage to save the scoreboard.

This means the scores can remain after:

* Refreshing the page
* Closing and reopening the browser

No database is required.

---

## 🪵 Design

The project uses a traditional wooden-board style.

### Design elements

* Warm brown wooden background
* Wood grain effect
* Dark wooden frame
* Golden-brown cells
* Carved-style X and O
* Wooden buttons
* Natural shadows
* Golden winning line
* Wooden result popup

The design is inspired by a **traditional tabletop Tic-Tac-Toe board**.

---

## 📱 Responsive Design

The game works on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The layout automatically adjusts to smaller screen sizes.

---

## ▶️ How to Run

### Step 1

Download or copy the project folder.

### Step 2

Make sure these four files are in the same folder:

```text
index.html
style.css
script.js
README.md
```

### Step 3

Open:

```text
index.html
```

in a web browser.

### Step 4

Start playing 🎮

No installation or server is required.

---

## 🌐 Browser Support

The game can be opened in modern browsers such as:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

## 🚀 Future Improvements

Possible future enhancements include:

* 🌐 Online multiplayer
* 🏅 Leaderboard
* 👥 Player profiles
* 🏆 Achievement system
* 📈 Game statistics
* 🎨 Multiple board themes
* 🎵 Background music
* 🔊 More advanced sound effects
* ↩️ Undo move
* 🔄 Replay previous games
* 📜 Match history
* 🌙 Dark wooden theme
* 🏆 Tournament mode
* 🤖 More advanced AI strategies
* 📲 Progressive Web App support

---

## 🎯 Project Objective

The objective of this project is to create a simple but visually attractive Tic-Tac-Toe game while demonstrating practical use of:

* HTML
* CSS
* JavaScript
* DOM manipulation
* Event handling
* Arrays
* Conditional statements
* Functions
* Game-state management
* Local Storage
* Artificial Intelligence
* Minimax algorithm
* Responsive web design

---

## 📌 Key Learning Outcomes

Through this project, the following concepts are demonstrated:

### HTML

* Page structure
* Buttons
* Input fields
* Select elements
* Semantic layout

### CSS

* Flexbox
* CSS Grid
* Gradients
* Shadows
* Animations
* Responsive design
* Hover effects

### JavaScript

* DOM manipulation
* Event listeners
* Arrays
* Functions
* Conditions
* Loops
* Local Storage
* Game logic
* AI implementation

---