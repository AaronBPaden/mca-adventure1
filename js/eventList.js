"use strict"

import { db } from './db.js';
import { state } from './state.js';
import { Room } from './room.js';

const printMessage = state.printMessage;

export let eventList = {
    mailbox0: (event, entity) => {
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
    letter0: (event, entity) => {
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
    letterInventory: (event, entity) => {
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("The letter is already open. Try examining it.");
                break;
            case state.actions.EXAMINE:
                let totalPoints = 0;
                printMessage("Welcome to Notzork!");
                printMessage("The Underground States of Notzork is a legally distinct entity from Zork: The Great Underground Empire.");
                printMessage("But like that game, Notzork is also a game of adventure, danger and low cunning.");
                printMessage("Try to get all 350 points in as few moves as possible!");
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
    window0: (event, entity) => {
        const updateWindow = () => {
            entity.incrementState();
            entity.description = "An old window. It is completely open now. You can see a kitchen on the other side, to the north"

            let southOfHouse = db.rooms.southOfHouse;
            southOfHouse.setRoom(Room.exits.NORTH, "kitchen");
            southOfHouse.draw();

            state.updateScore(20);

            printMessage("You open the window. You could probably crawl through and enter the kitchen to the north.");
        }
        switch(state.activeAction) {
            case state.actions.USE:
                updateWindow();
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                printMessage("You can't pick up a window. That makes no sense.");
                break;
            case state.actions.COMBINE:
                printMessage("That won't work.");
                break;
            default:
                break;
        }
    },
    window1: (event, entity) => {
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("Best leave it open for now.");
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                printMessage("You can't pick up a window. That makes no sense.");
                break;
            case state.actions.COMBINE:
                printMessage("That won't work.");
                break;
            default:
                break;
        }
    },
    key0: (event, entity) => {
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("You can't use the key.");
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
    rope0: (event, entity) => {
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("You can't use the rope.");
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
    cellar0: (event, entity) => {
        const tryOpen = () => {
            if (state.carriedItem !== db.entities.key || entity.currentIndex === 1) {
                printMessage("That won't work.");
                return;
            }
            state.removeItem(db.entities.key);
            entity.resize(418, 363);
            entity.move(450,310);
            entity.incrementState();
            state.updateScore(20);
            db.rooms.northOfHouse.setRoom(Room.exits.SOUTH, "cellar");
        };
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("You can't use the cellar door.");
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                printMessage("It's too heavy.");
                break;
            case state.actions.COMBINE:
                tryOpen();
                break;
            default:
                break;
        }
    },
    lantern0: (event, entity) => {
        const pickupLantern = () => {
            printMessage("You suspected the key would lead you to great treasure and you were right! The ancient brass lantern pulses with magic and the entire room is illuminated.");
            db.rooms.cellar.background = 'cellar1.png';
            state.hasLantern = true;
            entity.pickup();
        };
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("The lantern pulses with magic. You can't use it from here.");
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                pickupLantern();
                break;
            case state.actions.COMBINE:
                printMessage("That won't work.");
                break;
            default:
                break;
        }
    },
    well0: (event, entity) => {
        const combineWell = () => {
            if (state.carriedItem !== db.entities.rope) {
                printMessage("That won't work.");
                return;
            }
            entity.incrementState();
            state.removeItem(db.entities.key)
            db.rooms.well.setRoom(Room.exits.WEST, "bottomOfWell");
            db.rooms.well.draw();
        };
        switch(state.activeAction) {
            case state.actions.USE:
                printMessage("You can't use the well.");
                break;
            case state.actions.EXAMINE:
                entity.printDescription();
                break;
            case state.actions.PICKUP:
                printMessage("That won't work");
                break;
            case state.actions.COMBINE:
                combineWell();
                break;
            default:
                break;
        }
    },
}
