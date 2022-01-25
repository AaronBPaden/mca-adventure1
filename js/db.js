"use strict"

import { Room } from './room.js';
import { Entity } from './entity.js';
import { state } from './state.js';

export let db = {
    rooms: {
        westOfHouse: new Room({id: 0, name: "West of House", description: 'You are standing in an open field west of a white house, with a boarded front door. There is a small mailbox here. Behind you to the west, you notice a well.', exits: {north: "northOfHouse", west: 'well', south: 'southOfHouse'}, background: 'west-of-house.png', objectList: ["mailbox", "mailboxBack", "mailboxDoor", "letter"]}),
        northOfHouse: new Room({id: 1, name: "North of House", description: 'This is the north side of the house, where you notice a cellar door.', exits: {south: "westOfHouse"}, background: 'north-of-house.png'}),
        southOfHouse: new Room({id: 2, name: 'South of House', description: 'As you approach the south side of the house, you notice a window that is slightly adjar. To the west, you can return back the way you came.', exits: {west: 'westOfHouse'}, background: 'south-of-house.png'}),
        well: new Room({id: 3, name: 'The Well', description: 'In front of you is a well. Behind you is a white house. To the west there is a massive cliff that is too difficult to climb.', exits: {east: 'westOfHouse'}, background: 'the-well.png'}),
        kitchen: new Room({id: 4, name: 'The Kitchen', description: 'An old kitchen lies before you with a large table in the center. The only light is from open the window back outside. The doorway out of the kitchen is boarded up.', exits: {south: 'southOfHouse'}, background: 'kitchen.png'}),
    },
    entities: {
        mailbox: new Entity({id: 0, name: "mailbox", description: "it's a mailbox", urlList: ["mailbox.png"], width: 200, height: 400, x: 630, y: 375, eventList: ["mailbox0"]}),
        mailboxBack: new Entity({id: 1, name: "mailbox back", description: "it's a mailbox", urlList: ["mailbox-back.png"], width: 76, height: 83, x: 701, y: 459, eventList: ["mailbox0"], zIndex: 4}),
        mailboxDoor: new Entity({id: 2, name: "mailbox door", description: "The mailbox is closed", urlList: ["mailbox-closed.png", "mailbox-open.png"], width: 37, height: 68, x: 679, y: 476, eventList: ["mailbox0", "mailbox0"], zIndex: 4}),
        letter: new Entity({id: 3, name: "a letter", description: "It's a letter", urlList: ["document.png"], width: 69, height: 56, x: 670, y: 498, eventList: ["letter0"], points: 10, zIndex: 3, inventoryThumbnail: "document.png", hidden: true, inventoryEvent: "letterInventory"}),
        eastWindow: new Entity({id: 4, name: 'A window', description: 'An old window. It is slightly adjar.', urlList: ['east-window0.png', 'east-window1.png'], width: 335, height: 206, x: 100, y: 100}),
    },
}
