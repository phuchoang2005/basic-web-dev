const ScreenTimes = [
  { time: "9h-12h", price: 45000 },
  { time: "13h-16h", price: 45000 },
  { time: "17h-20h", price: 55000 },
  { time: "22h-2h", price: 35000 },
];

const RoomType = [
  { type: "Bronze", coeff: 1.0 },
  { type: "Silver", coeff: 1.2 },
  { type: "Gold", coeff: 1.5 },
  { type: "Diamond", coeff: 2.0 },
];

function convertShowedRoomType(roomType) {
  switch (roomType) {
    case "Bronze":
      return "Đồng";
    case "Silver":
      return "Bạc";
    case "Gold":
      return "Vàng";
    case "Diamond":
      return "Kim cương";
    default:
      break;
  }
  return "";
}

$("#submit-btn").click(function () {
  const time = $("#date").val();
  const filmName = $("#movie").val();
  const showTime = $("#showtime").val();
  const roomType = $("#screen").val();
  const selectedSeats = $("#seat option:selected")
    .map(function () {
      return $(this).text();
    })
    .get();
  const priceByShowTime = ScreenTimes.find(
    (item) => item.time === showTime
  ).price;
  const coeffByRoomType = RoomType.find((item) => item.type === roomType).coeff;

  const detailedSeatList = selectedSeats.map((seat) => {
    return {
      seatNum: seat,
      price: priceByShowTime * coeffByRoomType,
    };
  });

  const totalAmount = detailedSeatList.reduce((sum, item) => {
    return (sum += item.price);
  }, 0);

  const showedRoomType = convertShowedRoomType(roomType);

  const seatRows = detailedSeatList
    .map((seat) => {
      return `
          <tr><td>${
            seat.seatNum
          }</td><td>${seat.price.toLocaleString()} đ</td></tr>
      `;
    })
    .join("");
  const html = `
      <h2>Thông tin vé</h2>
          <table class="main-info">
            <tbody>
              <tr>
                <td class="label">Khách hàng</td>
                <td class="value">Nguyễn Văn A</td>
              </tr>
              <tr>
                <td class="label">Ngày chiếu</td>
                <td class="value">${time}</td>
              </tr>
              <tr>
                <td class="label">Phim</td>
                <td class="value">${filmName}</td>
              </tr>
              <tr>
                <td class="label">Suất chiếu</td>
                <td class="value">${showTime}</td>
              </tr>
              <tr>
                <td class="label">Phòng chiếu</td>
                <td class="value">${showedRoomType}</td>
              </tr>
            </tbody>
          </table>
          <table class="seat-details">
            <thead>
              <tr>
                <th>Ghế</th>
                <th class="price-col">Giá Vé</th>
              </tr>
            </thead>
            <tbody>
              ${seatRows}
            </tbody>
            <tfoot>
              <tr>
                <td>Tổng tiền</td>
                <td class="price-col"> ${totalAmount.toLocaleString()} đ</td>
              </tr>
            </tfoot>
          </table>
    `;
  $("#invoice-section").html(html);
});
