function displayChart() {
  var input = document.createElement("input");
  input.setAttribute("type","button");
  input.setAttribute("value","Vote Again");
  input.setAttribute("onClick","voteAgain()");
  button.appendChild(input);

  for (i = 0; i <imageObjects.length; i++) {
    imageObjects[i].y = imageObjects[i].imageTotalVotes;
  }
	var chart = new CanvasJS.Chart("status",
	{
backgroundColor: null,
    animationEnabled: true,
		theme: "theme2",
		//exportEnabled: true,
		title:{
fontFamily: "Monotype",
      fontColor: "white",
			text: "Voting Results"
		},
		data: [
			{
				type: "column", //change type to bar, line, area, pie, etc
				dataPoints: imageObjects
			}
		]
	});

	chart.render();
}
