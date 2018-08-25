const Scraping = require('../lib/scraping');

// Define Class
function Inech() {
  this.dates = undefined;
  this.db = [];
  //get petrocoin price for oil price
  this.scraping = new Scraping('http://www.ine.cn/en/statements/delaymarket_sc_en.html', 'table');
}

Inech.prototype.extractor = function(data) {
  return data[1][2];
}

Inech.prototype.run = async function() {
    this.db = this.extractor(await this.scraping.get(true,true,true).catch(error =>{ throw error;}));
    return this.db;
};

Inech.prototype.getdata = function() {
  return this.db;
}

module.exports = Inech;
