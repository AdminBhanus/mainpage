const canvas = document.getElementById('pizza-canvas');
const context = canvas.getContext('2d');

const baseImages = [
  { src: 'https://dummyimage.com/150x150/000/fff.png&text=Base+1', loaded: false },
  { src: 'https://dummyimage.com/150x150/000/fff.png&text=Base+2', loaded: false },
];

const toppingImages = [
  { src: 'https://dummyimage.com/100x100/ff0000/fff.png&text=Topping+1', loaded: false },
  { src: 'https://dummyimage.com/100x100/00ff00/fff.png&text=Topping+2', loaded: false },
  { src: 'https://dummyimage.com/100x100/0000ff/fff.png&text=Topping+3', loaded: false },
];

let selectedImage = null;
let imageX = 0;
let imageY = 0;

// Draw pizza with base and toppings
function drawPizza() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let baseImage = null;
  for (let i = 0; i < baseImages.length; i++) {
    if (baseImages[i].selected) {
      baseImage = baseImages[i];
      break;
    }
  }
  if (baseImage) {
    context.globalAlpha = 0.5;
    context.drawImage(baseImage.image, 0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1.0;
  }
  for (let i = 0; i < toppingImages.length; i++) {
    const toppingImage = toppingImages[i];
    if (toppingImage.selected) {
      context.drawImage(toppingImage.image, imageX, imageY);
    }
  }
}

// // Add click functionality to base list items
// const baseList = document.getElementById('base-list');
// baseList.addEventListener('click', (event) => {
//   if (event.target.tagName === 'IMG') {
//     selectedImage = event.target;
//     for (let i = 0; i < baseImages.length; i++) {
//       baseImages[i].selected = false;
//       if (baseImages[i].image === selectedImage) {
//         baseImages[i].selected = true;
//       }
//     }
//     drawPizza();
//   }
// });

// // Add click functionality to topping list items
// const toppingList = document.getElementById('topping-list');
// toppingList.addEventListener('click', (event) => {
//   if (event.target.tagName === 'IMG') {
//     const toppingImage = event.target;
//     for (let i = 0; i < toppingImages.length; i++) {
//       if (toppingImages[i].image === toppingImage) {
//         if (toppingImages[i].selected) {
//           toppingImages[i].selected = false;
//           drawPizza();
//           return;
//         }
//         toppingImages[i].selected = true;
//         selectedImage = toppingImage;
//         imageX = canvas.width / 2 - selectedImage.width / 2;
//         imageY = canvas.height / 2 - selectedImage.height / 2;
//         drawPizza();
//         return;
//       }
//     }
//   }
// });

// Load all images and draw pizza with the first base image
// Load all images and draw pizza with the first base image
let loadedImages = 0;
baseImages.forEach((baseImage) => {
  const image = new Image();
  image.onload = () => {
    loadedImages++;
    baseImage.loaded = true;
    if (loadedImages === baseImages.length) {
      baseImages[0].selected = true;
      drawPizza();
    }
  };
  image.src = baseImage.src;
  baseImage.image = image;
});

// Add click functionality to base list items
const baseList = document.getElementById('base-list');
baseList.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    const selectedImage = event.target;
    baseImages.forEach((baseImage) => {
      if (baseImage.image === selectedImage) {
        baseImage.selected = true;
      } else {
        baseImage.selected = false;
      }
    });
    drawPizza();
  }
});

// Add click functionality to topping list items
const toppingList = document.getElementById('topping-list');
toppingList.addEventListener('click', (event) => {
  if (event.target.tagName === 'img') {
    const toppingImage = event.target;
    const selectedBase = baseImages.find((baseImage) => baseImage.selected);
    const newTopping = {
      src: toppingImage.src,
      x: selectedBase.x + selectedBase.image.width / 2 - toppingImage.width / 2,
      y: selectedBase.y + selectedBase.image.height / 2 - toppingImage.height / 2
    };
    selectedBase.toppings.push(newTopping);
    drawPizza();
  }
});

// Draw the pizza
function drawPizza() {
  const canvas = document.getElementById('pizza-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const selectedBase = baseImages.find((baseImage) => baseImage.selected);
  ctx.drawImage(selectedBase.image, selectedBase.x, selectedBase.y);
  selectedBase.toppings.forEach((topping) => {
    const toppingImage = new Image();
    toppingImage.onload = () => {
      ctx.globalAlpha = 0.5;
      ctx.drawImage(toppingImage, topping.x, topping.y);
      ctx.globalAlpha = 1.0;
    };
    toppingImage.src = topping.src;
  });
}
