import gallery from './gallery-items.js';

// console.log(gallery);

const refs = {
  galleryUl: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  modalWindow: document.querySelector('.lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  closeButton: document.querySelector('button[data-action = "close-lightbox"]'),
};

refs.galleryUl.addEventListener('click', onGalleryClick);
refs.closeButton.addEventListener('click', closeModalWindow);
refs.overlay.addEventListener('click', closeModalWindow);

const galleryList = gallery.map(image => {
  const itemRef = document.createElement('li');
  itemRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.setAttribute('href', image.original);

  const imageRef = document.createElement('img');
  imageRef.classList.add('gallery__image');
  imageRef.setAttribute('src', image.preview);
  imageRef.setAttribute('data-source', image.original);
  imageRef.setAttribute('alt', image.description);
  imageRef.setAttribute('data-index', 0);

  linkRef.appendChild(imageRef);
  itemRef.appendChild(linkRef);

  return itemRef;
});
refs.galleryUl.append(...galleryList);

function onGalleryClick(event) {
  event.preventDefault();
  window.addEventListener('keydown', onEscapeClick);

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.modalWindow.classList.add('is-open');

  const largeImageUrl = event.target.dataset.source;
  refs.largeImage.src = largeImageUrl;
}

function closeModalWindow() {
  window.removeEventListener('keydown', onEscapeClick);
  refs.largeImage.src = '';
  refs.modalWindow.classList.remove('is-open');
}

function onEscapeClick(event) {
  if (event.code === 'Escape') {
    closeModalWindow();
  }
}
