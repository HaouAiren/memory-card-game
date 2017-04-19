class GameField {
    constructor(cardGame) {
        this.cardGame = cardGame;
        this.$playingField = $('.game-frame .row');
        this.deck = new Deck(cardGame.currentLevel.size);
    }

    prepare() {
        this.deck.shuffleCards();
    }

    layCards() {
        this.deck.cards.forEach((card)=>{
            this.$playingField.append(card.cardElement);
        });
    }

    onCardClick($cardElement) {
        let selectedCard = $cardElement.data('card');
        if (selectedCard.isShown) {
            return;
        }
        selectedCard.flip();
        if(this.deck.currentNumber !== selectedCard.number) {
            this.cardGame.lose(selectedCard);
        }
        if(this.deck.currentNumber === this.deck.cards.length){
            this.cardGame.win();
        }
        this.deck.currentNumber++;
    }

    clear() {
        this.$playingField.empty();
    }
}