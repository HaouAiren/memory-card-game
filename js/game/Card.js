class Card {

    constructor(number) {
        this.number = number;
        this.cardElement = $('.card-template').clone().removeClass('card-template');
        this.cardElement.data('card', this);
        this.front = this.cardElement.find('.card.front');
        this.front.find('.number').text(number);
        if(number >= 10){
            this.front.children('.number').css('margin', '0 12px');
        }
    }

    flip(){
        this.cardElement.toggleClass("flip");
    }

    faceDown() {
        this.cardElement.addClass('flip');
    }

    faceUp() {
        this.cardElement.removeClass('flip');
    }

    setStyle(cardStyle) {
        switch (cardStyle){
            case Card.STYLE_DIMMED_CARD:
                this.front.parent().css('background-color', 'grey');
                break;
            case Card.STYLE_WRONG_CARD:
                this.front.parent().css('background-color', 'red');
                break;
        }

    }

    get isShown() {
        return !this.cardElement.hasClass("flip");
    }
}

Card.STYLE_DIMMED_CARD = 'STYLE_DIMMED_CARD';
Card.STYLE_WRONG_CARD = 'STYLE_WRONG_CARD';
Card.STYLE_DEFAULT = 'STYLE_DEFAULT';