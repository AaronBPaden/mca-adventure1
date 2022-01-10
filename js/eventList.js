"use strict"

import { db } from './db.js';
import { state } from './state.js';

export let eventList = {
    "mailbox0": (event, entity) => {
        state.messageArea.innerHTML += `<p>${entity.description}</p>`;
        state.messageArea.scrollBy(0, 40);
    },
}
