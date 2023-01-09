// Use the D3 library to read in samples.json from url
// let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
// // Use sample_values as the values for the bar chart.
// let sample_values = selectID.sample_values

// // Use otu_ids as the labels for the bar chart.
// let otu_ids = selectID.otu_ids

// // Use otu_labels as the hovertext for the chart.
// let otu_labels = selectID.otu_labels

function init() {
    // let dropDown = d3.select('#selDataset');

// Promise Pending
    // let bellyPromise = d3.json('samples.json');
    d3.json('samples.json').then(function (data) {
        console.log(data)

        let dropdownMenu = d3.select('#selDataset');
        let names = data.names;
        names.forEach((name) => {
            dropdownMenu.append('option').text(name).property('value', name);        
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

        let beginSample = names[0];

        // console.log(beginSample);
        buildChart(beginSample);
        buildDemo(beginSample);
    });
}

function optionChanged(sampleX) {
    buildChart(sampleX);
    buildDemo(sampleX);
}

init();

function buildDemo(samples) {
    d3.json('samples.json').then((data) => {
        let demoData = data.metadata;
        let information = demoData.filter((demoObject) => demoObject.id == samples)[0];
        let demoInfo = d3.select('#sample-metadata');

        demoInfo.html("");

        Object.entries(information).forEach(([key, value]) => {
            demoInfo.append('p').text('${key}: ${value}');

        // var wfreq = parseFloat(information.wfreq)
        // console.log(wfreq)
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
function buildChart(samples) {
    d3.json('samples.json').then((data) => {
        let sampleData = data.samples;
        let selectID = sampleData.filter((demoObject) => demoObject.id == samples)[0];

        let demoData = data.metadata;
        let selectMeta = demoData.filter(demoObject => demoObject.id == samples);

        // let idFirst = selectID[0]
        let metaFirst = selectMeta[0]

        console.log(demoData)
        console.log(metaFirst)

// Use sample_values as the values for the bar chart.
        let sample_values = selectID.sample_values

// Use otu_ids as the labels for the bar chart.
        let otu_ids = selectID.otu_ids

// Use otu_labels as the hovertext for the chart.
        let otu_labels = selectID.otu_labels

        // var wfreq = parseFloat(information.wfreq)
        // console.log(wfreq)

        // let barSort = [otu_ids];
        // barSort.sort(function compareFunction(firstNum, secondNum) {
        //     return secondNum - firstNum;
        // });

        let trace1 = [{

            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map((OTU) => 'OTU ${OTU}').reverse(),

            name: 'Top 10 OTUs',
            labels: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation:'h'

        }];

        Plotly.newPlot('bar', trace1);

        let trace2 = [{
            x: otu_ids,
            y: sample_values,
            labels: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale:'Greens'
            }
            
        }];

        Plotly.newPlot('bubble', trace2);

    // });
// });
    });
}

// init();
