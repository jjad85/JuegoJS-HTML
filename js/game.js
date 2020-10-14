var btnJuego = document.getElementById('btnJuego');
var btnParametros = document.getElementById('btnParametros');
var numCaras = document.getElementById('numCaras');
var numDados = document.getElementById('numDados');
var formWin = document.getElementById('formWin');
var divJuego = document.getElementById('divJugadores');
var nomJugador1 = document.getElementById('nomJugador1');
var nomJugador2 = document.getElementById('nomJugador2');
var nomJugador3 = document.getElementById('nomJugador3');
var nomJugador4 = document.getElementById('nomJugador4');
var txtPlay1Lan1 = document.getElementById('txtP1Lanza1');
var txtPlay1Lan2 = document.getElementById('txtP1Lanza2');
var txtPlay1Lan3 = document.getElementById('txtP1Lanza3');
var txtPlay1Lant = document.getElementById('txtP1Lanzat');
var txtPlay2Lan1 = document.getElementById('txtP2Lanza1');
var txtPlay2Lan2 = document.getElementById('txtP2Lanza2');
var txtPlay2Lan3 = document.getElementById('txtP2Lanza3');
var txtPlay2Lant = document.getElementById('txtP2Lanzat');
var txtPlay3Lan1 = document.getElementById('txtP3Lanza1');
var txtPlay3Lan2 = document.getElementById('txtP3Lanza2');
var txtPlay3Lan3 = document.getElementById('txtP3Lanza3');
var txtPlay3Lant = document.getElementById('txtP3Lanzat');
var txtPlay4Lan1 = document.getElementById('txtP4Lanza1');
var txtPlay4Lan2 = document.getElementById('txtP4Lanza2');
var txtPlay4Lan3 = document.getElementById('txtP4Lanza3');
var txtPlay4Lant = document.getElementById('txtP4Lanzat');
var txtGanador = document.getElementById('txtGanador');
var caras = document.getElementById('caras');
var dados = document.getElementById('dados');

addEventListener('load',inicio,false);

function inicio(){
	numCaras.addEventListener('change',cambioCaras,false);
	numDados.addEventListener('change',cambioDados,false);
}

function cambioCaras(){    
	caras.innerHTML=numCaras.value;
}
function cambioDados(){    
	dados.innerHTML=numDados.value;
}

btnParametros.onclick = function() {
	if(divJuego.style.visibility == "hidden"){
		divJuego.style.visibility = "visible";
		desParametros(true);
		game = new Game();
		btnJuego.innerText = "Lanzar";
	} else {
		divJuego.style.visibility = "hidden";
	}
};

function desParametros(blnPresentacion){
	btnParametros.disabled = blnPresentacion;
	numCaras.disabled = blnPresentacion;
	numDados.disabled = blnPresentacion;
	formWin.disabled = blnPresentacion;
}

function pintarResultados(indLanza1, indLanza2, indLanza3, indLanzaT, jugador){
	indLanza1.innerHTML = jugador.valLanza1;
	indLanza2.innerHTML = jugador.valLanza2;
	indLanza3.innerHTML = jugador.valLanza3;
	indLanzaT.innerHTML = jugador.valLanzaT;
}

function inicilizarJugador(txtL1, txtL2, txtL3, txtLT, jugador){
	if(jugador.empate == false){
		jugador.limpiarLanzamientos();
		pintarResultados(txtL1, txtL2, txtL3, txtLT, jugador);
	}else{
		jugador.registrarLanzamiento();
	}
}

btnJuego.onclick = function() {
	var indNombre=0, nomPlayer1,nomPlayer2,nomPlayer3,nomPlayer4;
	if (! nomJugador1.value == ""){
		nomPlayer1=nomJugador1.value;
		indNombre++;
	} 
	if (! nomJugador2.value == "") {
		nomPlayer2=nomJugador2.value;
		indNombre++;
	} 
	if (! nomJugador3.value == "") {
		nomPlayer3=nomJugador3.value;
		indNombre++;
	} 
	if (! nomJugador4.value == "") {
		nomPlayer4=nomJugador4.value;
		indNombre++;
	}
	if (indNombre == 4){
		jugador1 = new Jugador(numCaras.value, numDados.value, formWin.value, nomPlayer1, 1);
		jugador2 = new Jugador(numCaras.value, numDados.value, formWin.value, nomPlayer2, 2);
		jugador3 = new Jugador(numCaras.value, numDados.value, formWin.value, nomPlayer3, 3);
		jugador4 = new Jugador(numCaras.value, numDados.value, formWin.value, nomPlayer4, 4);
		jugador1.registrarLanzamiento();
		jugador2.registrarLanzamiento();
		jugador3.registrarLanzamiento();
		jugador4.registrarLanzamiento();
		pintarResultados(txtPlay1Lan1, txtPlay1Lan2, txtPlay1Lan3, txtPlay1Lant, jugador1);
		pintarResultados(txtPlay2Lan1, txtPlay2Lan2, txtPlay2Lan3, txtPlay2Lant, jugador2);
		pintarResultados(txtPlay3Lan1, txtPlay3Lan2, txtPlay3Lan3, txtPlay3Lant, jugador3);
		pintarResultados(txtPlay4Lan1, txtPlay4Lan2, txtPlay4Lan3, txtPlay4Lant, jugador4);
		game = new Game();
		jugadorWin = game.obtenerGanador(jugador1, jugador2, jugador3, jugador4, 4);
		if (jugadorWin == true){
			txtGanador.innerHTML = game.nameWin;
			desParametros(false);
			btnJuego.innerHTML="Lanzar";
		}else{
			btnJuego.innerHTML="Desempatar";
			desParametros(true);
			alert("empate");
			console.log("Jugadores empatados: " + game.numPlayerEmp);
			var winDefinido=false;
			while (winDefinido == false){
				inicilizarJugador(txtPlay1Lan1, txtPlay1Lan2, txtPlay1Lan3, txtPlay1Lant, jugador1);
				inicilizarJugador(txtPlay2Lan1, txtPlay2Lan2, txtPlay2Lan3, txtPlay2Lant, jugador2);
				inicilizarJugador(txtPlay3Lan1, txtPlay3Lan2, txtPlay3Lan3, txtPlay3Lant, jugador3);
				inicilizarJugador(txtPlay4Lan1, txtPlay4Lan2, txtPlay4Lan3, txtPlay4Lant, jugador4);
				console.log("va a llamar a obtenerganador");
				winDefinido = game.obtenerGanador(jugador1, jugador2, jugador3, jugador4, game.numPlayerEmp);
				console.log("llamo a obtenerganador");
				winDefinido = true;
			}
		}
	}else{
		alert("Falta ingresar nombres de jugadores");
	}
};

