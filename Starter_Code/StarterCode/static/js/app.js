// Use the D3 library to read in samples.json from url
// let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
function init() {
    let dropDown = d3.select('#selDataset');
// Promise Pending
    // let bellyPromise = d3.json('samples.json');
    d3.json('samples.json').then((data) => {
        console.log(data)

        let names = data.names;
        names.forEach((sample) => {
            dropDown
                // console.log(id);
                .append('option')
                .text(sample)
                .property('value', sample);        
        });

       

    //     console.log('Promise :', bellyPromise);

// Fetch the JSON data and console log it
// d3.json(bellyPromise).then(function(data) {
//     console.log(data);
// });

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// let names = data.names;

// let dropDown = d3.select('#selDataset');
    // function init() {
    //     let dropDown = d3.select('#selDataset');

    //     let names = data.names;

    //     names.forEach((id) => {
            // console.log(id);
    //         select.append('option')
    //         .text(id)
    //         .property('value', id);        
    //     });

        let sampleZero = names[0];

        console.log(sampleZero);
        // buildCharts(sampleZero);
        // buildDemo(sampleZero);
    });
}

init();

function optionChanged(sampleX) {
    buildChart(sampleX);
    buildDemo(sampleX);
}

function buildDemo(sampleID) {
    d3.json('samples.json').then((data) => {
        let demoData = data.metadata;
        let information = demoData.filter(demoObject => demoObject.id == sampleID)[0];
        let demoInfo = d3.select('#sample-metadata').html("")
        dropBox.entries(information).forEach(([key, value]) => {
            demoInfo.append().text('${key}: ${value}');
        });
    });
}

// function buildChart(sample)
// function optionChanged(dropSample) {
//     buildChart(dropSample);
//     buildMetadata(dropSample);
// }
// // Use sample_values as the values for the bar chart.
//     function buildMetadata(sample) {
//         d3.json(url).then(function(data) {
//             let meta = data.metadata;
//             let domoInfo = metadata.filter(sample_values)
//     });
// }
//     });
// }
// Use otu_ids as the labels for the bar chart.
function buildChart(sample) {
    d3.json('samples.json').then((data) => {
        let sampleData = data.samples;
        let 
    });
}

// Use otu_labels as the hovertext for the chart.
