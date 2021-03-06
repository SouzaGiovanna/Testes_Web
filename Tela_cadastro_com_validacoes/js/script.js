class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate'
        ];
    }

    //iniciar a validação de todos os campos
    validate(form){
        //resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //transformo uma HTMLCollection -> array
        let inputsArray = [...inputs];

        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){
            //loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++){
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    //limpando a string para virar método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invocar o método
                    this[method](input, value);
                }
            }
        }, this);
    }
    //verifica se o input tem um número mínimo de caracteres
    minlength(input, minValue){
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se um input passou do limite de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.length;

        let errorMessage = `O campo pode ter no máximo ${maxValue} caracteres`;

        if(inputLength > maxValue){
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se o input é obrigatório
    required(input){
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = 'Esse campo é obrigatório';

            this.printMessage(input, errorMessage);
        }
    }

    //valida o formato do email
    emailvalidate(input){
        let regex = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = 'Insira um e-mail no padrão exemplo@email.com';

        if(!regex.test(email)){
            this.printMessage(input, errorMessage);
        }
    }

    //valida se o campo tem apenas letras
    onlyletters(input){
        let regex = /^[A-Za-z]+$/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if(!regex.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }

    //valida se dois campos são iguais
    equal(input, inputName){
        console.log("foi");
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa estar igual ao campo ${inputName}`;

        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }

    //valida campo de Senha
    passwordvalidate(input){
        let regex = /[A-Za-z\d@$!%*#?&]/;

        let errorMessage = `Sua senha precisa ter caracteres maiúsculos, minusculos, numéricos e especiais`;

        if(regex.test(input.value)){
            this.printMessage(input, errorMessage);
        }
    }

    //método para imprimir mensagens de erro na tela
    printMessage(input, msg){
        //quantidade de erros
        let errorsQtd = input.parentNode.querySelector('.error-validation');

        if(errorsQtd === null){
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
    }

    //limpa as validações da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//evento que dispara as Validações
submit.addEventListener('click', function(e){
    e.preventDefault();

    validator.validate(form);
});