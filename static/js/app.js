// Use the D3 library to read in samples.json from url
// let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// Creating an initial function to form all charts and data upon entering page and using the first instance
function init() {

// Creating a promise to read the data I will be using
    let Promise = d3.json('samples.json');

    console.log('Data Promise:', Promise)

// Reading the json file and grabbing the names to put into the dropdown menu and selecting the dropdown menu from html - #selDataset
    d3.json('samples.json').then(function (data) {

        let dropdownMenu = d3.select('#selDataset');
        let names = data.names;
        names.forEach((name) => {
            dropdownMenu.append('option').text(name).property('value', name);        
        });

// Using the first sample in the list and creating initial charts and data
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

// Creating a function to build the Demographic Info box
function buildDemo(samples) {

    d3.json('samples.json').then((data) => {

// Selecting the #sample-metadat html to update the information and grabbing the metadata
        let demoBox = d3.select('#sample-metadata');
        let demoData = data.metadata;
        let information = demoData.filter(demoObject => demoObject.id == samples)[0];

// Clearing out data on change
        demoBox.html("");

// Entering the metadate into the info box, size h4, changing the KEY to uppercase and returning all labels and metadata for the ID
        Object.entries(information).forEach(([key, type]) => {
            demoBox.append('h4').text(`${key.toUpperCase()}: ${type}`);

        });
    });
}

// Using the function buildChart to build both the bar and bubble graph
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

// Using the variable from above as x & y axis and creating labels and hovertext
        let trace1 = [{
            x: sample_values,
            y: yLabels,
            labels: otu_ids,
            hovertext: otu_labels,
            type: 'bar',
            orientation:'h'
        }];

// Creating a title for trace1 - bar chart
        let barLayout = {
            title: 'Top 10 OTU Sample Groups by ID'
        }

// Plotting the bar chart
        Plotly.newPlot('bar', trace1, barLayout);

// Using the same data from above to plot the bubble chart
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

// Creating title for the bubble chart
        let bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
        }

// Plotting the bubble chart
        Plotly.newPlot('bubble',trace2, bubbleLayout);

    });
}



