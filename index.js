let cheerio = require('cheerio');
let cheerioTableparser = require('cheerio-tableparser');
var request = require('request');

request('http://www.mpetromin.gob.ve/portalmenpet/secciones.php?option=view&idS=45', function (error, response, body) {
	let $ = cheerio.load(body);
	cheerioTableparser($);
	var content = $('#contenido table').parsetable();
	console.log(content);
});
