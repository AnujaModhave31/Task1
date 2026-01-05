const products = [
    { name: "Face Cream" },
    { name: "Lipstick" },
    { name: "Shampoo" },
    { name: "Face Wash" }
];


function fillProducts(selectBox){
    selectBox.innerHTML = `<option value="">--Select Product--</option>`;

    products.forEach(product => {
        selectBox.innerHTML += `
            <option value="${product.name}">
                ${product.name}
            </option>
        `;
    });
}


function updateTotalByPrice(element){
    let row = element.parentElement.parentElement;

    let price = row.querySelector(".price").value;
    let qty = row.querySelector(".qty").value;
    let totalBox = row.querySelector(".lineTotal");

    if(price !== "" && qty !== ""){
        totalBox.value = price * qty;
    } else {
        totalBox.value = "";
    }

    updateGrandTotal();
}


function addRow(){
    let tableBody = document.getElementById("tableBody");

    let newRow = `
        <tr>
            <td>
                <select class="productSelect"></select>
            </td>
            <td>
                <input type="number" class="price" oninput="updateTotalByPrice(this)">
            </td>
            <td>
                <input type="number" class="qty" min="1" oninput="updateTotalByPrice(this)">
            </td>
            <td>
                <input type="text" class="lineTotal" readonly>
            </td>
        </tr>
    `;

    tableBody.insertAdjacentHTML("beforeend", newRow);

    let lastSelect = tableBody.lastElementChild.querySelector(".productSelect");
    fillProducts(lastSelect);
}


function updateGrandTotal(){
    let total = 0;

    document.querySelectorAll(".lineTotal").forEach(item => {
        total += Number(item.value) || 0;
    });

    document.getElementById("grandTotal").innerText = total;
}


window.onload = () => {
    document.querySelectorAll(".productSelect").forEach(fillProducts);
};
