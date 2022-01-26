"use strict";

import { Entity } from './entity.js';
import { state } from './state.js';
import { db } from './db.js';

export class Room {
    static exits = Object.freeze({
        NORTH: Symbol("NORTH"),
        WEST: Symbol("WEST"),
        EAST: Symbol("EAST"),
        SOUTH: Symbol("SOUTH"),
    });
    constructor({id, name, description, exits = {north: null, west: null, east: null, south: null}, isDark = false, background = null, objectList = null}) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.isDark = isDark;
        this.id = id;
        this.objectList = objectList;
        this.background = background;
    }

    draw() {
        state.viewport.innerHTML = '';
        state.locationLabel.innerText = this.name;
        state.viewport.style.background = '';

        /* If the room is dark and the player doesn't have a lantern, we set the background to black and don't add items. */
        if (!this.canSee()) {
            state.viewport.style.background = "black";
            return;
        }

        if (this.background) state.viewport.style.background = `center / cover url(media/backgrounds/${this.background})`;
        if (this.objectList === null) return;

        this.objectList.forEach((el) => {
            let entity = db.entities[el];
            state.viewport.append(entity.getImageElement());
            entity.resetStyle();
        });
    }

    canSee() {
        return (!this.isDark || (state.hasLantern && state.lanternMoves > 0));
    }

    /* Change exit connections */
    setRoom(exit, roomIdentifier) {
        if (!'roomIdentifier' in db.rooms) {
            console.log(`Room ${roomIdentifier} does not exist.`);
            return;
        }
        switch(exit) {
            case Room.exits.NORTH:
                this.exits.north = roomIdentifier;
                break;
            case Room.exits.WEST:
                this.exits.west = roomIdentifier;
                break;
            case Room.exits.EAST:
                this.exits.east = roomIdentifier;
                break;
            case Room.exits.SOUTH:
                this.exits.south = roomIdentifier;
                break;
            default:
                console.log("invalid exit in setRoom");
        }
    }

    /* print description in the message area */
    printDescription() {
        if (this.canSee()) {
            state.messageArea.innerHTML += `<p class="message-text">${this.description}</p>`;
            state.messageArea.scrollBy(0, parseInt(state.messageArea.clientHeight)-20);
        } else {
            state.messageArea.innerHTML += '<p class="message-text">It is pitch black. You are likely to be eaten by a grue.</p>';
        }
    }

    /* Remove an item from objectList */
    removeItem(item) {
        this.objectList = this.objectList.filter(el => db.entities[el].id !== item.id);
        this.draw();
    }
}
