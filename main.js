function addGraph(svc, d) {
  var id = 'graph_'+svc;
  var dv = $('<div></div>')
  dv.attr('id', id);
  dv.appendTo($("#container"));

  var max = 0;
  for (x in d) {
    for (i of d[x]['y']) {
      if (i > max) max = i;
    }
  }

  Plotly.newPlot(id, d, {
    title: svc,
    width: 1600,
    height: 500,
    yaxis: { exponentformat: 'none' },
    shapes: [
      {
        type: 'line',
        x0: 121,
        y0: -5,
        x1: 121,
        y1: max,
        line: {
          color: 'rgb(0,0,0)',
          width: 1
        }
      },
      {
        type: 'line',
        x0: 241,
        y0: -5,
        x1: 241,
        y1: max,
        line: {
          color: 'rgb(0,0,0)',
          width: 1
        }
      }
    ]
  });
}

function sum_all(data, init) {
  var teams = [
    "PPP", "Eat Sleep Pwn Repeat", "DEFKOR", "pasten", "HITCON",
    "Bushwhackers", "koreanbadass", "Tea Deliverers", "Shellphish", "A*0*E",
    "hacking4danbi", "!SpamAndHex", "RRR", "Team Rocket \u2620\ufe0f", "Lab RATs"
  ]

  var sum_data = {};

  for (team of teams) {
    sum_data[team] = [];

    for (i=0; i<290; i++) {
      // unused service
      sum_data[team].push(init);
    }
  }

  for (svc in data) {
    for (d of data[svc]) {
      var name = d['name'];
      var dt = d['y'];
      for (var i=0; i<290; i++) {
        sum_data[name][i] += dt[i];
      }
    }
  }

  sum = []
  for (team in sum_data) {
    var obj = { type: 'scatter', name: team };
    obj['x'] = [];
    for (i=0; i<290; i++) obj['x'].push(i);
    obj['y'] = sum_data[team];

    sum.push(obj);
  }

  return sum;
}

$( () => {
  var svcs = [
    'rubix', 'quarter', 'internet3',
    'babysfirst', 'half', 'legitbbs', 'picturemgr', 'trackerd',
    'babyecho'
  ];

  var sum = sum_all(DATA, 1337);
  addGraph('ALL score', sum);

  sum = sum_all(DATA2, 0);
  addGraph('ALL point/round', sum);

  for(svc of svcs) {
    addGraph(svc + ' score', DATA[svc]);
    addGraph(svc + ' point/round', DATA2[svc]);
  }
})
