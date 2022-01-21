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
            mailboxDoor.zIndex = 1;
            db.entities.letter.toggleHidden();
        }
        const closeMailbox = () => {
            mailboxDoor.move(679, 476)
            mailboxDoor.resize(37, 68);
            mailboxDoor.zIndex = 4;
            db.entities.letter.toggleHidden();
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
    "letter0": (event, entity) => {
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("The letter can't be used.");
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                entity.pickup();
                break;
            case state.actions.COMBINE:
                printMessage("That won't work.");
                break;
            default:
                break;
        }
    },
    "letterInventory": (event, entity) => {
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("The letter is already open. Try examining it.");
                break;
            case state.actions.EXAMINE:
                let totalPoints = 0;
                printMessage("Welcome to Notzork!");
                printMessage("The Underground States of Notzork is a legally distinct entity from Zork: The Great Underground Empire.");
                printMessage("But like that game, Notzork is also a game of adventure, danger and low cunning.");
                /* TODO: figure out the maximum number of points when the game is finished.
                 * It can't be calculated from db.entities, because points can also be given in events. */
                printMessage("Try to get all x points in as few moves as possible!");
                break;
            case state.actions.PICKUP:
                console.log("the PICKUP action for inventory items should be handled by entity object.");
                break;
            case state.actions.COMBINE:
                if (state.carriedItem === db.entities.letter) {
                    state.carriedItem = null;
                    state.setAction(state.actions.PICKUP);
                } else {
                    printMessage("That won't work.");
                }
                break;
            default:
                break;
        }
    },
}
