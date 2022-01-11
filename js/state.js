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
    debugHeader: document.getElementById('debugHeader'),
    debugCollapsible: document.getElementById('debugCollapsible'),
    debugForm: document.getElementById('debugForm'),
    debugRoom: document.getElementById('debugRoom'),
    debugLantern: document.getElementById('debugLantern'),
    debugLanternMoves: document.getElementById('debugLanternMoves'),
    debugAddItemId: document.getElementById('debugAddItemId'),
    debugSubmitButton: document.getElementById('debugSubmitButton'),
    /* methods */
    incrementMoves: () => {
        state.moves++;
        document.getElementById('movesLabel').innerText = state.moves;
    },
    updateDebug: () => {
        state.debugRoom.value = state.currentRoom;
        state.debugLantern.checked = state.hasLantern;
        state.debugLanternMoves.value = state.lanternMoves;
    },
};
