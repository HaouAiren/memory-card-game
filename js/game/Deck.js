class Deck {

    constructor(cardsAmount) {
        this.cards = [];
        this.cardsAmount = cardsAmount;
        this.createCards();
    }

    createCards(){
        for(let i = 1; i < this.cardsAmount; i++) {
            this.cards.push(new Card(i));
        }
    }

    shuffleCards() {
        let temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        for (let i = this.cards.length - 1; i > 0; i--) {
            randomIndex = Math.floor(Math.random() * (i + 1));
            temporaryValue = this.cards[i];
            this.cards[i] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
        this.currentNumber = 1;
    }

    allCardsFaceDown () {
        this.cards.forEach((card)=>{
            card.faceDown();
        });
    }

    allCardsFaceUp () {
        this.cards.forEach((card)=>{
            card.faceUp();
        });
    }

}