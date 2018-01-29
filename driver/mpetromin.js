const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const axios = require('axios');

// Define Class
function Mpetromin() {
  this.dates = undefined;
  this.db = [];

  this.run();
}

Mpetromin.prototype.extractor = function(data) {
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

Mpetromin.prototype.run = function() {
    this.scraping();
};

Mpetromin.prototype.deamon = function() {
  self = this;
  setInterval(function() {
    self.run();
  }, 10000)
};

Mpetromin.prototype.scraping = async function(callback) {
  const mpetrominres = axios('http://www.mpetromin.gob.ve/portalmenpet/secciones.php?option=view&idS=45');
  const [response] = await Promise.all([mpetrominres]);
  let $ = cheerio.load(response.data);
  cheerioTableparser($);
  this.extractor($('#contenido table').parsetable(true, true, true));
};

Mpetromin.prototype.getdata = function() {
  return this.db;
}

module.exports = Mpetromin;
