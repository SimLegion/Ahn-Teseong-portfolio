import productImages from './product-images.js';
const viewer = document.querySelector('#art-view');
const title = viewer.querySelector('h3');
const frame = viewer.querySelector('.art-scroll');
const artwork = frame.querySelector('img');
const galleryButton = viewer.querySelector('#art-gallery');
const gallery = document.createElement('div');
gallery.className = 'product-gallery';
gallery.hidden = true;
frame.append(gallery);
const zoom = viewer.querySelector('#art-zoom');

function setZoom(enabled) {
  frame.classList.toggle('zoomed', enabled);
  zoom.setAttribute('aria-pressed', String(enabled));
  zoom.textContent = enabled ? '너비 맞춤' : '확대';
}

document.querySelectorAll('[data-artwork]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !viewer.showModal) return;
    event.preventDefault();
    title.textContent = link.querySelector('span').firstChild.textContent.trim();
    artwork.alt = title.textContent;
    artwork.src = link.href;
    artwork.hidden = false;
    gallery.hidden = true;
    zoom.hidden = false;
    galleryButton.setAttribute('aria-pressed', 'false');
    galleryButton.textContent = '대표·보조 이미지';
    gallery.replaceChildren();
    const productId = link.getAttribute('href').match(/products\/(\d+)-detail/);
    const images = productImages[productId?.[1]] || [];
    galleryButton.hidden = images.length === 0;
    images.forEach(item => {
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      image.dataset.src = item.src;
      image.alt = item.label;
      image.loading = 'lazy';
      const caption = document.createElement('figcaption');
      caption.textContent = item.label;
      figure.append(image, caption);
      gallery.append(figure);
    });
    setZoom(false);
    viewer.showModal();
    frame.scrollTo(0, 0);
  });
});
zoom.addEventListener('click', () => setZoom(!frame.classList.contains('zoomed')));
viewer.querySelector('#art-close').addEventListener('click', () => viewer.close());
galleryButton.addEventListener('click', () => {
  const showGallery = gallery.hidden;
  gallery.hidden = !showGallery;
  artwork.hidden = showGallery;
  zoom.hidden = showGallery;
  galleryButton.textContent = showGallery ? '상세페이지로 돌아가기' : '대표·보조 이미지';
  galleryButton.setAttribute('aria-pressed', String(showGallery));
  if (showGallery) {
    gallery.querySelectorAll('img[data-src]').forEach(image => {
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    });
  }
  setZoom(false);
  frame.scrollTo(0, 0);
});
function isOutsideViewer(event) {
  const bounds = viewer.getBoundingClientRect();
  return event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom;
}

let pointerStartedOutside = false;
viewer.addEventListener('pointerdown', event => {
  pointerStartedOutside = event.button === 0 && isOutsideViewer(event);
});
viewer.addEventListener('pointercancel', () => {
  pointerStartedOutside = false;
});
viewer.addEventListener('click', event => {
  if (pointerStartedOutside && isOutsideViewer(event)) viewer.close();
  pointerStartedOutside = false;
});
viewer.addEventListener('close', () => {
  pointerStartedOutside = false;
});