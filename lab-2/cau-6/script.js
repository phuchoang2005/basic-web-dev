const tourList = [
  {
    name: "Hà Nội – Hạ Long – Tuần Châu",
    price: 10000000,
  },
  {
    name: "Hà Nội – Sapa",
    price: 6000000,
  },
  {
    name: "Đà Nẵng – Hội An",
    price: 3000000,
  },
  {
    name: "Buôn Mê Thuộc – Kon Tum",
    price: 2000000,
  },
  {
    name: "TP.HCM – Nha Trang",
    price: 3500000,
  },
  {
    name: "TP.HCM – Cần Thơ – Cà Mau",
    price: 2500000,
  },
];
document.getElementById("submit-button").addEventListener("click", subcribe);
function renderInformation(guestName, address, tourName, note) {
  const now = new Date().toLocaleDateString("vi-VN");
  const html = `
    <h2>Thông tin đăng ký</h2>
        <dl class="info-grid">
          <dt>Ngày đăng ký:</dt>
          <dd id="regis-date">
          ${now}
          </dd>
          <dt>Nhân Viên</dt>
          <dd><input type="text"></dd>

          <dt>Họ tên khách</dt>
          <dd>${guestName}</dd>

          <dt>Địa chỉ</dt>
          <dd>${address}</dd>

          <dt>Tour</dt>
          <dd>${tourName}</dd>

          <dt>Ghi chú</dt>
          <dd>${note}</dd>
        </dl>
    `;
  document.getElementById("information-container").innerHTML = html;
}
function createDetailTourList(tourName) {
  return {
    name: tourName,
    price: tourList.find((item) => item.name === tourName).price,
  };
}
function renderInvoice(numParent, numChildren, tourPrice) {
  const tourPriceForChildren = tourPrice / 2;

  const totalAmountForAdult = tourPrice * numParent;
  const totalAmountForChildren = tourPriceForChildren * numChildren;

  const totalAmount = totalAmountForAdult + totalAmountForChildren;

  const html = `
    <h2>Số lượng khách đoàn</h2>
          <table class="invoice-table">
            <thead>
              <tr>
                <th></th>
                <th class="col-qty">SL</th>
                <th class="col-price">Đơn giá</th>
                <th class="col-total">Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Người lớn</td>
                <td class="col-qty">${numParent}</td>
                <td class="col-price">${tourPrice.toLocaleString()}</td>
                <td class="col-total">${totalAmountForAdult.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Trẻ em</td>
                <td class="col-qty">${numChildren}</td>
                <td class="col-price">${tourPriceForChildren.toLocaleString()}</td>
                <td class="col-total">${totalAmountForChildren.toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="total-label">Tổng tiền</td>
                <td class="total-amount">${totalAmount.toLocaleString()} đ</td>
              </tr>
            </tfoot>
          </table>
  `;
  document.getElementById("invoice-container").innerHTML = html;
}
function subcribe() {
  const guestName = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const numParent = document.getElementById("adults").value;
  const numChildren = document.getElementById("children").value;
  const note = document.getElementById("notes").value;
  const detailTour = createDetailTourList(
    document.getElementById("tour").value
  );
  renderInformation(guestName, address, detailTour.name, note);
  console.log(detailTour.price);
  renderInvoice(numParent, numChildren, detailTour.price);
}
