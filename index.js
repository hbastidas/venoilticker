var Mpetromin = require('./driver/mpetromin');
var Inech = require('./driver/inecn');

function Venoilticker(){}

Venoilticker.prototype.source = {
	mpetromin: new Mpetromin(),
	inecn: new Inech()
};

module.exports = Venoilticker;
