//constructor function



var ImageData = function (src, title) {
  this.src = src;
  this.title = title;
  this.imageTotalVotes = 0;
  this.indexLabel = title;
  this.label = title;
}

function sortNumber(left, right) {
  if (left.imageTotalVotes< right.imageTotalVotes) { return 1 }
  else if (left.imageTotalVotes > right.imageTotalVotes) { return -1 }
  else { return 0 }
}

if (localStorage.getItem("ImageObjects") != null){
  var imageObjects = JSON.parse(localStorage.getItem("ImageObjects"));
} else {
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
}

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
  document.getElementById("image-placement").innerHTML="";
  document.getElementById("directions").innerHTML="Click on your favorite picture.";

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
      localStorage.setItem("ImageObjects", JSON.stringify(imageObjects));
      console.log(clicked.imageTotalVotes);
      console.log("reload counter" +reloadCounter)
    } else {
      index++;
    }

  }
  while (imageClickedTitle != clicked.title);
  imageReload();
}

function imageCounterStats () {
  var ulElement= document.createElement("ul");
  var spanTitle =document.createElement("span");
  spanTitle.innerText= "Pictures and Votes"
  spanTitle.setAttribute("id","spanTitle");
  document.getElementById("displayResults").appendChild(ulElement);
  ulElement.appendChild(spanTitle);
  var sortedImages=imageObjects.sort(sortNumber);
  for (var i=0; i<sortedImages.length; i++){
    var liElement = document.createElement("li");
    liElement.setAttribute("class", "listResults");
    // var li2Element =document.createElement ("li");
    var currentImage = sortedImages[i];
    liElement.innerText = currentImage.title+" -- votes: "+currentImage.imageTotalVotes;
    ulElement.appendChild(liElement);
    // li2Element.innerText= imageObjects.imageTotalVotes;
    // liElement.appendChild(li2Element);
  }
}

function voteAgain () {
  reloadCounter =1;
  document.getElementById("status").innerHTML="";
  document.getElementById("button").innerHTML="";
  document.getElementById("displayResults").innerHTML="";
  showImages();
}


var reloadCounter =1;
function imageReload () {
  setTimeout(function (){
    document.getElementById("status").innerHTML = "You have voted " +reloadCounter +" of 15 times. Please keep clicking.";
    if (reloadCounter<3){
      showImages();
      reloadCounter++
    }
    else {
      document.getElementById("directions").innerHTML="";
      document.getElementById("status").innerHTML= "Thanks for playing the voting game! " +"  Here's your results!";
      document.getElementById("image-placement").innerHTML="";
      displayChart();
    }
    ;
  },300); //added timeout delay to allow red border and zoom to show up on click.

}



window.addEventListener("load", showImages);
