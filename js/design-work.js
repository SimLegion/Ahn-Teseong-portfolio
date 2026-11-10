const viewer = document.querySelector('#art-view');
const title = viewer.querySelector('h3');
const frame = viewer.querySelector('.art-scroll');
const artwork = frame.querySelector('img');
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
    setZoom(false);
    viewer.showModal();
    frame.scrollTo(0, 0);
  });
});
zoom.addEventListener('click', () => setZoom(!frame.classList.contains('zoomed')));
viewer.querySelector('#art-close').addEventListener('click', () => viewer.close());