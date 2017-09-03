function displayChart() {
  for (i = 0; i <imageObjects.length; i++) {
    imageObjects[i].y = imageObjects[i].imageTotalVotes;
  }
	var chart = new CanvasJS.Chart("status",
	{
		animationEnabled: true,
		theme: "theme2",
		//exportEnabled: true,
		title:{
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
