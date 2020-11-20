class FormValidator {
    constructor(settings, formElement) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = formElement;
    }




    _showErrorMessage(input, validationMessage) {
        const error = this._form.querySelector('#' + input.id + '-error');
        input.classList.add(this._inputErrorClass);
        error.textContent = input.validationMessage;
        error.classList.add(this._errorClass);
    }




    _hideErrorMessage(input) {
        const error = this._form.querySelector('#' + input.id + '-error');
        input.classList.remove(this._inputErrorClass);
        error.textContent = '';
        error.classList.remove(this._errorClass);
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            _hideErrorMessage(input, this._form)
        } else {
            _showErrorMessage(input, this._form)
        }

    }

    _toggleButtonState(inputs, button) {

        const isValid = inputs.every((input) => input.validity.valid)
        if (isValid) {
            button.classList.remove(this._inactiveButtonClass);
        } else {
            button.classList.add(this._inactiveButtonClass);
        }

    }

    _setEventListeners() {
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));

        const button = this._form.querySelector(this._submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()

        })

        this._setEventListeners();
    }
}


export default FormValidator

//   enableValidation({
//     formSelector: ".form",
//     inputSelector: ".form__input",
//     submitButtonSelector: ".modal__save-button",
//     inactiveButtonClass: "modal__save-button_disabled",
//     inputErrorClass: "form__input_type_error",
//     errorClass: "form__error_visible"
// });