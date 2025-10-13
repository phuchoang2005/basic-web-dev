const menuPrices = [
  { name: "Bún bò", price: 20000 },
  { name: "Hủ tiếu", price: 18000 },
  { name: "Bánh canh", price: 17000 },
  { name: "Nui", price: 20000 },
  { name: "Phở bò", price: 19000 },
  { name: "Bánh mỳ thịt", price: 12000 },
  { name: "Bánh cuốn", price: 15000 },
];

/* 
  {
    name: "Bún bò",
    quantity: 1,
    total: 20000
  }
*/

const tables = {
  "Bàn 1": [],
  "Bàn 2": [],
  "Bàn 3": [],
};

document.getElementById("call_button").addEventListener("click", addDish);

function renderTable() {
  const table_container = document.getElementById("pre-invoice");
  table_container.innerHTML = "";
  for (const [table_id, itemList] of Object.entries(tables)) {
    const totalAmount = itemList.reduce((sum, item) => (sum += item.total), 0);
    const rows = itemList
      .map(
        (item) => `<tr>
        <td>${item.name}</td>
        <td><input type="number" value="${item.quantity}" min="1"
          onchange="updateQuantity('${table_id}', '${item.name}', this.value)">
        </td>
        <td>${item.total.toLocaleString()} đ</td>
        <td><button onclick="removeItem('${table_id}', '${
          item.name
        }')">Xóa</button></td>
      </tr>`
      )
      .join("");
    table_container.innerHTML += `<table class="table">
        <tr><th colspan="4">${table_id}</th></tr>
        <tr><th>Món</th><th>SL</th><th>Tiền</th><th></th></tr>
        ${rows}
        <tr><td colspan="4" style="text-align:right;font-weight:bold">Tổng tiền: ${totalAmount.toLocaleString()} đ</td></tr>
        <tr><td colspan="4" style="text-align:center">
          <button onclick="printInvoice('${table_id}')">In hóa đơn</button>
        </td></tr>
      </table>`;
  }
}

function addDish() {
  const dish = document.getElementById("dish-select").value;
  const table_id = document.getElementById("table-select").value;

  const exsisting = tables[table_id].find((item) => item.name === dish);
  const menuItem = menuPrices.find((item) => item.name === dish);

  if (!exsisting) {
    tables[table_id].push({
      name: menuItem.name,
      quantity: 1,
      total: menuItem.price,
    });
  } else {
    exsisting.quantity++;
    exsisting.total = exsisting.quantity * menuItem.price;
  }
  renderTable();
}

function updateQuantity(table_id, dish, newQuantity) {
  const menuItem = menuPrices.find((item) => item.name === dish);
  const itemTable = tables[table_id].find((item) => item.name === dish);

  itemTable.quantity = parseInt(newQuantity);
  itemTable.total = menuItem.price * itemTable.quantity;
  renderTable();
}

function removeItem(tables_id, dish) {
  tables[tables_id] = tables[tables_id].filter((item) => item.name !== dish);
  renderTable();
}

function printInvoice(table_id) {
  const items = tables[table_id];
  let total = items.reduce((sum, i) => sum + i.total, 0);
  const now = new Date().toLocaleString("vi-VN");

  const html = `
    <h3>Hóa đơn</h3>
    <p><b>Ngày hóa đơn:</b> ${now}</p>
    <p><b>Bàn:</b> ${table_id}</p>
    <table>
      <tr><th>Món</th><th>SL</th><th>Thành tiền</th></tr>
      ${items
        .map(
          (i) =>
            `<tr><td>${i.name}</td><td>${
              i.quantity
            }</td><td>${i.total.toLocaleString()} đ</td></tr>`
        )
        .join("")}
      <tr><td colspan="3" style="text-align:right;font-weight:bold">Tổng tiền: ${total.toLocaleString()} đ</td></tr>
    </table>
  `;

  document.getElementById("invoice_container").innerHTML = html;
}
