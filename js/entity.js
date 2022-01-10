"use strict"

import { state } from './state.js';
import { db } from './db.js';
import { eventList as events } from './eventList.js';

export class Entity {
    constructor(id, name, description, urlList, width, height, x, y, points = 0, eventList = [], zIndex = null, inventoryThumbnail = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.points = points;
        this.zIndex = zIndex;
        this.imgIdx = 0;
        this.#generateImages(urlList, inventoryThumbnail);
        this.#connectEvents(eventList);
    }
    /* convert the image into a valid HTML id */
    getImageId(i) {
        let re = /[a-z]*/ig;
        return this.name.match(re).join('') + `${this.id}${i}`;
    }
    #generateImages(urlList, inventoryThumbnail) {
        this.imgs = [];
        urlList.forEach((e, i) => {
            let img = new Image();
            img.id = this.getImageId(i);
            img.src = `../media/entities/${e}`;
            img.alt = name;
            img.style.position = "absolute";
            this.imgs.push(img);
        });
        if (inventoryThumbnail) {
            let img = new Image();
            img.src = inventoryThumbnail;
            img.alt = name;
            this.inventoryThumbnail = inventoryThumbnail;
        } else {
            this.inventoryThumbnail = null;
        }
    }
    #connectEvents(eventList) {
        eventList.forEach((el, i) => {
            this.imgs[i].addEventListener('click', ((event) => {
                events[el](event, this);
            }).bind(this));
        });
    }
    setClickEvent(itemState, callback) {
        this.imgs[itemState].addEventListener('click', (e) => {
            callback(e);
        });
    }
    /* print description in the message area */
    printDescription() {
        let messageArea = document.getElementById('messageArea');
        messageArea.innerHTML = `<p class="message-text">${this.description}</p>`;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
        this.resetStyle();
    }
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.resetStyle();
    }
    /* Change the z-index value for the current image */
    setZIndex(n) {
        this.zIndex = n;
    }
    /*
     * Entities can have multiple states represented by different images, for example a mailbox that opens and closes.
     *
     * Increments the image index by one. Wrap around if incrementing past the length of the image array.
     */
    incrementState() {
        this.imgIdx++;
        if (this.imgIdx === this.imgs.length) this.imgIdx = 0;
    }
    /* query the page for the image */
    getImageFromPage(i) {
        return document.getElementById(this.getImageId(i));
    }
    /* Reset the inline styling of the current image. */
    resetStyle() {
        let img = this.getImageFromPage(this.imgIdx);
        img.style.left = `${this.x}px`;
        img.style.top = `${this.y}px`;
        img.style.width = `${this.width}px`;
        img.style.height = `${this.height}px`;
        if (this.zIndex) {
            img.style.zIndex = `${this.zIndex}`;
        }
    }
    setState(id) {
        this.imgIdx = id;
    }
    /* return a copy of the current image */
    getImageElement() {
        return this.imgs[this.imgIdx];
    }
}
