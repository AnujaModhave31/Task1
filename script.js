const products = [
  { name: "Face Cream", price: 120.50 },
  { name: "Lipstick", price: 250.00 },
  { name: "Shampoo", price: 180.75 },
  { name: "Face Wash", price: 150.00 }
];

function fillProducts(selectBox) {
  selectBox.innerHTML = '<option value="">Select</option>';

  for (let i = 0; i < products.length; i++) {
    let option = document.createElement("option");
    option.value = products[i].name;
    option.textContent = products[i].name;
    selectBox.appendChild(option);
  }
}

function setPrice(selectElement) {
  let row = selectElement.parentElement.parentElement;
  let priceInput = row.querySelector(".price");

  let selectedName = selectElement.value;
  let price = 0;

  for (let i = 0; i < products.length; i++) {
    if (products[i].name === selectedName) {
      price = products[i].price;
      break;
    }
  }

  priceInput.value = price.toFixed(2);
  calculateRowTotal(priceInput);
}

function calculateRowTotal(element) {
  let row = element.parentElement.parentElement;

  let price = parseFloat(row.querySelector(".price").value) || 0;
  let qty = parseFloat(row.querySelector(".qty").value) || 0;

  let total = price * qty;
  row.querySelector(".rowTotal").value = total.toFixed(2);

  calculateGrandTotal();
}

function calculateGrandTotal() {
  let total = 0;
  let totals = document.querySelectorAll(".rowTotal");

  for (let i = 0; i < totals.length; i++) {
    total += parseFloat(totals[i].value) || 0;
  }

  document.getElementById("grandTotal").innerText = total.toFixed(2);
}

function addRow() {
  let tableBody = document.getElementById("tableBody");

  let row = document.createElement("tr");

  row.innerHTML = `
    <td><select class="product" onchange="setPrice(this)"></select></td>
    <td><input type="text" class="price" readonly></td>
    <td><input type="number" class="qty" oninput="calculateRowTotal(this)"></td>
    <td><input type="text" class="rowTotal" readonly></td>
    <td><button onclick="removeRow(this)">Remove</button></td>
  `;

  tableBody.appendChild(row);
  fillProducts(row.querySelector(".product"));
}

function removeRow(button) {
  let row = button.parentElement.parentElement;
  row.remove();
  calculateGrandTotal();
}

window.onload = function () {
  let selects = document.querySelectorAll(".product");
  for (let i = 0; i < selects.length; i++) {
    fillProducts(selects[i]);
  }
};
