"use strict";

import { Entity } from './entity.js';
import { state } from './state.js';
import { db } from './db.js';

export class Room {
    constructor(id, name, description, exits, isDark = false, background = null, objectList = null) {
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
        this.printDescription();
        state.viewport.style.background = '';

        /* If the room is dark and the player doesn't have a lantern, we set the background to black and don't add items. */
        if (!this.#canSee()) {
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

    #canSee() {
        return (!this.isDark || (state.hasLantern && state.lanternMoves > 0));
    }

    /* print description in the message area */
    printDescription() {
        if (this.#canSee()) {
            state.messageArea.innerHTML = `<p class="message-text">${this.description}</p>`;
            state.messageArea.scrollBy(0, parseInt(state.messageArea.clientHeight)-20);
        } else {
            state.messageArea.innerHTML = '<p class="message-text">It is pitch black. You are likely to be eaten by a grue.</p>';
        }
    }

    /* Remove an item from objectList */
    removeItem(item) {
        this.objectList = this.objectList.filter(el => el.id != item.id);
    }
}
