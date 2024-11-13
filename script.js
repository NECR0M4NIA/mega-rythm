document.addEventListener("DOMContentLoaded", () => {
    const lanes = {
        'a': document.getElementById("lane-a"),
        's': document.getElementById("lane-s"),
        'd': document.getElementById("lane-d"),
    };

    const scoreDisplay = document.getElementById("score");
    const startButton = document.getElementById("start-btn");
    let score = 0;
    let speed = 3000;
    let interval = 2000;
    let gameStarted = false;

    function createNote(letter) {
        const note = document.createElement("div");
        note.classList.add("note");
        note.style.animationDuration = `${speed}ms`;
        lanes[letter].appendChild(note);

        note.addEventListener("animationend", () => {
            note.remove();
            endGame();
        });
    }
    
    function checkKey(e) {
        if (!gameStarted) return;

        const letter = e.key.toLowerCase();
        if (lanes[letter]) {
            const lane = lanes[letter];
            const notes = lane.getElementsByClassName("note");

            if (notes.length > 0) {
                const note = notes[0];
                const notePos = note.getBoundingClientRect().top + note.offsetHeight;
                const lanePos = lane.getBoundingClientRect().bottom;

                if (notePos > lanePos - 40 && notePos < lanePos + 40) {
                    note.classList.add("hit");
                    setTimeout(() => note.remove(), 100);
                    score += 10;
                    scoreDisplay.textContent = score;
                }
            }
        }
    }

    function increaseDifficulty() {
        if (speed > 1000) speed -= 200;
        if (interval > 500) interval -= 100;
    }

    function endGame() {
        alert("Jeu terminé ! Score final : " + score);
        document.location.reload();
    }

    function generateNotes() {
        if (!gameStarted) return;
        const letters = ['a', 's', 'd'];
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];
        createNote(randomLetter);
        increaseDifficulty();
        setTimeout(generateNotes, interval);
    }

    function startGame() {
        gameStarted = true;
        startButton.style.display = "none";
        generateNotes();
    }

    startButton.addEventListener("click", startGame);
    document.addEventListener("keydown", checkKey);
});
