window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
  animationEnabled: true,
  theme: "light2", // "light1", "light2", "dark1", "dark2"
  title:{
    text: "Randomizer"
  },
  axisY: {
    title: "Cantidad de números"
  },
  data: [{
    type: "column",
    showInLegend: true,
    legendMarkerColor: "grey",
    legendText: "Números",
    dataPoints: [
      { y: 300878, label: "1" },
      { y: 266455,  label: "2" },
      { y: 169709,  label: "3" },

    ]
  }]
});
chart.render();

}
