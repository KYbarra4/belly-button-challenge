function buildGuage() {
    d3.json('samples.json').then((data) => {

    var wfreq = parseFloat(data.wfreq)
    console.log(wfreq)

    let guageFreq = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number+delta",
    //   delta: { reference: 380 },
      gauge: [{
        axis: { range: [null, 10]},
        steps: [
          { range: [0, 1], color: "lightgray" },
          { range: [1, 2], color: "gray" },
          { range: [3, 4], color: "gray" },
          { range: [4, 5], color: "gray" },
          { range: [5, 6], color: "gray" },
          { range: [6, 7], color: "gray" },
          { range: [7, 8], color: "gray" },
          { range: [8, 9], color: "gray" },
        ]
        // threshold: {
        //   line: { color: "red", width: 4 },
        //   thickness: 0.75,
        //   value: 490
        }]
    //   }
  }];

  var layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
  };
  
//   var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', guageFreq, layout);

    });
}