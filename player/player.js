module.exports.newPlayer = function(name){
	this.name = name;

	this.oxygenLevel = 100;
	this.temperature = 36.6;
	this.energyLevel = 100;

	this.x = 0;
	this.y = 0;

	this.rotation = 0;
	this.inventory = [];
}