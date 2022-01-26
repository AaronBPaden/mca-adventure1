"use strict"

import { Room } from './room.js';
import { Entity } from './entity.js';
import { state } from './state.js';

export let db = {
    rooms: {
        westOfHouse: new Room({id: 0, name: "West of House", description: 'You are standing in an open field west of a white house, with a boarded front door. There is a small mailbox here. Behind you to the west, you notice a well.', exits: {north: "northOfHouse", west: 'well', south: 'southOfHouse'}, background: 'west-of-house.png', objectList: ["mailbox", "mailboxBack", "mailboxDoor", "letter"]}),
        northOfHouse: new Room({id: 1, name: "North of House", objectList: ['cellarDoor'], description: 'This is the north side of the house, where you notice a cellar door.', exits: {south: "westOfHouse"}, background: 'north-of-house.png'}),
        southOfHouse: new Room({id: 2, name: 'South of House', description: 'As you approach the south side of the house, you notice a window that is slightly adjar. To the west, you can return back the way you came.', exits: {west: 'westOfHouse'}, background: 'south-of-house.png', objectList: ['southWindow']}),
        well: new Room({id: 3, name: 'The Well', objectList: ['well'], description: 'In front of you is a well. Behind you is a white house. To the west there is a massive cliff that is too difficult to climb.', exits: {east: 'westOfHouse'}, background: 'the-well.png'}),
        kitchen: new Room({id: 4, name: 'The Kitchen', objectList: ['key', 'rope'], description: 'An old kitchen lies before you with a large table in the center. The only light is from open the window back outside. The doorway out of the kitchen is boarded up.', exits: {south: 'southOfHouse'}, background: 'kitchen.png'}),
        cellar: new Room({id: 5, name: 'The cellar', objectList: ['lantern'], description: 'As you take the steps down into the cellar, darkness seems to creep in all around you. Your only protection is an old brass lantern.', exits: {north: 'northOfHouse'}, background: "cellar0.png"}),
    },
    entities: {
        mailbox: new Entity({id: 0, name: "mailbox", description: "it's a mailbox", urlList: ["mailbox.png"], width: 200, height: 400, x: 630, y: 375, eventList: ["mailbox0"]}),
        mailboxBack: new Entity({id: 1, name: "mailbox back", description: "it's a mailbox", urlList: ["mailbox-back.png"], width: 76, height: 83, x: 701, y: 459, eventList: ["mailbox0"], zIndex: 4}),
        mailboxDoor: new Entity({id: 2, name: "mailbox door", description: "The mailbox is closed", urlList: ["mailbox-closed.png", "mailbox-open.png"], width: 37, height: 68, x: 679, y: 476, eventList: ["mailbox0", "mailbox0"], zIndex: 4}),
        letter: new Entity({id: 3, name: "a letter", description: "It's a letter", urlList: ["document.png"], width: 69, height: 56, x: 670, y: 498, eventList: ["letter0"], points: 10, zIndex: 3, inventoryThumbnail: "document.png", hidden: true, inventoryEvent: "letterInventory"}),
        southWindow: new Entity({id: 4, name: 'A window', description: 'The window is sligthly adjar. The other side looks like a kitchen. You could probably open the window further.', urlList: ['south-window0.png', 'south-window1.png'], width: 335, height: 206, x: 500, y: 100, eventList: ['window0', 'window1']}),
        key: new Entity({id: 5, name: 'a golden key', description: "It's a golden key. You're sure the door it unlocks must lead to a great treasure.", urlList: ['key.png'], inventoryThumbnail: 'key.png', width: 11, height: 22, x: 300, y: 370, eventList: ['key0']}),
        rope: new Entity({id: 6, name: 'a rope', description: "A coil of rope. It might come in handy.", urlList: ['rope.png'], inventoryThumbnail: 'rope.png', width: 71, height: 48, x: 340, y: 300, eventList: ['rope0']}),
        well: new Entity({id: 7, name: 'a well', description: "A deep well lies before you. When you look down, all you see is a pitch black abyss.", urlList: ['well0.png', 'well1.png'], width: 637, height: 537, x: 225, y: 228}),
        cellarDoor: new Entity({id: 8, name: 'a cellar door', eventList: ['cellar0', 'cellar0'], description: "A sturdy metal door lies on a foundation of concrete. There is a handle with a lock above it.", urlList: ['cellar0.png', 'cellar1.png'], width: 309, height: 256, x: 560, y: 410}),
        lantern: new Entity({id: 9, name: 'a lantern', description: 'This is no ordinary lantern. You can feel the magic pulsing off of it.', urlList: ['lantern.png'], width: 43, height: 94, x: 478, y: 270, points: 100}),
    },
}
