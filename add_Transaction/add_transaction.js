import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const transactionForm = document.getElementById("transaction_form")


const localTransaction = JSON.parse(localStorage.getItem("transactions"))

let transaction = localTransaction ?? []

transactionForm.addEventListener("submit" , function(e){
    e.preventDefault()
    const transaction_data = new FormData(e.target)
    const amount = Number(transaction_data.get("amount"))
    const category = transaction_data.get("category")
    const date = new Date(transaction_data.get("date"))
    const time = transaction_data.get("time")

    const transactionObj = {
        "transaction_id": uuidv4(),
        "amount": amount,
        "category": category,
        "date": date,
        "time": time,
    }
    transaction.push(transactionObj)
    localStorage.setItem("transactions",JSON.stringify(transaction))
    alert("Transaction Submitted")
    transactionForm.reset()
}) 