class Game {
	constructor(numCaras, numDados, formWin) {
		this.partida = {
			numCaras,
			numDados,
			formWin
		};
		this.nameWin = "";
		this.puntaje = 0;
		this.numPlayerEmp=0;
	}

	lanzamiento() {
		var lan = Math.round(Math.random(this.partida.numCaras)*(this.partida.numCaras-1)+1);
		return lan;
	};

	obtenerGanador(jugador1, jugador2, jugador3, jugador4, numPlayers){
		let result = [jugador1, jugador2, jugador3, jugador4];
		var blnEmpate=false, numEmpate=0;
		let empatados = [];
		if (jugador1.partida.formWin == "1"){
			result.sort(function(a, b){return b.valLanzaT-a.valLanzaT});
		}else{
			result.sort(function(a, b){return a.valLanzaT-b.valLanzaT});
		}
		for (var x=1;x<=numPlayers-1;x++){
			if (result[0].valLanzaT == result[x].valLanzaT){
				blnEmpate=true;
				result[x].empate=true;
				empatados.push(result[x]);
				numEmpate++;
			}
		}
		if(blnEmpate == true){
			numEmpate++;
			result[0].empate=true;
			this.numPlayerEmp=numEmpate;
			empatados.push(result[0]);
			return false;
		}else{
			numEmpate++;
			console.log("ganador definido");
			this.nameWin=result[0].nombre;
			this.puntaje=result[0].indLanzaT;
			return true;
		}
	};

	desempate(jugador1, jugador2, jugador3, jugador4){
		if(jugador1.empate == true){
			jugador1.registrarLanzamiento();
			pintarResultados(txtPlay1Lan1, txtPlay1Lan2, txtPlay1Lan3, txtPlay1Lant, jugador1);
		}
		if (jugador2.empate == true){
			jugador2.registrarLanzamiento();
			pintarResultados(txtPlay2Lan1, txtPlay2Lan2, txtPlay2Lan3, txtPlay2Lant, jugador2);
		}
		if (jugador3.empate == true){
			jugador3.registrarLanzamiento();
			pintarResultados(txtPlay3Lan1, txtPlay3Lan2, txtPlay3Lan3, txtPlay3Lant, jugador3);
		}
		if (jugador4.empate == true){
			jugador4.registrarLanzamiento();
			pintarResultados(txtPlay4Lan1, txtPlay4Lan2, txtPlay4Lan3, txtPlay4Lant, jugador4);
		}
	}
};

class Jugador extends Game {
	constructor(numCaras, numDados, formWin, nombre, numJugador){
		super(numCaras, numDados, formWin);
		this.nombre = nombre;
		this.valLanza1=0;
		this.valLanza2=0;
		this.valLanza3=0;
		this.valLanzaT=0;
		this.empate=false;
		this.numJugador=numJugador;
	};

	registrarLanzamiento() {
		var totLanza=0, valLan=0;
		valLan=this.lanzamiento();
		this.valLanza1=valLan;
		totLanza+=valLan;
		switch (this.partida.numDados) {
			case "2":
				valLan=this.lanzamiento();
				this.valLanza2=valLan;
				totLanza+=valLan;
				break;
			case "3":
				valLan=this.lanzamiento();
				this.valLanza2=valLan;
				totLanza+=valLan;
				valLan=this.lanzamiento();
				this.valLanza3=valLan;
				totLanza+=valLan;
		}
		this.valLanzaT=totLanza;
	};

	limpiarLanzamientos(){
		this.valLanza1=0;
		this.valLanza2=0;
		this.valLanza3=0;
		this.valLanzaT=0;
		this.empate=false;
	}
};