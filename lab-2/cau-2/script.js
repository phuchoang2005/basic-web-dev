const bangGia = {
  "Bún bò": 20000,
  "Hủ tiếu": 18000,
  "Bánh canh": 17000,
  "Phở bò": 19000,
  "Bánh mì thịt": 12000,
  "Bánh cuốn": 15000,
  "Cà phê đá": 12000,
  "Cà phê sữa đá": 15000,
  "Chanh dây": 13000,
  "Chanh muối": 12000,
  "Xí muội": 14000,
  "Sữa tươi": 13000,
  "Cam vắt": 17000,
};

function purchase() {
  const selectedFoods = document.getElementById("foods");
  const selectedBeverages = document.getElementById("beverages");
  const dachon = [];
  for (let thucpham of selectedBeverages.selectedOptions) {
    dachon.push(thucpham.value);
  }
  for (let thucpham of selectedFoods.selectedOptions) {
    dachon.push(thucpham.value);
  }

  const chiTietThanhToan = [];

  let tonggia = dachon.reduce((totalAmount, item) => {
    const gia = bangGia[item] || 0;
    chiTietThanhToan.push({
      name: item,
      price: gia,
    });
    return (totalAmount += gia);
  }, 0);

  if (document.getElementById("evening").checked) {
    tonggia *= 1.1;
  }

  let rows = chiTietThanhToan
    .map((item) => {
      return `
      <tr><td>${item.name}</td><td>${item.price}</td></tr>
    `;
    })
    .join("");

  let html = `
    <table border="1" style="width:300px; margin:auto; background-color:#eaffea; border-collapse:collapse;">
    <thead>
      <tr style="background-color:cyan; text-align:center;">
        <th>Các món đã dùng</th><th>Tiền</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
    <tfoot>
      <tr style="background-color:yellow; font-weight:bold;">
        <td>Tổng tiền</td><td>${tonggia.toLocaleString()} đ</td>
      </tr>
    </tfoot>
    </table>
  `;

  document.getElementById("result").innerHTML = html;
}

document.getElementById("thanhtoan").addEventListener("click", purchase);
