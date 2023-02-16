const allCards = document.querySelector(".all-cards");
const favCards = document.querySelector(".fav-cards");
const boxcount1 = document.getElementById("1");
const boxcount2 = document.getElementById("2");
const boxcount3 = document.getElementById("3");
const boxcount4 = document.getElementById("4");
const boxcount5 = document.getElementById("5");

const azSortButton = document.querySelector(".az-sort-button");
const zaSortButton = document.querySelector(".za-sort-button");

let memesArray = [];
let favMemesArray = [];
let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;

fetch("https://api.imgflip.com/get_memes")
  .then((response) => response.json())
  .then(({ data: { memes } }) => {
    memesArray = memes.slice(0, 30);
    boxCount(memesArray);
    buildCountTemplate();
    template_output();
  });

function boxCount(memes) {
  const boxCountArray = memes.map((meme) => meme.box_count);
  boxCountArray
    .filter((count) => count === 1)
    .forEach((element) => {
      count1 += 1;
    });
  boxCountArray
    .filter((count) => count === 2)
    .forEach((element) => {
      count2 += 1;
    });
  boxCountArray
    .filter((count) => count === 3)
    .forEach((element) => {
      count3 += 1;
    });
  boxCountArray
    .filter((count) => count === 4)
    .forEach((element) => {
      count4 += 1;
    });
  boxCountArray
    .filter((count) => count === 5)
    .forEach((element) => {
      count5 += 1;
    });
}

function buildCountTemplate() {
  boxcount1.innerHTML = `Memes With 1 Box Count: ${count1}`;
  boxcount2.innerHTML = `Memes With 2 Box Count: ${count2}`;
  boxcount3.innerHTML = `Memes With 3 Box Count: ${count3}`;
  boxcount4.innerHTML = `Memes With 4 Box Count: ${count4}`;
  boxcount5.innerHTML = `Memes With 5 Box Count: ${count5}`;
}

function template_output() {
  allCards.innerHTML = "";
  favCards.innerHTML = "";
  if (memesArray) {
    memesArray.map(({ id, name, url, box_count }, index) => {
      buildAllCardTemplate(id, name, url, box_count, index);
    });
  }
  if (favMemesArray) {
    favMemesArray.map(({ id, name, url, box_count }, index) => {
      buildFavCardTemplate(id, name, url, box_count, index);
    });
  }
}

function buildAllCardTemplate(id, name, url, box_count, index) {
  let cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  let cardBoxCount = document.createElement("div");
  cardBoxCount.classList.add("card-box-count");
  let cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  cardBody.setAttribute("id", id);
  cardTitle.innerHTML = name;
  cardImage.src = url;
  cardBoxCount.innerHTML = `Box Count: ${box_count}`;
  cardTitle.appendChild(cardBoxCount);
  cardBody.appendChild(cardImage);
  cardBody.appendChild(cardTitle);
  allCards.appendChild(cardBody);
  onCardClick(cardBody, index);
}

function buildFavCardTemplate(id, name, url, box_count, index) {
  let cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  let cardBoxCount = document.createElement("div");
  cardBoxCount.classList.add("card-box-count");
  let cardImage = document.createElement("img");
  cardImage.classList.add("card-image");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  cardBody.setAttribute("id", id);
  cardTitle.innerHTML = name;
  cardImage.src = url;
  cardBoxCount.innerHTML = `Box Count: ${box_count}`;
  cardTitle.appendChild(cardBoxCount);
  cardBody.appendChild(cardImage);
  cardBody.appendChild(cardTitle);
  favCards.appendChild(cardBody);
  onCardClick(cardBody, index);
}

function onCardClick(cardBody, index) {
  cardBody.addEventListener("click", () => {
    if (cardBody.parentNode.classList.contains("fav-cards")) {
      memesArray.push(favMemesArray[index]);
      favMemesArray.splice(index, 1);
      template_output();
    } else {
      favMemesArray.push(memesArray[index]);
      memesArray.splice(index, 1);
      template_output();
    }
  });
}

azSortButton.addEventListener("click", () => {
  memesArray.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  favMemesArray.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else {
      return -1;
    }
  });
  template_output();
});

zaSortButton.addEventListener("click", () => {
  memesArray.sort((a, b) => {
    if (b.name > a.name) {
      return 1;
    } else {
      return -1;
    }
  });
  favMemesArray.sort((a, b) => {
    if (b.name > a.name) {
      return 1;
    } else {
      return -1;
    }
  });
  template_output();
});
