// =============================================================================
// == GLOBAL STATE =============================================================
// =============================================================================

let burgerMenu = undefined;
let gallery    = undefined;
let offers     = undefined;

// =============================================================================
// == CALLBACKS ================================================================
// =============================================================================

function onDocumentLoad() {
    burgerMenu = new BurgerMenu();
    gallery    = new Gallery("gallery");
    offers     = new Gallery("offers-section");
}

// =============================================================================
// == HELPERS ==================================================================
// =============================================================================

function advanceIndexInBounds(curIndex, offset, minIndex, maxIndex) {
    const newIndex = curIndex + offset;

    if (newIndex > maxIndex) return minIndex;
    if (newIndex < minIndex) return maxIndex;

    return newIndex;
}

// =============================================================================
// == BURGER MENU ==============================================================
// =============================================================================

class BurgerMenu {
    constructor() {
	this.isVisible = false;
	this.containerElement = document.getElementById("burger-menu__container");
    }

    toggleVisible() {
	this.isVisible = !this.isVisible;
	console.log(`Burger Menu is ${this.isVisible ? "opened" : "closed"}`);

	if (this.isVisible) {
	    this.containerElement.classList.add("burger-menu--open");
	    this.containerElement.classList.remove("burger-menu--closed");
	} else {
	    this.containerElement.classList.remove("burger-menu--open");
	    this.containerElement.classList.add("burger-menu--closed");
	}
    }
}

// =============================================================================
// == GALLERY ==================================================================
// =============================================================================

class Gallery {
    constructor(id) {
	this.containerElem     = document.getElementById(id);
	this.itemElems         = this.containerElem.getElementsByClassName("gallery-item");
	this.numItemElems      = this.itemElems.length;
	this.scrollButtonElems = this.containerElem.getElementsByClassName("scroll-button");
	this.numScrollElems    = this.scrollButtonElems.length;
	this.activeItem        = this.findActiveItem();
    
	console.debug(`Gallery "${id}" has ${this.numItemElems} items`);
	console.assert(this.numItemElems === this.numScrollElems);
	console.debug(`Initial active item: ${this.activeItem}`);
    }

    findActiveItem() {
	for (let i = 0; i < this.numItemElems; ++i) {
	    let item = this.itemElems[i];
	    if (item.classList.contains("gallery-item--active")) {
		return i;
	    }
	}

	return undefined;
    }

    gotoNextElem() { this.gotoElemRelative(+1); } 
    gotoPrevElem() { this.gotoElemRelative(-1); } 

    gotoElemRelative(offset) {
	const newIndex = this.activeItem + offset;

	if (newIndex < 0) return;
	if (newIndex >= this.numItemElems) return;

	this.gotoElem(newIndex);
    }

    gotoElem(index) {
	console.assert(index >= 0);
	console.assert(index < this.numItemElems);

	this.activeItem = index;
	this.updateElems();

	console.debug(`New index: ${this.activeItem}`);
    }

    updateElems() {
	for (let i = 0; i < this.numItemElems; ++i) {
	    let item   = this.itemElems[i];
	    let button = this.scrollButtonElems[i];

	    if (i === this.activeItem) {
		item.classList.add("gallery-item--active");
		item.classList.remove("gallery-item--inactive");
		button.classList.add("scroll-button--active");
		button.classList.remove("scroll-button--inactive");
	    } else {
		item.classList.remove("gallery-item--active");
		item.classList.add("gallery-item--inactive");
		button.classList.remove("scroll-button--active");
		button.classList.add("scroll-button--inactive");
	    }
	}
    }
}


