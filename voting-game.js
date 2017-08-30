//constructor function

var ImageData = function (src, altdescription) {
  this.src = src;
  this.altdescription = alt;
  this.imageTotalVotes = 0;
}

var imageNames = ["bag.jpg", "banana.jpg", "boots.jpg", "chair.jpg", "cthulhu.jpg", "dragon.jpg", "pen.jpg", "scissors.jpg", "shark.jpg", "sweep.jpg", "unicorn.jpg", "usb.jpg", "water_can.jpg", "wine_glass.jpg"];

function addImage(imageFileName) {
  var container = document.getElementById("image-placement");
  var image = document.createElement("img");
  image.src = imageFileName;
  image.addEventListener("click", recordClick);
  container.appendChild(image);
}

function showImages() {
  var index1 = Math.floor(Math.random() * 14)
  addImage("images/"+imageNames[index1]);

  var index2 = Math.floor(Math.random() * 14)
  while (index2 == index1) {
    index2=Math.floor(Math.random() * 14)
  }
  addImage("images/"+imageNames[index2]);

  var index3 = Math.floor(Math.random() * 14)
  while (index3 == index1 || index3 == index2) {
    index3 = Math.floor(Math.random() * 14)
  }
  addImage("images/"+imageNames[index3]);
}

function recordClick(event) {
  var imageSource = event.target.src;
  console.log("Image Clicked: "+imageSource);
}

window.addEventListener("load", showImages);
