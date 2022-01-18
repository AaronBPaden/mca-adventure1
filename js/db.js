"use strict"

import { Room } from './room.js';
import { Entity } from './entity.js';
import { state } from './state.js';

export let db = {
    rooms: {
        westOfHouse: new Room(0, "West of House", "This is west of house.", {north: "northOfHouse", east: null, west: null, south: null}, false, '../media/backgrounds/west-of-house.png', ["mailbox", "mailboxBack", "mailboxDoor", "letter"]),
        northOfHouse: new Room(1, "North of House", "This is north of house.", {north: null, east: null, west: null, south: "westOfHouse"}, true, '../media/backgrounds/north-of-house.webp'),
    },
    entities: {
        mailbox: new Entity(0, "mailbox", "it's a mailbox", ["mailbox.png"], 200, 400, 630, 375, ["mailbox0"]),
        mailboxBack: new Entity(0, "mailbox back", "it's a mailbox", ["mailbox-back.png"], 76, 83, 701, 459, ["mailbox0"], 0, 4),
        mailboxDoor: new Entity(0, "mailbox door", "The mailbox is closed", ["mailbox-closed.png", "mailbox-open.png"], 37, 68, 679, 476, ["mailbox0", "mailbox0"], 0, 4),
        letter: new Entity(0, "a letter", "It's a letter", ["document.png"], 69, 56, 683, 486, ["letter0"], 10, 3, "document.png"),
    },
}
