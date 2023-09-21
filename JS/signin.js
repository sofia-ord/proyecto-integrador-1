const registerForm = document.getElementById('register-form')
const nameInput = document.getElementById('name')
const lastNameInput = document.getElementById('lastName')
const emailInput = document.getElementById('email')
const passInput = document.getElementById('password')

const users = JSON.parse(localStorage.getItem('users')) || [];

const saveToLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users))
}

// chequear que el input esta vacio

const isEmpty = (input) =>{
    return !input.value.trim().length;
};

//determinar el largo del input (min y max de caracteres)

const isBetween = (input, min,max) =>{
    return input.value.length >= min && input.value.length <= max
}

// validar direccion de email

const isEmailValid = (input)=> {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim())
}

// chequear que el mail ingresado para registro no exista en el array de usarios
const isExistingEmail = (input)=> {
    return users.some((user)=>user.email === input.value.trim());
}

// chequear que la contraseña es segura

const isPasswordSecure = (input)=> {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return re.test(input.value.trim())
}

//Mostrar error
const showError = (input,message)=>{
    const formField = input.parentElement
    formField.classList.remove("success")
    formField.classList.add("error")
    const error = formField.querySelector("small")
    error.style.display = "block"
    error.textContent = message
}

const showSuccess = (input)=>{
    const formField = input.parentElement
    formField.classList.remove("error")
    formField.classList.add("succes")
    const error = formField.querySelector("small")
    error.textContent = ""
}

//validar input de tipo texto

const checkTextInput = (input)=>{
    let valid = false
    const minCharacters = 3
    const maxCharacters = 25

    if (isEmpty(input)) {
        showError(input, "Este campo es obligatorio")
        return;
    }

    if (!isBetween(input,minCharacters,maxCharacters)){
        showError(input, `Este campo debe tener entre ${minCharacters} y ${maxCharacters} caracteres`)
        return;
    }

    showSuccess(input)
    valid = true
    return valid;
}

//validar email

const checkEmail = (input)=> {
    let valid = false
    if(isEmpty(input)){
        showError(input, "El email es obligatorio")
        return;
    }
    if(!isEmailValid(input)){
        showError(input, "El email no es valido")
        return;
    }
    if(isExistingEmail(input)){
        showError(input, "El email ya se encuentra registrado")
        return;
    }
    showSuccess(input)
    valid = true
    return valid;
}

//validar contraseña

const checkPassword = (input)=> {
    let valid = false
    if(isEmpty(input)){
        showError(input, "La contraseña es obligatoria")
        return;
    }
    if(!isPasswordSecure(input)){
        showError(input, 'La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo')
        return;
    }
    showSuccess(input)
    valid = true
    return valid;
}

//Funcion general

const validateForm = (e)=>{
    e.preventDefault()
    //guardar el estado de los inputs
    let isNameValid = checkTextInput(nameInput);
    let isLastNameValid = checkTextInput(lastNameInput);
    let isEmailValid = checkEmail(emailInput);
    let isPasswordValid = checkPassword(passInput);

    let isValidForm = isNameValid && isLastNameValid && isEmailValid && isPasswordValid;

    if(isValidForm){
        users.push({
            name:nameInput.value,
            lastName:lastNameInput.value,
            email:emailInput.value,
            password:passInput.value
        })
        saveToLocalStorage(users)
        alert("Te has registrado con exito")
        window.location.href = "login.html"
    }
};

const init = ()=>{
    registerForm.addEventListener("submit",validateForm);
    nameInput.addEventListener("input",()=>checkTextInput(nameInput))
    lastNameInput.addEventListener("input",()=>checkTextInput(lastNameInput))
    emailInput.addEventListener("input",()=>checkEmail(emailInput))
    passInput.addEventListener("input",()=>checkTextInput(passInput))
}

init()
