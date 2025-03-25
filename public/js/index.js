// Configurar o Bootstrap Modal corretamente
const myModal = new bootstrap.Modal(document.getElementById("register-modal"));
let logged = sessionStorage.getItem("logged");
const session= localStorage.getItem("session");

checkLogged();


//logar no sistema
document.getElementById("login-form").addEventListener("submit",function(e){
    e.preventDefault();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checksession = document.getElementById("session-check").checked;

    const account  = getAccount(email);

    if(!account){
      alert("Opps! verifique o usuario ou a senha ");
      return;
    }

    if(account){
        if(account.password !== password){
        alert("Opps! verifique o usuario ou a senha ");
        return;
        }

        saveSession(email,checksession);
        
           window.location.href = "home.html";
    }

    
});



// Criar conta
document.getElementById("creat-form").addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("email-creat-input").value;
    const password = document.getElementById("password-creat-input").value;

    // Validação do email
    if (email.length < 5 ) {
        alert("Preencha o campo com um email válido!");
        return;
    }

    // Validação da senha
    if (password.length < 4) {
        alert("Preencha a senha com no mínimo 4 dígitos.");
        return;
    }

    // Salvar conta no localStorage
    saveAccount({
        login: email,
        password: password,
        transaction: []
    });

    myModal.hide(); // Esconder o modal corretamente
    alert("Conta criada com sucesso.");
});


function checkLogged(){
   if (session){
    sessionStorage.setItem("logged",session);
    logged = session;
   }

   if(logged){
    saveSession(logged,session);

    window.location.href = "home.html";
   }
}
// Função para salvar a conta no localStorage
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data,saveSession){
    if(saveSession){
        localStorage.setItem("session",data);
    }
    sessionStorage.setItem("logged",data);
}



function getAccount(key){
    const account = localStorage.getItem(key);

    if (account){
        return JSON.parse(account); 
    }
    return null;
}

