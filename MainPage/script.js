const incomeBtn = document.getElementById("income");
const addIncomeDiv = document.getElementById("addincome");
const incomeVal = document.getElementById("income-val");
const expenseVal = document.getElementById("expense-val")
const savingsVal = document.getElementById("savings-val")
const transactions = JSON.parse(localStorage.getItem("transactions"))
const closeBtn = document.getElementById("close-btn")
const expenseCtx = document.getElementById('expenseChart').getContext('2d');
const categoryCtx = document.getElementById('categoryChart').getContext('2d');
const transactionCategory = {};
const toggleBtn = document.getElementById("toggle-btn");

let groupedTransactions = {};
let transactionAmounts = [];
let categoryVal = [];
let transactionDates = [];
let category = [];
let expenses = 0;
let savings = 0;
let expenseChart;
let categoryChart;
let usdcheck = JSON.parse(localStorage.getItem("usdcheck"))


// Unit Conversion
toggleBtn.checked = !!usdcheck;
toggleBtn.addEventListener('change',function(){
    usdcheck = !usdcheck
    localStorage.setItem("usdcheck",JSON.stringify(usdcheck))
    expenseChart.data.datasets[0].data = getConvertedAmounts();
    expenseChart.update()
    render()
})

function getConvertedAmounts(){
    return usdcheck ?transactionAmounts.map(val => convertToInr(val))
        : transactionAmounts;
}



if(transactions){
transactions.sort((a,b) => new Date(a.date) - new Date(b.date));

 for(let t of transactions){
    const dateStr = new Date(t.date).toDateString();
    if(!groupedTransactions[dateStr]){
      groupedTransactions[dateStr] = 0;
    }
    groupedTransactions[dateStr] += t.amount;

 } 

 transactionDates = Object.keys(groupedTransactions)
 transactionAmounts = transactionDates.map(date => groupedTransactions[date]);

for(let t of transactions){
  let category = t.category
  if(!transactionCategory[category]){
    transactionCategory[category] = 0;
  }
  transactionCategory[category] += 1
}

category = Object.keys(transactionCategory)
categoryVal = category.map(cat => transactionCategory[cat]);
}

function convertToInr(val){
    return val*84.74.toFixed(2)
}

incomeBtn.addEventListener("dblclick",addIncome)

closeBtn.addEventListener('click',function(){
            addIncomeDiv.style.display = "none" 
})

let currentIncome = JSON.parse(localStorage.getItem("Income")) ?? 0
getExpense()
render()

function addIncome(){
    addIncomeDiv.style.display = "inline-block"
    document.getElementById("submit").addEventListener("click",function(){
        if(document.getElementById("incomeno").value){
       currentIncome += Number(document.getElementById("incomeno").value)
        localStorage.setItem("Income",currentIncome)
        document.getElementById("incomeno").value = ''
        addIncomeDiv.style.display = "none" 
        render()}
    })
}   

function getExpense(){
    if(transactions != null){
    for(transaction of transactions){
        expenses += transaction.amount
    }
    localStorage.setItem("expense",JSON.stringify(expenses))
}
}

function render(){
    savingsRender()
    if(usdcheck){
        incomeVal.innerHTML = `₹${convertToInr(currentIncome)}`
        expenseVal.innerHTML = `₹${convertToInr(expenses)}`
    }
    else{
    incomeVal.innerHTML = `$${currentIncome}`
    expenseVal.innerHTML = `$${expenses}`
    }
}

function savingsRender(){
     savings = currentIncome - expenses
     if(usdcheck){
        savingsVal.innerHTML = `₹${convertToInr(savings)}`
     }
     else{
     savingsVal.innerHTML = `$${savings}`
     }
}

expenseChart = new Chart(expenseCtx, {
  type: 'bar',
  data: {
      labels: transactionDates ?? 0,
      datasets: [{
          label: 'Expenses',
          data: getConvertedAmounts(),
          backgroundColor: 'red',
          maxBarThickness: 40,
          borderRadius: 10,
      }]
  },
  options: {
      responsive: false, // Disable automatic resizing
      maintainAspectRatio: false, // Allow custom aspect ratio
      scales: {
          x: {
              grid: {
                  display: false // Removes vertical grid lines
              }
          },
          y: {
              grid: {
                  display: false // Removes horizontal grid lines
              }
          }
      }
  }
});


categoryChart = new Chart(categoryCtx, {
    type: 'doughnut',
    data: 
      {
        labels: category,
        datasets: [{
          label: 'Count',
          data: categoryVal
        }]

    },
    options: {
      responsive: false, // Disable automatic resizing
      maintainAspectRatio: false, // Allow custom aspect ratio
    } 
})

