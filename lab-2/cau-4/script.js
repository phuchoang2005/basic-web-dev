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

document.getElementById("submit-btn").addEventListener("click", payment);

function convertShowedRoomType(roomType) {
  let showedRoomType = "";
  switch (roomType) {
    case "Bronze":
      showedRoomType = "Đồng";
      break;
    case "Silver":
      showedRoomType = "Bạc";
      break;
    case "Gold":
      showedRoomType = "Vàng";
      break;
    case "Diamond":
      showedRoomType = "Kim cương";
      break;
    default:
      break;
  }
  return showedRoomType;
}

function payment() {
  const time = document.getElementById("date").value;
  const filmName = document.getElementById("movie").value;
  const showTime = document.getElementById("showtime").value;
  const roomType = document.getElementById("screen").value;
  const selectedSeats = Array.from(document.getElementById("seat").options)
    .filter((option) => option.selected)
    .map((option) => option.value);

  const priceByShowTime = ScreenTimes.find(
    (item) => item.time === showTime
  ).price;
  const coeffByRoomType = RoomType.find((item) => item.type === roomType).coeff;

  const seatList = selectedSeats.map((seat) => {
    return {
      seatNum: seat,
      price: priceByShowTime * coeffByRoomType,
    };
  });
  const totalAmount = seatList.reduce((sum, seat) => {
    return (sum += seat.price);
  }, 0);

  let showedRoomType = convertShowedRoomType(roomType);

  const seatRows = seatList
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
  document.getElementById("invoice-section").innerHTML = html;
}
