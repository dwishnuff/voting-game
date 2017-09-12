//constructor function
var ImageData = function (src, title) {
  this.src = src;
  this.title = title;
  this.imageTotalVotes = 0;
  this.indexLabel = title;
  this.label = title;
}


//function to sort list by number of total votes
function sortNumber(left, right) {
  if (left.imageTotalVotes< right.imageTotalVotes) { return 1 }
  else if (left.imageTotalVotes > right.imageTotalVotes) { return -1 }
  else { return 0 }
}


//If localStorage is not empty (ie. not first time through), then use getItem to use localStorage of imageObjects.  Else, use the imageObjects array created through constructor function.
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

//function to addImage with src and title elements, adds event listener with function of recordClick
function addImage(src, title) {
  var container = document.getElementById("image-placement");
  var image = document.createElement("img");
  console.log(image);
  image.src = src;
  image.title= title;
  image.addEventListener("click", recordClick);
  container.appendChild(image);
}

//function to showImages on page. Compares index1 to index2 and index3 to ensure that there are no duplicates.
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


//This function creates a persistent list of voting results.  It is called in the displayChart function (on chart.js file). displayChart function is called as part of the imageReload function when number of clicks has been reached.
function imageCounterStats () {
  var ulElement= document.createElement("ul");
  var spanTitle =document.createElement("span");
  spanTitle.innerText= "Pictures and Votes"
  spanTitle.setAttribute("id","spanTitle");
  document.getElementById("displayVotes").appendChild(ulElement);
  ulElement.appendChild(spanTitle);
  var sortedImages=imageObjects.sort(sortNumber);
  for (var i=0; i<sortedImages.length; i++){
    var liElement = document.createElement("li");
    liElement.setAttribute("class", "listResults");
    var currentImage = sortedImages[i];
    liElement.innerText = currentImage.title+" -- votes: "+currentImage.imageTotalVotes;
    ulElement.appendChild(liElement);
  }
}

//This function is called when user clicks "Vote Again" button.  It resets the reloadCounter to 1 and clears the status, button, chart and votes.
function voteAgain () {
  reloadCounter =1;
  document.getElementById("status").innerHTML="";
  document.getElementById("button").innerHTML="";
  document.getElementById("displayChart").innerHTML="";
  document.getElementById("displayVotes").innerHTML="";
  showImages();
}


//imageReload function reloads images for voting until user has voted a designated number of times (15), else clears directions and calls displayChart function.
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
  },75); //added timeout delay to allow red border and zoom to show up on click.

}


//on window load, run showImages function.
window.addEventListener("load", showImages);
