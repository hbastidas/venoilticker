// Required Modules
let Venoilticker = require('./index');
// Start Libribbit
let venoilticker = new Venoilticker();

//running webscraping
let running=setInterval(function(){
  venoilticker.source['mpetromin'].run().catch(error=>{
    clearInterval(running);
    console.log(error)
  })

  let data = venoilticker.source['mpetromin'].getdata();
  if (Object.keys(data).length!=0) {
    console.log(data);
  }else {
    console.log("recibiendo datos....");
  }

}, 15000)
