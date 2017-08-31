//constructor function



var ImageData = function (src, title) {
  this.src = src;
  this.title = title;
  this.imageTotalVotes = 0;


}

// var imageNames = ["bag.jpg", "banana.jpg", "boots.jpg", "chair.jpg", "cthulhu.jpg", "dragon.jpg", "pen.jpg", "scissors.jpg", "shark.jpg", "sweep.jpg", "unicorn.jpg", "usb.jpg", "water_can.jpg", "wine_glass.jpg"];

var imageObjects = [];
imageObjects.push (new ImageData ("bag.jpg", "bag"));
imageObjects.push (new ImageData ("banana.jpg", "banana"));
imageObjects.push (new ImageData ("boots.jpg", "boots"));
imageObjects.push (new ImageData ("chair.jpg", "chair"));
imageObjects.push (new ImageData ("cthulhu.jpg", "cthulu"));
imageObjects.push (new ImageData ("dragon.jpg", "dragon"));
imageObjects.push (new ImageData ("pen.jpg", "pen"));
imageObjects.push (new ImageData ("scissors.jpg", "scissors"));
imageObjects.push (new ImageData ("shark.jpg", "shark"));
imageObjects.push (new ImageData ("sweep.jpg", "sweep"));
imageObjects.push (new ImageData ("unicorn.jpg", "unicorn"));
imageObjects.push (new ImageData ("usb.jpg", "usb"));
imageObjects.push (new ImageData ("water_can.jpg", "water can"));
imageObjects.push (new ImageData ("wine_glass.jpg", "wine glass"));


function addImage(src, title) {
  var container = document.getElementById("image-placement");
  var image = document.createElement("img");
  console.log(image);
  image.src = src;
  image.title= title;
  image.addEventListener("click", recordClick);
  container.appendChild(image);
}

function showImages() {
  var index1 = Math.floor(Math.random() * 14)
  addImage("images/"+imageObjects[index1].src, imageObjects[index1].title);
  console.log(imageObjects[index1]);

  var index2 = Math.floor(Math.random() * 14)
  while (index2 == index1) {
    index2=Math.floor(Math.random() * 14)
  }
  addImage("images/"+imageObjects[index2].src, imageObjects[index2].title);

  var index3 = Math.floor(Math.random() * 14)
  while (index3 == index1 || index3 == index2) {
    index3 = Math.floor(Math.random() * 14)
  }
  addImage("images/"+imageObjects[index3].src, imageObjects[index3].title);
}

function recordClick(event) {
  var imageClickedTitle = event.target.title;
  var index = 0;
  do {
    var clicked=imageObjects[index];
    if (imageClickedTitle==clicked.title){
      console.log("Image Clicked: "+clicked.title);
      clicked.imageTotalVotes++;
      console.log(clicked.imageTotalVotes);
    } else {
      index++;
    }

  }
  while (imageClickedTitle != clicked.title);
}
  window.addEventListener("load", showImages);
