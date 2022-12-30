document.addEventListener('DOMContentLoaded', function() {
    async function fetchData() {
        var x = []
        var y = []
        var z = [0, 0, 0, 0, 0, 0]
        let response = await fetch('https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}')
        let data = await response.json()
        console.log(data)
        for (var i = 0; i < data.data.length; i++) {
            x.unshift(data.data[i]['date'])
            y.unshift(data.data[i]['newCases'])
        }

        for (var i = 6; i < y.length; i++) {
            var av = (y[i - 6] + y[i - 5] + y[i - 4] + y[i - 3] + y[i - 2] + y[i - 1] + y[i]) / 7
            z.push(Math.round(av))
        }

        
        var trace1 = {
              x: x,
              y: y,
              name: 'cases',
              type: 'bar'
            }
          
        var trace2 = {
            x: x,
            y: z,
            name: '7 day average',
            // type: 'markers',
            mode: 'lines+markers',
            marker: {
                color: 'rgb(0, 200, 0)',
                size: 4
            },
            line: {
                width: 4
            }
            }
        
        var datas = [trace1, trace2]
          var layout = {
              autosize: true,
              title: 'Covid Cases in England',
              xaxis: {title: 'date'},
              yaxis: {title: 'cases'}
          }
          Plotly.newPlot('myDiv', datas, layout, {displayModeBar : false})    
    }

    fetchData()
})