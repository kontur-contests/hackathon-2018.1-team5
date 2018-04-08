module.exports.getCurrentBlockAndChank = function(x,y){
	var playerBlockNumberX = Math.floor(Math.abs(x)/64);
	var playerBlockNumberY = Math.floor(Math.abs(y)/64);

	// playerBlockNumberX = Math.abs(x) < 64? 1: playerBlockNumberX;
	// playerBlockNumberY = Math.abs(y) < 64? 1: playerBlockNumberY;

	var blockX = Math.abs(playerBlockNumberX) % 16;
	var blockY = Math.abs(playerBlockNumberY) % 16;

	if (y > 0) {
		blockY = 15 - blockY;
	}

	if (x < 0) {
		blockX = 15 - blockX;
	}
	var numberChunkX = null;
	var numberChunkY = null;

	// if(x<=0){
	// 	playerBlockNumberX--;
	// 	blockX = 15 - blockX;
	// }

	// if(y<0){
	// 	blockY = 15 - blockY;
	// 	playerBlockNumberY++;
	// }
// calc X
	if(playerBlockNumberX<=16 && playerBlockNumberX>0 && x>0){
	// if((playerBlockNumberX<=16 && playerBlockNumberX>0) || (x<64 && x>0)){
		numberChunkX = 0;
	}
	if(playerBlockNumberX<=32 && playerBlockNumberX>16 && x>0){
		numberChunkX = 1;
	}
	if(playerBlockNumberX<=48 && playerBlockNumberX>32 && x>0){
		numberChunkX = 2;
	}
	if(playerBlockNumberX<=64 && playerBlockNumberX>48 && x>0){
		numberChunkX = 3;
	}
	if(playerBlockNumberX<=16 && playerBlockNumberX>0 && x<=0){
		numberChunkX = -1;
	}
	if(playerBlockNumberX>16 && playerBlockNumberX<=32 && x<0){
		numberChunkX = -2;
	}
	if(playerBlockNumberX<=48 && playerBlockNumberX>32 && x<0){
		numberChunkX = -3;
	}
	if(playerBlockNumberX<=64 && playerBlockNumberX>48 && x<0){
		numberChunkX = -4;
	}
// calc Y
	if((playerBlockNumberY<=16 && playerBlockNumberY>0) && (y>=0)){
		numberChunkY = -1;
	}
	if(playerBlockNumberY<=32 && playerBlockNumberY>16 && (y>0)){
		numberChunkY = -2;
	}
	if(playerBlockNumberY<=48 && playerBlockNumberY>32 && (y>0)){
		numberChunkY = -3;
	}
	if(playerBlockNumberY<=64 && playerBlockNumberY>48 && (y>0)){
		numberChunkY = -4;
	}
	if((playerBlockNumberY<16 && playerBlockNumberY>=0) && (y<0)){
		numberChunkY = 0;
	}
	if(playerBlockNumberY<32 && playerBlockNumberY>=16 && (y<0)){
		numberChunkY = 1;
	}
	if(playerBlockNumberY<48 && playerBlockNumberY>=32 && (y<0)){
		numberChunkY = 2;
	}
	if(playerBlockNumberY<64 && playerBlockNumberY>=48 && (y<0)){
		numberChunkY = 3;
	}

	var result = {
		chunkX: numberChunkX,
		chunkY: numberChunkY,
		blockX: blockX,
		blockY: blockY
	};

	// console.log("chunkX: ",numberChunkX);
	// console.log("chunkY: ",numberChunkY);
	// console.log("blockX: ",blockX);
	// console.log("blockY: ",blockY);

	return result;
}

// module.exports.getCurrentBlockAndChank(0,0);