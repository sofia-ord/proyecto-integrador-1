//linkear html

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const errorMessage = document.getElementById('error__form');

const users = JSON.parse(localStorage.getItem('users') || []);

//setear en el sessionStorage
const saveToSessionStorage = (user) => {
    sessionStorage.setItem('activeUser', JSON.stringify(user));
}

//chequear que el input esta vacio
const isEmpty = (input) =>{
    return !input.value.trim().length;
};
// chequear que el mail ingresado exista
const isExistingEmail = (input) =>{
    return users.some((user)=>user.email === input.value.trim());
}

const showError = (message) => {
    errorMessage.textContent = message;
};

// recoger el usuario
const getUser = ()=> {
    return users.find((user) => user.email === emailInput.value.trim())
}

// chequear que la contraseña ingresada por input coincide con la registrada
const matchingPass = (input) =>{
    const user = getUser()
    return user.password === input.value.trim();
};
// validar el formulario de login
const isValidAccount =()=> {
    let valid = false;
    if (isEmpty(emailInput)) {
        showError('Por favor complete los campos');
        return;
    }
    if(!isExistingEmail(emailInput)){
        showError('El email ingresado es incorrecto')
        return;
    }

    if (isEmpty(passInput)){
        showError('Por favor complete los campos');
        return;
    }
    if(!matchingPass(passInput)){
        showError('Los datos ingresados son incorrectos')
        loginForm.reset()
        return;
    }

    alert('Ya estas en linea');
    valid = true;
    errorMessage.textContent = ''
    loginForm.reset()
    return valid;
};

const login = (e)=>{
    e.preventDefault()
    if(isValidAccount()){
        const user = getUser()
        saveToSessionStorage(user)
        window.location.href = "/pages/home.html"
    }
}

const init = () =>{
    loginForm.addEventListener("submit", login)
}

init()