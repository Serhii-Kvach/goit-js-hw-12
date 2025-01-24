export const renderImageCards = images => {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<a href="${largeImageURL}" class="gallery-item">
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360" />
  <div class="photo-info">
    <p class="photo-info-item">Likes<span>${likes}</span></p>
	<p class="photo-info-item">Views<span>${views}</span></p>
	<p class="photo-info-item">Comments<span>${comments}</span></p>
	<p class="photo-info-item">Downloads<span>${downloads}</span></p>
  </div>
  </div>
  </a>`
    )
    .join('');
};
