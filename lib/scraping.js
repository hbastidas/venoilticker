const cheerio = require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const axios = require('axios');

function Scraping(url, selector) {
  this.url=url;
  this.selector=selector;
}

Scraping.prototype.get = async function(dupCols, dupRows, textMode) {
  self = this;
  const responseaxios = axios(this.url);
  const [response] = await Promise.all([responseaxios]).catch(error => {
    throw error.response.status + " in "+ this.url
  });

  let $ = cheerio.load(response.data);
  cheerioTableparser($);
  return $(this.selector).parsetable(dupCols, dupRows, textMode);
};

module.exports = Scraping;
