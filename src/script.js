'use strict'

const wrapper = document.querySelector(".wrapper");
const albumsList = document.querySelector("#albumsList");
const albumPhotos = document.querySelector(".photos");

wrapper.addEventListener("click", handleClick);

async function handleClick(e) {
  let action = e.target.dataset.action;
  let element = e.target;
  switch (action) {
    case "get-photos":
      const activeItem = document.querySelector("li.active");
      activeItem.classList.remove("active");
      element.classList.add("active");

      document.querySelector("#albumId").innerText = e.target.dataset.albumId;
      const photos = await getAlbumPhotos(e.target.dataset.albumId);
      await renderPhotos(photos);

      break;
  }
}

async function getAlbums() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  if (response.ok) {
    return response.json();
  } else {
    console.warn(response.status);
  }
}

async function getAlbumPhotos(albumId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  if (response.ok) {
    return response.json();
  } else {
    console.warn(response.status);
  }
}

async function renderAlbums(albums) {
  try {
    let lis = "";
    for (const [idx, album] of albums.entries()) {
      if (!album) {
        return;
      }
      lis += `<li class="list-group-item ${idx === 0 ? "active" : ""}" data-action="get-photos" data-album-id="${album.id}">${album.title}</li>`;
    }
    albumsList.innerHTML = lis;
  } catch (err) {
    console.warn(err);
  }
}

async function renderPhotos(photos) {
  try {
    let photoItems = "";
    for (const photo of photos) {
      if (!photo) {
        return;
      }
      photoItems += `<a class="photo-item" href="${photo.url}" target="_blank"><img src="${photo.thumbnailUrl}"></a>`;
    }
    albumPhotos.innerHTML = photoItems;
  } catch (err) {
    console.warn(err);
  }
}

async function render() {
  try {
    const albums = await getAlbums();
    await renderAlbums(albums);

    document.querySelector("#albumId").innerText = albums[0].id;
    const photos = await getAlbumPhotos(albums[0].id);
    await renderPhotos(photos);
  } catch (err) {
    console.warn(err);
  }
}
render();


