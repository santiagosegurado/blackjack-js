
/* 
    Patron Modulo / 
    
    Es el Patro de disenio mas comun de JS, escompatible con todos 
    los navegadores.

    Nos permite encapsular el codigo ( queda en un contenedor privado ).

    Nadie va a poder manipular o llamar variables
*/

// Funcion autoinvocada
const miModulo = (()=> {
    // Evalua el codigo de manera estricta
    'use strict';

    /* Variables */
    let deck       = [];
    
    let tipos      = ['C', 'D', 'H', 'S'],
        especiales = [ 'A', 'J', 'Q', 'K' ];
        
    let puntosJugadores = []; 
    
    /*Referencias HTML */
    const btnPedir   = document.querySelector('#btnPedir'), 
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');
    
    const contadorPuntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');

   

    // Por defecto el numero de jugadores va a ser 1
    const inicializarJuego = (numJugadores = 2) => {
        
        deck = crearDeck();

        /* 
            Por cada jugadores va haber un lugar mas en el 
            array de puntos inicializado con 0 puntos pero el CPU 
            siempre va a ser el ultimo jugador
        */
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            
            puntosJugadores.push(0);
        }

        contadorPuntosHTML.forEach(element => {
            element.innerText = 0
        });

        divCartasJugadores.forEach(element => {
            element.innerHTML = ' ';
        })

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }
    
    /* Creacion del Deck  */
    const crearDeck = () => {
        
        // Reinicializo el deck, sino se queda guardado el deck anterior
        deck = [];
        

        /* Agrego las cartas comunes (1,2,3...) */
        for (let i = 2; i <= 10; i++) {
        
            for (let j = 0; j < tipos.length; j++) {
                
                deck.push(i + tipos[j]);
            }
        }
        
        /* Agrego las cartas especiales (A,J..) */
        for (const especial of especiales) {
            
            for (const tipo of tipos) {
                
                deck.push(especial + tipo);
            }
        }
    
        /* Desordenar Deck*/
        return  _.shuffle(deck);
    }
    
    
    
    
    /* Pedir Carta */
    const pedirCarta = () =>{
    
        /* si hay 0 cartas manda error */
        if (deck.length === 0) {
            
            throw 'No hay mas cartas en el Deck'
        
        } else {
            
            /* 
                la variable carta contiene la carta pedida aleatoria y 
                pop() la extrae del deck.
            */
            // Luego retorno la carta
            return deck.pop();;
        }
    
    }
    
    
    /* Valor de las Cartas */
    // Obtiene el valor de la carta
    const valorCarta = (carta) =>{
        /*
            El substring() separa al string en partes idicando 
            de donde hasta donde tiene que ser separado
        */
        // Separamos el numero para obtener el valor de la carta
        const valor = carta.substring(0, carta.length - 1);
        
        
        /* 
            Retorno el Valor de la Carta, si es un Az devuelvo 11 
            si es otra letra devuelvo 10, si es un numero devuelvo el valor string
            multiplicado por 1 para que se haga numero
        */
        //isNaN devuelve un booleano para saber si no es un numero
        return ( 
                    isNaN(valor) ? ( valor === 'A' ) ? 11 : 10 
                                 : valor * 1
                )
    }
    
    // Turno: 0 = Primer Jugador / El ultimo sera la CPU
    const acumularPuntos = (carta, turno ) => {
        
        // Va a acumular puntos en la posicion que le pase por parametro
        puntosJugadores[turno] += valorCarta(carta);
        
        /* Agrego los Puntos del jugador al contador en el HTML */
        contadorPuntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

            const imgCarta = document.createElement("img");
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);

    }

    /* Turno del CPU IA */
    const turnoCPU = (puntosMinimos) =>{
        
        let puntosCPU = 0;

        do {
            
            const carta = pedirCarta();
            
            /* 
                puntosJugadores.length es la cantidad de jugadores y
                le resto 1 porque es la posicion del CPU 
                (La ultima posicion)
            */
            puntosCPU = acumularPuntos(carta, puntosJugadores.length - 1);
            
            crearCarta(carta, puntosJugadores.length - 1);

    
        } while((puntosMinimos >= puntosCPU) 
                    && (puntosMinimos <=21));
    
        setTimeout(() => {
    
            (puntosMinimos === puntosCPU ) 
            ? alert(" EMPATE ") 
            : (puntosMinimos > 21) ? alert("CPU GANA :(") 
                                   : alert(" JUGADOR1 GANA ;)")
            
        }, 500);
    }
    
    
    /* Eventos */
    /* 
        Primer agurmento es que evento voy a escuchar y 
        el segundo un callback (Una funcion que se pasa como parametro de otra)
        donde voy a ejecutar algun codigo
    */
    btnPedir.addEventListener('click', ()=>{
        
        
        let carta = pedirCarta();
        
        const puntosJugador = acumularPuntos(carta, 0)
        
        crearCarta(carta, 0);
        
    
        //Desabilita el btn
        if (puntosJugador > 21) {
            
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            
            turnoCPU(puntosJugador);
            
        
        }else if (puntosJugador === 21) {
            
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            
            turnoCPU(puntosJugador);
    
            
        }
    
    })
    
    
    /* Detener turno Jugador */
    btnDetener.addEventListener('click', ()=>{
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        turnoCPU(puntosJugadores[0]);
                                     
    })
    
    
    /* Nuevo Juego */
    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego(); 

    });


    // En el Patron Modulo todo va a ser privado menos lo que le pase en el return 
    return {
        nuevoJuego: inicializarJuego
    }

})();


