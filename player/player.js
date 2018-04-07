module.exports.newPlayer = function(name, id, token){
	this.name = name;

	this.oxygenLevel = 100;
	this.temperature = 36.6;
	this.energyLevel = 100;
	this.oxygen = 100;

	this.x = 0;
	this.y = 0;

	this.socket = id;
	this.token = token;

	this.rotation = 0;
	this.inventory = [];

	return this;
}