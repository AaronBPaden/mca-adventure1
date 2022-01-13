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
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("The mailbox is rusted shut.");
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                printMessage("The mailbox is stuck firmly in the ground.");
                break;
            default:
                break;
        }
    },
}
