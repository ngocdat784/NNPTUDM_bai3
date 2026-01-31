const API_URL = "https://api.escuelajs.co/api/v1/products";

let products = [];
let filteredProducts = [];

let currentPage = 1;
let pageSize = 10;

/* ================= GET ALL ================= */
async function getAllProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    products = data;
    filteredProducts = [...products];

    renderTable();
  } catch (error) {
    console.error("Lỗi khi gọi API", error);
  }
}

/* ================= RENDER TABLE ================= */
function renderTable() {
  const tableBody = document.getElementById("productTable");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = filteredProducts.slice(start, end);

  pageData.forEach(product => {
    const tr = document.createElement("tr");

    const imageUrl =
      Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : "https://via.placeholder.com/120";

    tr.innerHTML = `
      <td>
        <img
          src="${imageUrl}"
          alt="${product.title}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://via.placeholder.com/120'"
        />
      </td>
      <td>${product.title}</td>
      <td>$${product.price}</td>
    `;

    tableBody.appendChild(tr);
  });

  updatePageInfo();
}



/* ================= SEARCH ================= */
function handleSearch() {
  const keyword = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(keyword)
  );

  currentPage = 1;
  renderTable();
}

/* ================= SORT ================= */
function sortByName(order) {
  filteredProducts.sort((a, b) => {
    return order === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  renderTable();
}

function sortByPrice(order) {
  filteredProducts.sort((a, b) => {
    return order === "asc"
      ? a.price - b.price
      : b.price - a.price;
  });

  renderTable();
}

/* ================= PAGE SIZE ================= */
function changePageSize(size) {
  pageSize = Number(size);
  currentPage = 1;
  renderTable();
}

/* ================= PAGINATION ================= */
function nextPage() {
  const maxPage = Math.ceil(filteredProducts.length / pageSize);
  if (currentPage < maxPage) {
    currentPage++;
    renderTable();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function updatePageInfo() {
  document.getElementById("pageInfo").innerText = currentPage;
}

/* ================= INIT ================= */
getAllProducts();
