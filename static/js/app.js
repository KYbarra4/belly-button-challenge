// Use the D3 library to read in samples.json from url
// let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
function init() {

    let Promise = d3.json('samples.json');

    console.log('Data Promise:', Promise)

    d3.json('samples.json').then(function (data) {

        let dropdownMenu = d3.select('#selDataset');
        let names = data.names;
        names.forEach((name) => {
            dropdownMenu.append('option').text(name).property('value', name);        
        });

        let beginSample = names[0];

        buildChart(beginSample);
        buildDemo(beginSample);
        buildGuage(beginSample)
    });
}

// Creating a function to change charts upon #selDataset dropdown change
function optionChanged(sampleX) {
    buildChart(sampleX);
    buildDemo(sampleX);
    buildGuage(sampleX)
}

init();

function buildDemo(samples) {

    d3.json('samples.json').then((data) => {

        let demoBox = d3.select('#sample-metadata');
        let demoData = data.metadata;
        let information = demoData.filter(demoObject => demoObject.id == samples)[0];

        demoBox.html("");

        Object.entries(information).forEach(([key, type]) => {
            demoBox.append('h4').text(`${key.toUpperCase()}: ${type}`);

        });
    });
}

function buildChart(samples) {

    d3.json('samples.json').then(function (data) {
        let samplesY = data.samples;
        
        let sampleYdata = samplesY.filter((demoObject) => demoObject.id == samples)[0]; 

        console.log(sampleYdata)

// Use sample_values as the values for the bar chart
        let sample_values = sampleYdata.sample_values.slice(0, 10).reverse();
        console.log(sample_values)

// Use otu_ids as the labels for the bar chart, extra step below
        let otu_ids = sampleYdata.otu_ids;
        console.log(otu_ids);

// Use otu_labels as the hovertext for the chart
        let otu_labels = sampleYdata.otu_labels.slice(0, 10).reverse();
        console.log(otu_labels);

// Slicing the top 10 labels 
        let yLabels = otu_ids.slice(0, 10).map(OTUid => `OTU: ${OTUid}`).reverse();
        console.log(yLabels);

        let trace1 = [{

            x: sample_values,
            y: yLabels,
            labels: otu_ids,
            hovertext: otu_labels,
            type: 'bar',
            orientation:'h'

        }];

// Creating a title for trace1
        let barLayout = {
            title: 'Top 10 OTU Sample Groups by ID'
        }

        Plotly.newPlot('bar', trace1, barLayout);

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

        let bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
        }

        Plotly.newPlot('bubble',trace2, bubbleLayout);

    });
}



