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
            state.updateDebug();
            drawRoom();
        } else {
            state.messageArea.innerHTML += "<p>Something halts your progress in this direction. Try a different one.</p>";
            state.messageArea.scrollBy(0, 40);
        }
    }));
    /* Toggle the height of the debugForm and and change the arrow direction. */
    state.debugHeader.addEventListener('click', (ev) => {
        state.debugCollapsible.innerText = state.debugCollapsible.innerText === "▸" ? "▾" : "▸";
        let height = state.debugForm.style.height;
        if (height === "") height = "0px";
        height = height === "0px" ? state.debugForm.scrollHeight + "px" : "0px";
        state.debugForm.style.height = height;
    });
    /* Update state from values in debug elements. */
    state.debugForm.addEventListener('submit', (ev) => {
        ev.preventDefault();

        state.hasLantern = state.debugLantern.checked;
        state.lanternMoves = parseInt(state.debugLanternMoves.value);

        let addItem = state.debugAddItemId.value;
        if (addItem != "") {
            state.inventory.push(db.entities[parseInt(addItem)]);
        }

        let room = parseInt(debugRoom.value);
        if (room != state.currentRoom) {
            state.currentRoom = room;
            drawRoom();
        }
    });
    drawRoom();
})();
