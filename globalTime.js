//initial time
var serverMinute = 0;
var serverHour = 0;
var gameSoul = 1;

function incrementMinute(){
	if(serverMinute == 59){
		serverMinute = 0;
		incrementHour();
	} else {
		serverMinute++;
	}
}

function incrementHour(){
	if(serverHour == 23){
		gameSoul++;
		serverHour = 0;
	} else {
		serverHour++;
	}
}

function setTime(){
	incrementMinute()
	//current server Date&Time
	global.currentDateTime = gameSoul + " soul. " + serverHour + ":" + serverMinute;
	// console.log(global.currentDateTime)
}

setTime();
var speedTime = 500; //1000 - 1сек
setInterval(setTime, speedTime);