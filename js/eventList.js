"use strict"

import { db } from './db.js';
import { state } from './state.js';

export let eventList = [
    /* 0 */
    (event) => {
        state.messageArea.innerHTML += `<p>${this.description}</p>`;
        state.messageArea.scrollBy(40);
    },
    /* 1 */
]
