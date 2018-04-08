module.exports.getCurrentBlockAndChank = function(x,y){
	var playerBlockNumberX = Math.floor(x/64);
	var playerBlockNumberY = Math.floor(y/64);

	// playerBlockNumberX = Math.abs(x) < 64? 1: playerBlockNumberX;
	// playerBlockNumberY = Math.abs(y) < 64? 1: playerBlockNumberY;

	var blockX = Math.floor(Math.abs(playerBlockNumberX) % 16);
	var blockY = Math.floor(Math.abs(playerBlockNumberY) % 16);

	var numberChunkX = null;
	var numberChunkY = null;

	if(x<=0){
		playerBlockNumberX--;
		blockX = 15 - blockX;
	}

	if(y>=0){
		blockY = 15 - blockY;
	}

	if(y<0){
		playerBlockNumberY--;
	}
// calc X
	if((playerBlockNumberX<=16 && playerBlockNumberX>0) || (x<64 && x>0)){
		numberChunkX = 0;
	}
	if(playerBlockNumberX<=32 && playerBlockNumberX>16){
		numberChunkX = 1;
	}
	if(playerBlockNumberX<=48 && playerBlockNumberX>32){
		numberChunkX = 2;
	}
	if(playerBlockNumberX<=64 && playerBlockNumberX>48){
		numberChunkX = 3;
	}
	if(playerBlockNumberX<=0 && playerBlockNumberX>-16){
		numberChunkX = numberChunkX!=null? numberChunkX: -1;
	}
	if(playerBlockNumberX<=-16 && playerBlockNumberX>-32){
		numberChunkX = -2;
	}
	if(playerBlockNumberX<=-32 && playerBlockNumberX>-48){
		numberChunkX = -3;
	}
	if(playerBlockNumberX<=-48 && playerBlockNumberX>-64){
		numberChunkX = -4;
	}
// calc Y
	if((playerBlockNumberY<=16 && playerBlockNumberY>0) || (y<64 && y>0)){
		numberChunkY = -1;
	}
	if(playerBlockNumberY<=32 && playerBlockNumberY>16){
		numberChunkY = -2;
	}
	if(playerBlockNumberY<=48 && playerBlockNumberY>32){
		numberChunkY = -3;
	}
	if(playerBlockNumberY<=64 && playerBlockNumberY>48){
		numberChunkY = -4;
	}
	if(playerBlockNumberY<=0 && playerBlockNumberY>-16){
		numberChunkY = numberChunkY!=null? numberChunkY: 0;
	}
	if(playerBlockNumberY<=-16 && playerBlockNumberY>-32){
		numberChunkY = 1;
	}
	if(playerBlockNumberY<=-32 && playerBlockNumberY>-48){
		numberChunkY = 2;
	}
	if(playerBlockNumberY<=-48 && playerBlockNumberY>-64){
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