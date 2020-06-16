var Inech = require('./driver/inecn');

function Venoilticker(){}

Venoilticker.prototype.source = {
	inecn: new Inech()
};

module.exports = Venoilticker;
