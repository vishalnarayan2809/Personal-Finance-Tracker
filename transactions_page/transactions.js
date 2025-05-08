
const transactionList = document.getElementById("transaction_list")

const transactionArray = JSON.parse(localStorage.getItem("transactions"))

console.log(transactionArray)

function displayTransaction(){

    let list = ``

    for(let transaction of transactionArray){
        list += `
        <div class="transaction">
        <h1>Transaction ID: <span>${transaction.transaction_id}</span></h1>
        <h1>Amount: <span>${transaction.amount}</span></h1>
        <h1>Category: <span>${transaction.category}</span></h1>
        <h1>Date: <span>${transaction.date}</span></h1>
        <h1>Time: <span>${transaction.time}</span></h1>
        </div>     
                `
    }

    transactionList.innerHTML = list

}
displayTransaction()