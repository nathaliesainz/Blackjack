const myModule = (() => {
    'use strict';

    let deck       = [];
    const types    = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];


    // HTML references
    const drawBtn = document.querySelector('#drawBtn'),
          stopBtn = document.querySelector('#stopBtn'),
          newBtn  = document.querySelector('#newBtn');

    const playersCardsDiv = document.querySelectorAll('.divCards'),
          pointsHTML      = document.querySelectorAll('small');



    // Initializes the game
    const initializeGame = (playersNum = 2) => {
        deck = createDeck();
        playersPoints = [];
        for (let i = 0; i < playersNum; i++) {
            playersPoints.push(0);
        }
        
        pointsHTML.forEach(elem => elem.innerText = 0 );
        playersCardsDiv.forEach( elem => elem.innerHTML = '');

        drawBtn.disabled = false;
        stopBtn.disabled = false;
    }



    // This function creates a new deck
    const createDeck = () => {

        deck = [];
        for ( let i = 2; i <= 10; i++) {
            for ( let type of types ) {
                deck.push( i + type );
            }
            
        }

        for ( let type of types ) {
            for ( let special of specials ){
                deck.push( special + type );
            }
        }

        return deck = _.shuffle(deck);
    }


    // This function allows me to draw one card
    const drawCard = () => {

        if ( deck.length === 0 ) {
            throw 'There are no more cards in the deck';
        }
    
        return deck.pop();
    }

    // 
    const cardValue = ( carta ) => {
        const value = carta.substring(0, carta.length - 1);
        return ( isNaN(value) ) ?
            ( value === 'A') ? 11 : 10
                : value * 1;
    }

    // Turn: 0 = first player and the last one will be the computer
    const gatherPoints = ( carta, turn ) => {

        playersPoints[turn] = playersPoints[turn] + cardValue( carta );
        pointsHTML[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (carta, turn) => {
        const imgCard = document.createElement('img');
            imgCard.src = `assets/cards/${ carta }.png`;
            imgCard.classList.add('carta');
            playersCardsDiv[turn].append(imgCard);
    }

    const decideWinner = () => {

        const [ minimumPoints, computerPoints ] = playersPoints;

        setTimeout(() => {
            if (computerPoints === minimumPoints){
                alert('Draw');
            } else if (minimumPoints > 21) {
                alert('Computer won');
            } else if (computerPoints > 21){
                alert('You won');
            }else{
                alert('Computer won')
            }
        }, 100);
    }



    // Computers turn
    const computerTurn = (minimumPoints) => {
        let computerPoints = 0;

        do {
            const carta = drawCard();
            computerPoints = gatherPoints(carta, playersPoints.length - 1);
            createCard(carta, playersPoints.length - 1);

        } while ( (computerPoints < minimumPoints) && (minimumPoints <= 21) );

        decideWinner();
    }


    // Events
    drawBtn.addEventListener('click', () => {

        const carta = drawCard();
        const playerPoints = gatherPoints(carta, 0);

        createCard(carta, 0);

        if ( playerPoints > 21 ) {
            console.warn('You lose');
            drawBtn.disabled = true;
            stopBtn.disabled = true;
            computerTurn(playerPoints);

        } else if ( playerPoints === 21 ) {
            console.warn('21, cool!');
            drawBtn.disabled = true;
            stopBtn.disabled = true;
            computerTurn(playerPoints);
        }
    });

    stopBtn.addEventListener('click', () => {
        drawBtn.disabled = true;
        stopBtn.disabled = true;
        computerTurn(playersPoints[0]);
    });
    
    return {
        newGame: initializeGame
    };

})();