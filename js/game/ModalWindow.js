class ModalWindow {

    constructor() {
        this.$modal = $('#gameModal');
        this.$modal.modal({
            show: false,
            keyboard: false,
            backdrop: 'static'
        });
        this.$modal.on('hidden.bs.modal', () => {
            this.$modal.find('.modal-body').empty();
        })
    }

    show(messageElement) {
        this.$modal.find('.modal-body').append(messageElement);
        this.$modal.modal('show');
    }

}