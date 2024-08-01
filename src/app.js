document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Robusta Brazil", img: "1.jpg", price: 20000 },
      { id: 2, name: "Robusta Saiyo", img: "2.jpeg", price: 25000 },
      { id: 3, name: "Espresso Arabica", img: "3.jpg", price: 30000 },
      { id: 4, name: "Bubuk Berontoseno", img: "4.jpg", price: 35000 },
      { id: 5, name: "Vcafe Brazilian", img: "5.jpeg", price: 40000 },
      { id: 5, name: "Nescafe Classic", img: "6.jpeg", price: 45000 },
    ],
  }));
  // Buat object bernama cart
  // Object cart memiliki array bernama items
  // fungsi add menambahkan data item baru(newItem) kedalam object items
  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // Cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      //  Jika blm ada/cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barangnya sama atau beda dengan yang ada di cart
        this.items = this.items.map((item) => {
          // Jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan subtotalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yg mau diremove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri item 1 per 1
        this.items.map((item) => {
          // jika bukan barang yg di klik atau id nya tidak sama dengan barang yg di klik
          if (item.id !== id) {
            return item;
          } else {
            // kurangi quantity per barangnya dan juga hitung ulang total harga per itemnya
            item.quantity--;
            item.total = item.price * item.quantity;
            // kemudian kurangi quantity keseluruhan barang dan juga total harga dikurangi harga 1 buah barangnya
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
        // jika barangnya sisa 1
      } else if (cartItem.quantity === 1) {
        // buat array baru yg berisi semua barang di array lama kecuali barang yg kita klik
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Form Validation
const checkoutBtn = document.getElementById("checkout-btn");
const form = document.getElementById("checkout-form");

// Function untuk memeriksa apakah semua input sudah terisi
function checkForm() {
  let allFilled = true;

  // Memeriksa setiap elemen input dalam form
  for (let i = 0; i < form.elements.length; i++) {
    if (
      form.elements[i].nodeName === "INPUT" &&
      form.elements[i].value.trim() === ""
    ) {
      allFilled = false;
      break;
    }
    // Jika elemen tersebut adalah elemen input (nodeName === "INPUT")
    // dan nilai dari input tersebut kosong setelah di-trim (value.trim() === ""),
    // maka allFilled di-set ke false dan loop dihentikan dengan break.
  }

  // Mengatur status tombol checkout berdasarkan nilai allFilled
  // Jika input sudah terisi
  if (allFilled) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove("disabled");
  } else {
    // Jika input belum terisi
    checkoutBtn.disabled = true;
    checkoutBtn.classList.add("disabled");
  }
}

// Event listener untuk setiap input di dalam form
form.addEventListener("input", checkForm);
// Memanggil fungsi checkForm setiap kali ada perubahan (input event) pada input dalam form.
// Ini memastikan bahwa status tombol checkout akan diperbarui setiap kali pengguna mengetik atau mengubah nilai input.

// // Event listener untuk submit form dan mencegah memuat ulang halaman
// form.addEventListener("submit", function (event) {
//   event.preventDefault();
// });
checkoutBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);

  // Minta transcation token menggunakan ajax/fetch
  try {
    // Fetch berbentuk promise/synchronous
    // Oleh karena itu kita ubah menjadi asynchronous
    // tambahkan await di fetch, dan async di functionnya
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });
    const token = await response.text();
    console.log(token);
    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

// Format pesan WA
const formatMessage = (obj) => {
  return `
  Data Pembeli:
  Nama: ${obj.name}
  Email: ${obj.email}
  No. HP: ${obj.phone}
  
  Data Pesanan:
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`
  )}
  Total: ${rupiah(obj.total)}`;
};

// Konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
