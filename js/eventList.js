"use strict"

import { db } from './db.js';
import { state } from './state.js';

const printMessage = (msg) => {
    state.messageArea.innerHTML += `<p class="message-text">${msg}</p>`;
    /* TODO: find a good sweet spot for messages whose length
     * is greater than the message area height. */
    state.messageArea.scrollBy(0, parseInt(state.messageArea.clientHeight)-20);
};

export let eventList = {
    "mailbox0": (event, entity) => {
        let mailboxDoor = db.entities.mailboxDoor;
        const openMailbox = () => {
            mailboxDoor.move(663, 473);
            mailboxDoor.resize(55, 114);
        }
        const closeMailbox = () => {
            mailboxDoor.move(679, 476)
            mailboxDoor.resize(37, 68);
        }
        switch(state.activeAction) {
            case state.actions.USE:
                /* NOTE for presentation: using a conditional operator here to avoid readability issues with over-nesting */
                mailboxDoor.currentIndex === 0 ? openMailbox() : closeMailbox();
                mailboxDoor.incrementState();
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                printMessage("The mailbox is stuck firmly in the ground.");
                break;
            case state.actions.COMBINE:
                printMessage("That won't work.");
                break;
            default:
                break;
        }
    },
}
