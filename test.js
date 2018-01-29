// Required Modules
let Venoilticker = require('./index');
// Start Libribbit
let venoilticker = new Venoilticker();

setInterval(function(){
  let data = venoilticker.source['mpetromin'].getdata();
  if (Object.keys(data).length!=0) {
    console.log(data);
  }else {
    console.log("recibiendo datos....");
  }
}, 15000)
