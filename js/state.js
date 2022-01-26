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
    inventoryList: document.getElementById('inventoryList'),
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
    updateScore: (points) => {
        state.score += points;
        document.getElementById('scoreLabel').innerText = state.score;
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
                state.carriedItem = null;
                break;
            case state.actions.EXAMINE:
                document.body.style.cursor = "url(media/buttons/examine.png) 16 15, auto";
                state.activeAction = action;
                break;
            case state.actions.PICKUP:
                document.body.style.cursor = "url(media/buttons/pickup.png) 12 11, auto";
                state.activeAction = action;
                break;
            case state.actions.COMBINE:
                let thumbnailCenter = state.carriedItem.thumbnailCenter();
                document.body.style.cursor = `url(${state.carriedItem.thumbnailSrc}) ${thumbnailCenter.x} ${thumbnailCenter.y}, auto`;
                state.activeAction = action;
                break;
            default:
                console.log(`Invalid action`);
                state.activeAction = state.actions.USE;
                break;
        }
    },
    /* Add an item to the player's inventory. */
    addItem: (item) => {
        state.inventory.push(item);
        let li = document.createElement("li");
        li.classList.add("inventory-item");
        li.appendChild(item.inventoryThumbnail);
        state.inventoryList.appendChild(li);
    },
    /* Remove an item from the player's inventory. */
    removeItem: (item) => {
        Array.from(state.inventoryList.children).forEach((el) => {
            let img = el.querySelector('img');
            if (img.src === item.thumbnailSrc) el.remove();
        });
        state.inventory = state.inventory.filter((el) => item !== el);
        /* Probably the function is being called because the player is using an item that is no longer needed.
         * Let's reset the current action to stop the item still being in the player's hand. */
        state.setAction(state.actions.USE);
    },
};
