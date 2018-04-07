//возвращает объект карты
function createMapObject(min, max){
	var mapObj = {
		type:1,
		texture: getTexture(min, max)
	}
	return mapObj;
}

//возвращает объект на карте
function createObject(min, max){
	var mapObj = {
		type:1,
		texture: getTexture(min, max)
	}
	return mapObj;
}

//задаёт минимальный размер чанка
var chankSize = {
		x:15,
		y:15
	};

//создаёт массив карты
function createMap(){
	//диапазон id у ландшафта
	var min = 0;
	var max = 3;
	var chankMapArray = [[]];
	// console.log("create land map");
	fillChankArray(chankMapArray, 0, min, max);

	return chankMapArray;
}

//создаёт массив карты объектов
function createObjMap(){
	//диапазаон id у объектов
	var min = 4;
	var max = 6;
	var chankMapArray = [];
	// console.log("create map for objects");
	fillChankArray(chankMapArray, 1, min, max);

	return chankMapArray;
}

//заполняем карту
//flag - какую инициализацию карт использовать
//1-ландшафтная карта
//2-объектная карта
//3-карта с игроком
function fillChankArray(chankMapArray, flag, min, max){
	for (var x = 0; x <= chankSize.x; x++) {
		chankMapArray[x] = [];
		for (var y = 0; y <= chankSize.y; y++){
			switch(flag){
				case 0:
				 	chankMapArray[x][y] = createMapObject(min, max);
				 	// console.log(chankMapArray[x][y]);
				 	break;
				case 1:
				 	chankMapArray[x][y] = createObject(min, max);
					break;
			}
		}
	}
}

//возвращает рандомную текстуру в выбранном диапазоне
function getTexture(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);

    return Math.abs(rand);
}

function createChank(x, y){
	var chank = {
		x:x,
		y:y,
		map: createMap(),
		obj: createObjMap()
	}

	return chank;
}

module.exports.generateMap = function(){
	var map = [];



	for (var x = -4; x < 4; x++) {

		for(var y = -4; y < 4; y++){
			map.push(createChank(x,y));
			// console.log(map[x][y]);
		}
		// console.log(map[x]);
	}

	return map;
}