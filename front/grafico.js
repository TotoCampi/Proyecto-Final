var ul = document.getElementById("lista");
var arr = [0,0,0]

fetch("http://localhost:3000/list")
.then((res) => {
console.log(res);
return res.json()
}).then((json) => {
console.log(json)
json.forEach((data) => {
  var number = data.numero
  var li = document.createElement("li");
  ul.appendChild(li);
  li.append(number);

  for (var i = 0; i < arr.length; i++) {
  }
  // switch(number) {
  //   case 1:
  //     arr[0]++;
  //   break;
  //   case 2:
  //     arr[1]++;
  //   break;
  //   case 3:
  //     arr[2]++;
  //   break;
  // }
  console.log(arr);
});
});

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
      { y: arr[0], label: "1" },
      { y: arr[1],  label: "2" },
      { y: arr[2],  label: "3" },

    ]
  }]
});
chart.render();

}
