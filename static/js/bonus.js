function buildGuage(samples) {
  d3.json('samples.json').then(function (data) {

    let demoData = data.metadata;
    let information = demoData.filter((demoObject) => demoObject.id == samples)[0];

    let wfreq = (information.wfreq)
    console.log(wfreq)

    let guageFreq = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Belly Button Washing Frequency"},
    
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10]},
        bar: {color: "black"},
        bordercolor: "black",
        borderwidth: 2,
        steps: [
          { range: [0, 1], color: "#80ff80" },
          { range: [1, 2], color: "#00ff00" },
          { range: [2, 3], color: "#00e600" },
          { range: [3, 4], color: "#00cc00" },
          { range: [4, 5], color: "#00b300" },
          { range: [5, 6], color: "#009900" },
          { range: [6, 7], color: "#008000" },
          { range: [7, 8], color: "#006600" },
          { range: [8, 9], color: "#004d00" },
          { range: [9, 10], color: "#001a00" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 1,
          value: 9
        }
      }
    //   }
  }];

  var layout = {
    width: 400,
    height: 300,
    title: 'Scrubs per Week',
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "Black", family: "Arial" }
    
  };
  
  Plotly.newPlot('gauge', guageFreq, layout);

  });
}