class MemoryCardGame {
    constructor() {
        this.levels = {};
        this.initializeLevels();
        this.resultsWindow = new ModalWindow();
        this.status = MemoryCardGame.STATUS_PLAYER_WAITING;
    }

    initializeLevels() {
        let levels = this.levels;
        $.ajax({
            url: 'js/game/data/levels.json',
            dataType: 'json',
            success(data) {
                $.each(data, (index, value) => {
                    levels[value.levelName] = value;
                });
            }
        });
    }

    newGame(levelName) {
        this.status = MemoryCardGame.STATUS_NOT_STARTED;
        this.currentLevel = this.levels[levelName] || this.currentLevel;
        this.gameField = new GameField(this);
        this.gameField.deck.cards.forEach((card) => {
            card.front.parent().css('background-color', 'white');
        });
        this.gameField.prepare();
        this.gameField.layCards();
        this.start();
    }

    start() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(this.status === MemoryCardGame.STATUS_SUSPENDED){
                    return reject('Ошибочка вышла. Ждем возвращения на страницу с игрой.');
                }
                this.gameField.deck.allCardsFaceDown();
                this.gameField.$playingField.on('click.checkCard', '.card-element', (event) => {
                    this.gameField.onCardClick($(event.currentTarget));
                });
                this.status = MemoryCardGame.STATUS_PLAYING;
                resolve();
            }, this.currentLevel.delay);

        }).catch((reject) => {
            this.gameField.deck.allCardsFaceUp();
            console.log(reject);
        });
    }

    finish() {
        this.gameField.clear();
    }

    lose(card) {
        card.front.parent().css('background-color', 'red');
        let $message = $(document.createDocumentFragment());
        this.flipUnrevealedCards()
            .then(() => this.showResultModal($message))
            .then(() => {/* some action */});

        this.gameField.$playingField.off('click.checkCard');
        $('<p>')
            .text('You lost.')
            .appendTo($message);
        $('<p>')
            .text('Wanna try again?')
            .appendTo($message);
    }

    win() {
        let randomImg = Math.round(Math.random() * 2 + 1);
        let $message = $(document.createDocumentFragment());
        this.showResultModal($message);

        $('<p>')
            .text('Congratulations! You won!')
            .appendTo($message);
        $('<img>')
            .attr('src', `img/fireworks/${randomImg}.gif`)
            .css('display', 'block')
            .css('width', '567px')
            .appendTo($message);
        this.gameField.$playingField.off('click.checkCard');

    }

    flipUnrevealedCards () {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.gameField.deck.cards
                    .filter(card => !card.isShown)
                    .forEach((card) => {
                        card.setStyle(Card.STYLE_DIMMED_CARD);
                        card.flip();
                    });
                resolve();
            },600);
        });
    }

    showResultModal($messageDocumentFragment) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.resultsWindow.show($messageDocumentFragment);
                this.status = MemoryCardGame.STATUS_FINISHED;
                resolve();
            }, 1000);
        });
    }

}

MemoryCardGame.STATUS_PLAYER_WAITING = 'PLAYER WAITING';
MemoryCardGame.STATUS_NOT_STARTED = 'NOT STARTED';
MemoryCardGame.STATUS_PLAYING = 'PLAYING';
MemoryCardGame.STATUS_FINISHED = 'FINISHED';
MemoryCardGame.STATUS_SUSPENDED = 'STATUS_SUSPENDED';