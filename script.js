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
// == GALLERY ==================================================================
// =============================================================================

const NUM_GALLERY_IMAGES = 3;
let   curGalleryIndex    = 0;

let   galleryMainImage     = undefined;
let   galleryScrollButtons = {};

function populateGalleryElements() {
    for (let i = 0; i < NUM_GALLERY_IMAGES; ++i) {
	let elem = document.getElementById(`gallery-scroll--${i}`);
	if (!elem) console.warn(`Can not find gallery scroll button #${i}`);
	galleryScrollButtons[i] = elem;
    }

    galleryMainImage = document.getElementById(`gallery-main-image`);
    if (!galleryMainImage) console.warn(`Cannot find the gallery main image`);
}

function gotoNextGalleryImage() { gotoGalleryImageRelative(+1); }
function gotoPrevGalleryImage() { gotoGalleryImageRelative(-1); }

function gotoGalleryImageRelative(offset) {
    gotoGalleryImage(
	advanceIndexInBounds(curGalleryIndex, offset, 0, NUM_GALLERY_IMAGES - 1));
}

function gotoGalleryImage(index) {
    console.assert(index >= 0);
    console.assert(index < NUM_GALLERY_IMAGES);
    console.assert(galleryMainImage != undefined);
    
    curGalleryIndex      = index;
    galleryMainImage.src = `gallery${curGalleryIndex + 1}.jpg`;

    for (let i = 0; i < NUM_GALLERY_IMAGES; ++i) {
	let elem = galleryScrollButtons[i];
	if (!elem) continue;

	if (i === curGalleryIndex) {
	    elem.classList.add(`scroll-button--active`);
	} else {
	    elem.classList.remove(`scroll-button--active`);
	}
    }
    
    console.log(`Goto Gallery Image ${curGalleryIndex}`);
}


