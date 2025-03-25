// Configurar o Bootstrap Modal corretamente
const myModal = new bootstrap.Modal(document.getElementById("transaction-modal"));
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");


// Inicializa data com valor vazio ou carrega do localStorage
let data = {
    transactions: []
};

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transaction-button").addEventListener("click", function(e){
    window.location.href = "transaction.html";
});

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
    
    getCashIn();
    getCashOut();
    getTotal();
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
    }

    console.log("Dados carregados:", data); // Para debug
    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

function getCashIn() {
    const transaction = data.transactions;
    const cashIn = transaction.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = cashIn.length > 5 ? 5 : cashIn.length;

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
    <div class="col-12">
        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
        <div class="container p-0">
            <div class="row">
                <div class="col-12 col-md-8">
                    <p>${cashIn[index].description}</p>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                    ${cashIn[index].date}
                </div>
            </div>
        </div>
    </div>
</div>
 `

        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut() {
    const transaction = data.transactions;
    const cashIn = transaction.filter((item) => item.type === "2");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = cashIn.length > 5 ? 5 : cashIn.length;

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
    <div class="col-12">
        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
        <div class="container p-0">
            <div class="row">
                <div class="col-12 col-md-8">
                    <p>${cashIn[index].description}</p>
                </div>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                    ${cashIn[index].date}
                </div>
            </div>
        </div>
    </div>
</div>
 `

        }

        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    }
}

function getTotal(){
    const transaction = data.transactions;
    let total = 0;

    transaction.forEach((item)=>{
    if(item.type==="1"){
        total+= item.value;
    }else{
        total-= item.value;
    }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`; 
}


function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}