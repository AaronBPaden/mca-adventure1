"use strict";

import { Entity } from './entity.js';
import { state } from './state.js';
import { db } from './db.js';

export class Room {
    constructor(id, name, description, exits, background = null, objectList = null) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.id = id;
        this.objectList = objectList;
        this.background = background;
    }

    draw() {
        state.locationLabel.innerText = this.name;
        this.printDescription();
        state.viewport.style.background = '';
        if (this.background) state.viewport.style.background = `center / cover url(${this.background})`;
        if (this.objectList === null) return;
        this.objectList.forEach((el) => {
            let entity = db.entities[el];
            state.viewport.append(entity.getImageElement());
            entity.resetStyle();
        });
    }

    /* print description in the message area */
    printDescription() {
        state.messageArea.innerHTML = `<p class="message-text">${this.description}</p>`;
    }
}
