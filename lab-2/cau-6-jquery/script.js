$(document).ready(function () {
  const tourList = [
    { name: "Hà Nội – Hạ Long – Tuần Châu", price: 10000000 },
    { name: "Hà Nội – Sapa", price: 6000000 },
    { name: "Đà Nẵng – Hội An", price: 3000000 },
    { name: "Buôn Mê Thuộc – Kon Tum", price: 2000000 },
    { name: "TP.HCM – Nha Trang", price: 3500000 },
    { name: "TP.HCM – Cần Thơ – Cà Mau", price: 2500000 },
  ];

  $("#submit-button").on("click", function () {
    const guestName = $("#fullName").val();
    const address = $("#address").val();
    const numParent = parseInt($("#adults").val()) || 0;
    const numChildren = parseInt($("#children").val()) || 0;
    const note = $("#notes").val();
    const tourName = $("#tour").val();

    const detailTour = tourList.find((item) => item.name === tourName);
    const tourPrice = detailTour ? detailTour.price : 0;

    renderInformation(guestName, address, tourName, note);
    renderInvoice(numParent, numChildren, tourPrice);
  });

  function renderInformation(guestName, address, tourName, note) {
    const now = new Date().toLocaleDateString("vi-VN");
    const html = `
      <h2>Thông tin đăng ký</h2>
      <dl class="info-grid">
        <dt>Ngày đăng ký:</dt><dd>${now}</dd>
        <dt>Nhân viên</dt><dd><input type="text"></dd>
        <dt>Họ tên khách</dt><dd>${guestName}</dd>
        <dt>Địa chỉ</dt><dd>${address}</dd>
        <dt>Tour</dt><dd>${tourName}</dd>
        <dt>Ghi chú</dt><dd>${note}</dd>
      </dl>
    `;
    $("#information-container").html(html);
  }

  function renderInvoice(numParent, numChildren, tourPrice) {
    const tourPriceForChildren = tourPrice / 2;
    const totalAdult = tourPrice * numParent;
    const totalChild = tourPriceForChildren * numChildren;
    const totalAmount = totalAdult + totalChild;

    const html = `
      <h2>Số lượng khách đoàn</h2>
      <table class="invoice-table">
        <thead>
          <tr>
            <th></th><th class="col-qty">SL</th><th class="col-price">Đơn giá</th><th class="col-total">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Người lớn</td>
            <td>${numParent}</td>
            <td>${tourPrice.toLocaleString()}</td>
            <td>${totalAdult.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Trẻ em</td>
            <td>${numChildren}</td>
            <td>${tourPriceForChildren.toLocaleString()}</td>
            <td>${totalChild.toLocaleString()}</td>
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
    $("#invoice-container").html(html);
  }
});
