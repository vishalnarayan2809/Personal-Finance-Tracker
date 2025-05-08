const resetBtn = document.getElementById("reset")


resetBtn.addEventListener('click',function(){
    localStorage.clear()
    alert("Your Data has been reset")
})