const urlParams = new URLSearchParams(window.location.search); 
const orderId = urlParams.get("order");
let order = document.querySelector("#orderId");

order.textContent = orderId;

localStorage.clear();