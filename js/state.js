"use strict"

export let state = {
    score: 0,
    moves: 0,
    currentRoom: 0,
    carriedItem: null,
    hasLantern: false,
    lanternMoves: 100,
    inventory: [],
    /* global display elements */
    locationLabel: document.getElementById('locationLabel'),
    viewport: document.getElementById('viewport'),
    messageArea: document.getElementById('messageArea'),
    /* debug elements */
    debugRoom: document.getElementById('debugRoom'),
    debugLantern: document.getElementById('debugLantern'),
    debugLanternMoves: document.getElementById('debugLanternMoves'),
    /* methods */
    incrementMoves: () => {
        state.moves++;
        document.getElementById('movesLabel').innerText = state.moves;
    },
};
