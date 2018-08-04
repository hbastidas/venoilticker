const Scraping = require('../lib/scraping');

// Define Class
function Mpetromin() {
  this.dates = undefined;
  this.db = [];
  //get petrocoin price for oil price
  this.scraping = new Scraping('http://www.minpet.gob.ve:81/visew/petro.php', '#fuente table');
}

Mpetromin.prototype.extractor = function(data) {

  console.log(data);
  var tempindex = "";

  for (var dt in data) {
    if (dt == 0) {
      this.dates = data[dt]
    } else {
      for (var dateindex in this.dates) {
        if (data[dt][dateindex] != "") {
          if (this.dates[dateindex] == "") {
            tempindex += data[dt][dateindex] + " ";
          } else {
            this.db.push({
              date: this.dates[dateindex],
              index: tempindex.trim(),
              value: data[dt][dateindex]
            })
          }
        }
      }
      tempindex = "";
    }
  }
  //secund order
  var tempdb = [];
  tempindex = "";
  for (var i = 0; i < this.db.length; i++) {
    if (typeof tempdb[this.db[i].index] == 'undefined') {
      tempdb[this.db[i].index] = [];
    } else {
      if (typeof tempdb[this.db[i].index][this.db[i].date] == 'undefined') {
        tempdb[this.db[i].index][this.db[i].date] = this.db[i].value;
      }
    }
  }
  this.db = tempdb;
}

Mpetromin.prototype.run = async function() {
    this.extractor(await this.scraping.get().catch(error =>{ throw error;}));
};

Mpetromin.prototype.getdata = function() {
  return this.db;
}

module.exports = Mpetromin;
