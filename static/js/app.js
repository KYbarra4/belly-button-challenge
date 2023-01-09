// Use the D3 library to read in samples.json from url
// let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
function init() {

    d3.json('samples.json').then(function (data) {
        console.log(data)

        let dropdownMenu = d3.select('#selDataset');
        let names = data.names;
        names.forEach((name) => {
            dropdownMenu.append('option').text(name).property('value', name);        
        });

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

        Object.entries(information).forEach(([keys, value]) => {
            demoInfo.append('p').text('${keys}: ${value}');

        });
    });
}

function buildChart(samples) {
    d3.json('samples.json').then((data) => {
        let sampleData = data.samples;
        let selectID = sampleData.filter((demoObject) => demoObject.id == samples)[0];

        // let demoData = data.metadata;
        // let selectMeta = demoData.filter(demoObject => demoObject.id == samples)[0];

        // let idFirst = selectID[0]
        // let metaFirst = selectMeta[0]

        console.log(selectID)
        // console.log(selectMeta)

// Use sample_values as the values for the bar chart.
        let sample_values = selectID.sample_values;

// Use otu_ids as the labels for the bar chart.
        let otu_ids = selectID.otu_ids;

// Use otu_labels as the hovertext for the chart.
        let otu_labels = selectID.otu_labels;

        // console.log(sample_values)
        // console.log(otu_ids)
        // console.log(otu_labels)

        let trace1 = [{

            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map((OTU) => 'OTU ${OTU}').reverse(),

            // name: 'Top 10 OTUs',
            labels: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation:'h'

        }];

        // var data = [trace1];

        Plotly.newPlot('bar', trace1);

        let trace2 = [{
            x: otu_ids,
            y: sample_values,
            // title: 'OTU Bubble Data',
            labels: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale:'Greens'
            }
            
        }];

        Plotly.newPlot('bubble', trace2);

    });
}


