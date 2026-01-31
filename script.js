const API_URL = "https://api.escuelajs.co/api/v1/products";

let products = [];
let filteredProducts = [];

// GET ALL
async function getAllProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    products = data;
    filteredProducts = data;

    renderTable(filteredProducts);
  } catch (error) {
    console.error("Lỗi khi gọi API", error);
  }
}

function renderTable(data) {
  const tableBody = document.getElementById("productTable");
  tableBody.innerHTML = "";

  data.forEach(product => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <img src="${product.images[0]}" alt="" />
      </td>
      <td>${product.title}</td>
      <td>$${product.price}</td>
    `;

    tableBody.appendChild(tr);
  });
}

getAllProducts();
