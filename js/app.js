"use strict"

import { db } from './db.js';
import { state } from './state.js';

(function() {
    const drawRoom = () => {
        db.rooms[state.currentRoom].draw();
    }
    let directionalButtons = document.querySelectorAll('.directional-button');
    directionalButtons.forEach((e) => e.addEventListener('click', (ev) => {
        let roomExit = db.rooms[state.currentRoom].exits[ev.target.id];
        if (roomExit != null) {
            state.currentRoom = roomExit;
            state.incrementMoves();
            drawRoom();
        } else {
            state.messageArea.innerHTML += "<p>Something halts your progress in this direction. Try a different one.</p>";
            state.messageArea.scrollBy(0, 40);
        }
    }));
    drawRoom();
})();
