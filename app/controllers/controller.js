// GET: lấy danh sách, lấy chi tiết
// POST: tạo mới
// PUT: cập nhật
// DELETE: xóa

// Gọi API lấy danh sách sản phẩm hiện có từ server

function renderProducts(productArray) {
  var contentHTML = "";
  for (var i = 0; i < productArray.length; i++) {
    var product = productArray[i];
    var trString = `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.img}</td>
        <td>${product.desc}</td>

        <td>
        <button class="btn btn-danger">Delete</button>
        <button class="btn btn-primary">Edit</button>

        </td>
      </tr>
    `;
    contentHTML += trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

axios({
  url: "https://65a60d8774cf4207b4ef32f6.mockapi.io/product",
  method: "GET",
})
  .then(function (res) {
    console.log("res", res);
    // xử lý khi gọi api thành công
    renderProducts(res.data);
  })
  .catch(function (err) {
    console.log("err", err);
    // xử lý khi gọi api thất bại
  });
