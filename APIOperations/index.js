const tbody = document.getElementById("tbody");
let productsData = [];

const url = "https://northwind.vercel.app/api/products";

// Fetching data with axios

async function fetchData() {
  try {
    const res = await axios.get(url);
    productsData = res.data;
    dataTable();
  } catch (err) {
    console.log(err);
  }
}

fetchData();

// Adding data to the table

function dataTable() {
  productsData.forEach(function (product) {
    const trow = document.createElement("tr");
    trow.innerHTML = `
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.unitPrice}</td>
    <td>${product.unitsInStock}</td>
    <td><button data-id="${product.id}" class="delete">Delete</button></td>
    `;
    tbody.appendChild(trow);
  });

  // Deleting data

  const deleteButton = document.querySelectorAll(".delete");
  deleteButton.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      deleteData(id);
    });
  });
}

async function deleteData(id) {
  try {
    const res = await axios.delete(`${url}/${id}`);
    console.log(`Product deleted!`);
    productsData = productsData.filter((products) => products.id !== id);
    dataTable();
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}
