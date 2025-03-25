// Configurar o Bootstrap Modal corretamente
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


// Inicializa data com valor vazio ou carrega do localStorage
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

// adicionar lançamento 
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="inlineRadioOptions"]:checked').value;

    // Adiciona a nova transação
    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();
    getTransactions();
    
    alert("Lançamento adicionado com sucesso");
    console.log("Dados salvos:", data); // Para debug
});

checkLogged();

function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        try {
            data = JSON.parse(dataUser);
            // Garante que transactions existe
            if (!data.transactions) {
                data.transactions = [];
            }
        } catch (e) {
            console.error("Erro ao parsear dados:", e);
            data = { transactions: [] };
        }
        getTransactions();
    }

    console.log("Dados carregados:", data); // Para debug
    getCashIn();
    getCashOut();
    getTotal();
}

function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
     transactions.forEach((item)=>{
        let type ="Entrada";

        if (item.type === "2") {
            type = "Saída";
        }
        

        transactionsHtml+=`
          <tr>
                <th scope="row">${item.date}</th>
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
                </tr>
        
        `
     })
     document.getElementById("transactions-list").innerHTML = transactionsHtml;
    }
    
}

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}

