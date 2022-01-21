"use strict"

import { Room } from './room.js';
import { Entity } from './entity.js';
import { state } from './state.js';

export let db = {
    rooms: {
        westOfHouse: new Room(0, "West of House", "This is west of house.", {north: "northOfHouse", east: null, west: null, south: null}, false, 'west-of-house.png', ["mailbox", "mailboxBack", "mailboxDoor", "letter"]),
        northOfHouse: new Room(1, "North of House", "This is north of house.", {north: null, east: null, west: null, south: "westOfHouse"}, true, 'north-of-house.png'),
    },
    entities: {
        mailbox: new Entity({id: 0, name: "mailbox", description: "it's a mailbox", urlList: ["mailbox.png"], width: 200, height: 400, x: 630, y: 375, eventList: ["mailbox0"]}),
        mailboxBack: new Entity({id: 1, name: "mailbox back", description: "it's a mailbox", urlList: ["mailbox-back.png"], width: 76, height: 83, x: 701, y: 459, eventList: ["mailbox0"], zIndex: 4}),
        mailboxDoor: new Entity({id: 2, name: "mailbox door", description: "The mailbox is closed", urlList: ["mailbox-closed.png", "mailbox-open.png"], width: 37, height: 68, x: 679, y: 476, eventList: ["mailbox0", "mailbox0"], zIndex: 4}),
        letter: new Entity({id: 3, name: "a letter", description: "It's a letter", urlList: ["document.png"], width: 69, height: 56, x: 670, y: 498, eventList: ["letter0"], points: 10, zIndex: 3, inventoryThumbnail: "document.png", hidden: true, inventoryEvent: "letterInventory"}),
    },
}
