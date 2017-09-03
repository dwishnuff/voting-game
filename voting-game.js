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
  // document.getElementById("image-placement").innerHTML="";
  var container = document.getElementById("image-placement");
  var image = document.createElement("img");
  console.log(image);
  image.src = src;
  image.title= title;
  image.addEventListener("click", recordClick);
  image.addEventListener("click", imageReload);
  container.appendChild(image);
}

function showImages() {
  document.getElementById("image-placement").innerHTML="";
  document.getElementById("directions").innerHTML="Click on your favorite picture.";
  // document.getElementById("status").innerHTML = "Click on your favorite picture.";

  var index1 = Math.floor(Math.random() * imageObjects.length)
  addImage("images/"+imageObjects[index1].src, imageObjects[index1].title);
  console.log(imageObjects[index1]);

  var index2 = Math.floor(Math.random() * imageObjects.length)
  while (index2 == index1) {
    index2=Math.floor(Math.random() * imageObjects.length)
  }
  addImage("images/"+imageObjects[index2].src, imageObjects[index2].title);

  var index3 = Math.floor(Math.random() * imageObjects.length)
  while (index3 == index1 || index3 == index2) {
    index3 = Math.floor(Math.random() * imageObjects.length)
  }
  addImage("images/"+imageObjects[index3].src, imageObjects[index3].title);
}

function recordClick(event) {
  var imageClickedTitle = event.target.title;
  var index = 0;
  event.target.classList.add("onClick");
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

function imageCounterStats () {
  var ulElement= document.createElement("ul");
  ulElement.innerText= "Pictures and Votes"
  document.getElementById("status").appendChild(ulElement);
  for (var i=0; i<imageObjects.length; i++){
    var liElement = document.createElement("li");
    // var li2Element =document.createElement ("li");
    var currentImage = imageObjects[i];
    liElement.innerText = currentImage.title+" -- votes: "+currentImage.imageTotalVotes;
    ulElement.appendChild(liElement);
    // li2Element.innerText= imageObjects.imageTotalVotes;
    // liElement.appendChild(li2Element);
  }
}

var reloadCounter =1;
function imageReload () {
  setTimeout(function (){
    document.getElementById("status").innerHTML = "You have voted " +reloadCounter +" of 15 times.";
    if (reloadCounter<15){
      showImages();
      // recordClick();
      reloadCounter++;
    }
    else {
      document.getElementById("directions").innerHTML="";
      document.getElementById("status").innerHTML= "Thanks for playing the voting game! " +"  Here's your results!";
      document.getElementById("image-placement").innerHTML="";
      imageCounterStats();
    }
  },300); //added timeout delay to allow red border and zoom to show up on click.

}



window.addEventListener("load", showImages);
