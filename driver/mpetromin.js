const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const axios = require('axios');

// Define Class
function Mpetromin() {
  this.content=undefined;
   this.dates=undefined;
   this.db=[]
   self=this;
   setInterval(function(){
     self.run();
     if (self.content!=undefined) {
      self.extractor(self.content)
     }
   }, 5000)
}

//algoritm for order data
Mpetromin.prototype.extractor = function (data){
  var tempindex="";
  this.db=[];

  for (var dt in data) {
    if (dt==0) {
        this.dates=data[dt]
    }else{
      for (var dateindex in this.dates) {
        if(data[dt][dateindex]!=""){
            if (this.dates[dateindex]=="") {
              tempindex+=data[dt][dateindex]+" ";
            }else {
              this.db.push({date: this.dates[dateindex], index: tempindex.trim(), value: data[dt][dateindex]})
            }
        }
      }
      tempindex="";
    }
  }
  console.log(this.db);
}

Mpetromin.prototype.run = async function () {
  const mpetrominres = axios('http://www.mpetromin.gob.ve/portalmenpet/secciones.php?option=view&idS=45');
  const [response] = await Promise.all([mpetrominres]);
  let $ = cheerio.load(response.data);
  cheerioTableparser($);
  this.content=$('#contenido table').parsetable(true, true, true)
};

Mpetromin.prototype.getdata = function(){
  return this.db;
}

module.exports = Mpetromin;
