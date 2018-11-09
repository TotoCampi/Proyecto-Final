// var number = setInterval(random, 500);
var arr = []
var lista=document.getElementById("lista")
setInterval(()=>{

fetch('http://localhost:3000/list')
.then((res)=>{
  console.log(res)
  return res.json()
}).then ((json)=>{
  console.log(json);
  json.forEach((element)=>{
    var li=document.createElement('li')
    var label= document.createElement('label')
    label.append("Fecha: " + element.fecha + " Numero: " + element.numero)
    li.append(label);
    lista.appendChild(li);
    //arr[element.number-1]++;
  });
});
},800);

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
