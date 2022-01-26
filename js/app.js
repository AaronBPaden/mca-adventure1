"use strict"

import { db } from './db.js';
import { state } from './state.js';

(function() {
    const drawRoom = () => {
        let room = db.rooms[state.currentRoom];
        room.draw();
        state.messageArea.innerHTML = "";
        room.printDescription();
    }
    const updateFoundTreasure = () => {
        if (state.foundTreasure) return;
        if (!db.rooms.canSee()) return;
        state.foundTreasure = true;
        state.updateScore(200);
    }
    const grueAttack = () => {
        state.printMessage("You have been eaten by a grue. Refresh to restart.");
    }
    let directionalButtons = document.querySelectorAll('.directional-button');
    state.activeAction = state.actions.USE;
    directionalButtons.forEach((e) => e.addEventListener('click', (ev) => {
        if (!db.rooms[state.currentRoom].canSee()) {
            grueAttack();
            return;
        }
        let roomExit = db.rooms[state.currentRoom].exits[ev.target.id];
        if (roomExit != null) {
            state.currentRoom = roomExit;
            state.incrementMoves(db.rooms[state.currentRoom].isDark);
            state.updateDebug();
            drawRoom();
            if (db.rooms[state.currentRoom] === db.rooms.bottomOfWell) updateFoundTreasure();
        } else {
            state.printMessage("Something halts your progress in this direction. Try a different one.");
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

        let item = state.debugAddItemId.value;
        if (item in db.entities) {
            db.entities[item].pickup();
        }

        let room = debugRoom.value;
        if (room != state.currentRoom) {
            state.currentRoom = room;
            drawRoom();
        }
    });
    document.querySelectorAll('.action-button').forEach((el) => el.addEventListener('click', (ev) => {
        state.setAction(state.actions[ev.target.id.toUpperCase()]);
    }));
    drawRoom();
})();
