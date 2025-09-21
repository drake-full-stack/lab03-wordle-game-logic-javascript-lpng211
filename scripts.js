// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
document.addEventListener("keydown", (event) => {
    if (gameOver) {
        logDebug("Game over, input ignored", "warning");
        return;
    }
    const key = event.key.toUpperCase();
    logDebug(`Key pressed: ${key}`, "info");

    if (key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        submitGuess();
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    } else {
        logDebug(`Ignored key: ${event.key}`, "warning");
    }
});

// TODO: Implement addLetter function
function addLetter(letter) {
    logDebug(`addLetter("${letter}") called`, 'info');

    if (currentTile >= 5) {
        logDebug("Row is full, can't add more letters", 'warning');
        return;
    }
    const rowElement = rows[currentRow];
    const tiles = rowElement.querySelectorAll('.tile');
    const tile = tiles[currentTile];
    
    tile.textContent = letter;
    tile.classList.add('filled');
    
    currentTile++;
    
    logDebug(`Added "${letter}" to row ${currentRow}, position ${currentTile - 1}`, 'success');
    logDebug(`Current word: ${getCurrentWord()}`, 'info');
}

// TODO: Implement deleteLetter function  
function deleteLetter() {
    logDebug(`deleteLetter() called`, 'info');
    
    if (currentTile <= 0) {
        logDebug("No letters to delete", "error");
        return;
    }
        
    currentTile--;
    const rowElement = rows[currentRow];
    const tiles = rowElement.querySelectorAll('.tile');
    const tile = tiles[currentTile];
    const deletedLetter = tile.textContent;
    
    tile.textContent = '';
    tile.classList.remove('filled');
    
    logDebug(`Deleted "${deletedLetter}" from row ${currentRow}, tile ${currentTile}`, "success");
    logDebug(`Current word: ${getCurrentWord()}`);
}


// TODO: Implement submitGuess function
function submitGuess() {
    logDebug("submitGuess() called", 'info');

    if (currentTile !== 5) {
        alert("Enter 5 letters");
        return;
    }

    const rowElement = rows[currentRow];
    const tiles = rowElement.querySelectorAll('.tile');
    let guess = '';
    tiles.forEach(tile => guess += tile.textContent);

    logDebug(`Guess submitted: ${guess}`, 'info');

    checkGuess(guess, tiles);

    if (guess === TARGET_WORD) {
        gameOver = true;
        setTimeout(() => alert("You Win!"), 500);
        return;
    }

    currentRow++;
    currentTile = 0;

    if (currentRow >= 6) {
        gameOver = true;
        setTimeout(() => alert(`Game Over, the word was ${TARGET_WORD}`), 500);
    }
}

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }