// var number = setInterval(random, 500);
var arr = []
var chart;
var lista=document.getElementById("lista")
setInterval(()=>{
arr = [];
fetch('http://localhost:3000/list')
.then((res)=>{
  console.log(res)
  return res.json()
}).then ((json)=>{
  console.log(json);
  var ultimo = json[json.length-1]
  var li=document.createElement('li')
  var label= document.createElement('label')
  label.append("Fecha: " + ultimo.fecha + " Numero: " + ultimo.numero)
  li.append(label);
  // lista.appendChild(li);
  lista.insertBefore(li,lista.firstChild);
  json.forEach((element)=>{
    arr[element.numero] = arr[element.numero] ? arr[element.numero] + 1 : 1;
  });
  console.log (arr)
  for (var i = 0; i < arr.length; i++) {
    chart.options.data[0].dataPoints[i].y = arr[i];
    chart.render();
  }
});
},800);


window.onload = function () {

chart = new CanvasJS.Chart("chartContainer", {
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
      { y: 0,  label: "0" },
      { y: 0,  label: "1" },
      { y: 0,  label: "2" },

    ]
  }]
});

chart.render();


}
