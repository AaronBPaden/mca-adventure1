"use strict"

export let state = {
    actions: Object.freeze({
        USE: Symbol('USE'),
        EXAMINE: Symbol('EXAMINE'),
        PICKUP: Symbol('PICKUP'),
        COMBINE: Symbol('COMBINE'),
    }),
    score: 0,
    moves: 0,
    currentRoom: "westOfHouse",
    carriedItem: null,
    hasLantern: false,
    lanternMoves: 100,
    inventory: [],
    activeAction: null,
    /* global display elements */
    locationLabel: document.getElementById('locationLabel'),
    viewport: document.getElementById('viewport'),
    messageArea: document.getElementById('messageArea'),
    inventroyList: document.getElementById('inventoryList'),
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
    incrementMoves: (isDark) => {
        state.moves++;
        document.getElementById('movesLabel').innerText = state.moves;
        if (isDark && state.hasLantern) state.lanternMoves--;
        state.updateDebug();
    },
    updateDebug: () => {
        state.debugRoom.value = state.currentRoom;
        state.debugLantern.checked = state.hasLantern;
        state.debugLanternMoves.value = state.lanternMoves;
    },
    setAction: (action) => {
        switch (action) {
            case state.actions.USE:
                document.body.style.cursor = "auto";
                state.activeAction = action;
                break;
            case state.actions.EXAMINE:
                document.body.style.cursor = "url(../media/buttons/examine.png), auto";
                state.activeAction = action;
                break;
            case state.actions.PICKUP:
                document.body.style.cursor = "url(../media/buttons/pickup.png), auto";
                state.activeAction = action;
                break;
            case state.actions.COMBINE:
                document.body.style.cursor = `url(${state.thumbnailSrc}), auto`;
                state.activeAction = action;
            default:
                console.log(`Invalid action`);
                state.activeAction = state.actions.USE;
                break;
        }
    },
};
