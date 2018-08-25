const Scraping = require('../lib/scraping');

// Define Class
function Mpetromin() {
  this.dates = undefined;
  this.db = [];
  //get petrocoin price for oil price
  this.scraping = new Scraping('http://www.minpet.gob.ve:81/visew/petro.php', '#fuente table');
}

Mpetromin.prototype.extractor = function(data) {
  let datacolumn=new Array
  data.forEach(element =>{
    if(element[0]!="" && element[(element.length)-1]!=""){
      datacolumn.push({
        key: element[0],
        value: element[(element.length)-1]
      })
    }
  });
  return datacolumn;
}

Mpetromin.prototype.run = async function() {
    this.db = this.extractor(await this.scraping.get(true,true,true).catch(error =>{ throw error;}));
    return this.db;
};

Mpetromin.prototype.getdata = function() {
  return this.db;
}

module.exports = Mpetromin;
