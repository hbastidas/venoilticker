// Required Modules
let Venoilticker = require('./index');
// Start Libribbit
let venoilticker = new Venoilticker();

//running webscraping
  venoilticker.source['mpetromin'].run().catch(error=>{
    console.log(error)
  }).then(data=>{
      console.log(data);
  })
