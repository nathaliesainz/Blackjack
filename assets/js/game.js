/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

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

    // console.log(deck);
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

    console.log(deck);
    console.log(carta); // carta must be from the deck
    return carta;
}

//drawCard();
const cardValue = ( carta ) => {
    const value = carta.substring(0, carta.length - 1);
    return ( isNaN(value) ) ?
           ( value === 'A') ? 11 : 10
            : value * 1;
}

const value = cardValue( drawCard() );
console.log({value})