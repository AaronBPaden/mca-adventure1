"use strict"

import { Room } from './room.js';
import { Entity } from './entity.js';
import { state } from './state.js';

export let db = {
    rooms: [
        new Room(0, "West of House", "This is west of house.", {north: 1, east: null, west: null, south: null}, '../media/backgrounds/west-of-house.webp', [0]),
        new Room(1, "North of House", "This is north of house.", {north: null, east: null, west: null, south: 0}, '../media/backgrounds/north-of-house.webp'),
    ],
    entities: [
        new Entity(0, "mailbox", "it's a mailbox", ["mailbox.png"], 200, 400, 100, 100, 0, ["mailbox0"]),
    ],
}
