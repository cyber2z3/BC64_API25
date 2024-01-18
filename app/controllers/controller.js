// GET: lấy danh sách, lấy chi tiết
// POST: tạo mới
// PUT: cập nhật
// DELETE: xóa

// Gọi API lấy danh sách sản phẩm hiện có từ server

var idEdited = null;

//hiệu ứng loading: bật on 1 lần trước khi api chạy, bật off 2 lần trong then & catch
function turnOnLoading() {
  document.getElementById("spinner").style.display = "block";
}
function turnOffLoading() {
  document.getElementById("spinner").style.display = "none";
}

function resetForm() {
  var listInput = document.querySelectorAll("input");
  for (var i = 0; i < listInput.length; i++) {
    listInput[i].value = "";
  }
}

function renderProducts(productArray) {
  var contentHTML = "";
  for (var i = productArray.length - 1; i >= 0; i--) {
    var product = productArray[i];
    var trString = `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.img}</td>
        <td>${product.desc}</td>

        <td>
        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
        <button class="btn btn-primary" onclick="editProduct(${product.id})">Edit</button>

        </td>
      </tr>
    `;
    contentHTML += trString;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}

//hiển thị dữ liệu
function fetchProductList() {
  turnOnLoading();
  axios({
    url: "https://65a60d8774cf4207b4ef32f6.mockapi.io/product",
    method: "GET",
  })
    .then(function (res) {
      console.log("res", res);
      // xử lý khi gọi api thành công
      renderProducts(res.data);
      turnOffLoading();
    })
    .catch(function (err) {
      console.log("err", err);
      // xử lý khi gọi api thất bại
      turnOffLoading();
    });
}
fetchProductList();

//xóa một sản phẩm từ server
function deleteProduct(id) {
  turnOnLoading();
  console.log("check xoa sp");
  axios({
    url: `https://65a60d8774cf4207b4ef32f6.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then(function (result) {
      //Xóa thành công và gọi lại API
      console.log("res: ", result.data);
      fetchProductList();
    })
    .catch(function (err) {
      //xóa thất bại
      console.log("err: ", err);
      turnOffLoading();
    });
}

//tạo một sản phẩm mới
function creatProduct() {
  console.log("creat new product");
  //lấy data user nhập
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var moTaSp = document.getElementById("MoTaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;

  //tạo object mới có key tròng với schema trên server
  var sp = {
    name: tenSp,
    price: giaSp,
    img: hinhSp,
    desc: moTaSp,
  };
  console.log("creat product: ", sp);

  //Gọi API
  axios({
    url: `https://65a60d8774cf4207b4ef32f6.mockapi.io/product`,
    method: "POST",
    data: sp,
  })
    .then((result) => {
      console.log("res: ", result);
      fetchProductList();
      $("#myModal").modal("hide");
      resetForm();
    })
    .catch((err) => {
      console.log("err: ", err);
    });
}

//chỉnh sửa một product
function editProduct(id) {
  idEdited = id;
  axios({
    url: `https://65a60d8774cf4207b4ef32f6.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then((result) => {
      console.log("res - lấy thông tin thành công: ", result);
      //hiển thị response trên layout
      $("#myModal").modal("show");
      //tạo biến tạm để chứa data
      var sp = result.data;
      document.getElementById("TenSP").value = sp.name;
      document.getElementById("GiaSP").value = sp.price;
      document.getElementById("MoTaSP").value = sp.img;
      document.getElementById("HinhSP").value = sp.desc;
    })
    .catch((err) => {
      console.log("err - ", err);
    });
}

function updateProduct(id) {
  //lấy data user nhập
  var tenSp = document.getElementById("TenSP").value;
  var giaSp = document.getElementById("GiaSP").value;
  var moTaSp = document.getElementById("MoTaSP").value;
  var hinhSp = document.getElementById("HinhSP").value;

  //tạo object mới có key tròng với schema trên server
  var sp = {
    name: tenSp,
    price: giaSp,
    img: hinhSp,
    desc: moTaSp,
  };

  axios({
    url: `https://65a60d8774cf4207b4ef32f6.mockapi.io/product/${idEdited}`,
    method: "PUT",
    data: sp,
  })
    .then((res) => {
      //update success
      console.log("res - ", res);
      //tắt modal
      $("#myModal").modal("hide");
      //render dssp
      fetchProductList();
    })
    .catch((err) => {
      //update fail
      console.log("err - ", err);
    });
}
