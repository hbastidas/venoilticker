var Mpetromin = require('./driver/mpetromin');

function Venoilticker(){}

Venoilticker.prototype.source = {
	mpetromin: new Mpetromin()
};

module.exports = Venoilticker;
