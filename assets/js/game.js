let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
    computerPoints = 0;

// HTML references
const drawBtn = document.querySelector('#drawBtn');
const stopBtn = document.querySelector('#stopBtn');
const newBtn = document.querySelector('#newBtn');

const playerCardsDiv = document.querySelector('#player-cards');
const computerCardsDiv = document.querySelector('#computer-cards');

const pointsHTML = document.querySelectorAll('small');

// This function creates a new deck
const createDeck = () => {

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

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

createDeck();

// This function allows me to draw one card
const drawCard = () => {

    if ( deck.length === 0 ) {
        throw 'There are no more cards in the deck';
    }
    const carta = deck.pop();

    return carta;
}

//drawCard();
const cardValue = ( carta ) => {
    const value = carta.substring(0, carta.length - 1);
    return ( isNaN(value) ) ?
           ( value === 'A') ? 11 : 10
            : value * 1;
}


// Computers turn
const computerTurn = (minimumPoints) => {

    do {
        const carta = drawCard();
        
        computerPoints = computerPoints + cardValue( carta );
        pointsHTML[1].innerText = computerPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${ carta }.png`;
        imgCard.classList.add('carta');
        computerCardsDiv.append(imgCard)

        if (minimumPoints > 21) {
            break;
        }

    } while ( (computerPoints < minimumPoints) && (minimumPoints <= 21) );

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


// Events
drawBtn.addEventListener('click', () => {

    const carta = drawCard();
    
    playerPoints = playerPoints + cardValue( carta );
    pointsHTML[0].innerText = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${ carta }.png`;
    imgCard.classList.add('carta');
    playerCardsDiv.append(imgCard)

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
    computerTurn(playerPoints);
});

newBtn.addEventListener('click', () => {
    deck = [];
    deck = createDeck();
    
    playerPoints = 0;
    computerPoints = 0;
    
    pointsHTML[0].innerText = 0;
    pointsHTML[1].innerText = 0;
    
    computerCardsDiv.innerHTML = '';
    playerCardsDiv.innerHTML = '';

    drawBtn.disabled = false;
    stopBtn.disabled = false;
})