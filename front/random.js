// var ul = document.getElementById("lista");
// var arr = [0,0,0]
// var number = setInterval(random, 500);

fetch('http://localhost:3000/list')
.then((res)=>{
  console.log(res)
  return res.json()
})


// function random() {
//   var number = Math.floor((Math.random() * 3) + 1);
//   var li = document.createElement("li");
//   ul.appendChild(li);
//   li.append(number);
//
//   switch(number) {
//     case 1:
//       arr[0]++;
//     break;
//     case 2:
//       arr[1]++;
//     break;
//     case 3:
//       arr[2]++;
//     break;
//   }
//   console.log(arr);
// }
