// ==========================================
// 1. VARIABEL GLOBAL (Untuk Keranjang Pemesanan)
// ==========================================
let pesanan = [];
let total = 0;

// ==========================================
// 2. FUNGSI-FUNGSI PEMESANAN (Global)
// ==========================================

// Fungsi saat tombol "Tambah Pesanan" diklik
function tambahPesanan(nama, harga) {
    pesanan.push({ nama: nama, harga: harga });
    total += harga;
    
    // Update angka di ikon keranjang (jika elemennya ada)
    const jumlahItem = document.getElementById('jumlahItem');
    if (jumlahItem) {
        jumlahItem.innerText = pesanan.length;
    }
    
    alert(nama + ' berhasil ditambahkan ke keranjang!');
}

// Fungsi untuk membuka pop-up keranjang
function bukaKeranjang() {
    const modal = document.getElementById('modalKeranjang');
    const daftar = document.getElementById('daftarPesanan');
    
    if (!modal || !daftar) return; // Pengaman jika elemen tidak ada
    
    daftar.innerHTML = '';
    
    if (pesanan.length === 0) {
        daftar.innerHTML = '<li>Keranjang masih kosong.</li>';
    } else {
        pesanan.forEach((item, index) => {
            daftar.innerHTML += `<li>${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}</li>`;
        });
    }
    
    document.getElementById('totalHarga').innerText = `Total: Rp ${total.toLocaleString('id-ID')}`;
    modal.style.display = 'flex';
}

// Fungsi untuk menutup pop-up keranjang
function tutupKeranjang() {
    const modal = document.getElementById('modalKeranjang');
    if (modal) modal.style.display = 'none';
}

// Fungsi untuk membatalkan seluruh pesanan
function batalkanPesanan() {
    // 1. Konfirmasi terlebih dahulu agar tidak salah klik
    const yakin = confirm('Apakah Anda yakin ingin membatalkan semua pesanan?');
    
    if (yakin) {
        // 2. Kosongkan array pesanan dan reset total
        pesanan = [];
        total = 0;
        
        // 3. Kembalikan angka di ikon keranjang menjadi 0
        const jumlahItem = document.getElementById('jumlahItem');
        if (jumlahItem) {
            jumlahItem.innerText = '0';
        }
        
        // 4. Kosongkan kolom nama dan nomorMeja
        document.getElementById('namaPelanggan').value = '';
        document.getElementById('nomorMeja').value = '';
        
        // 5. Tutup pop-up keranjang
        tutupKeranjang();
        
        // 6. Beri tahu pelanggan
        alert('Pesanan Anda telah dibatalkan. Keranjang kembali kosong.');
    }
}


// ==========================================
// 3. LOGIKA UTAMA (Login & Dashboard)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // --- BAGIAN LOGIN ---
    // Fungsi untuk melihat/sembunyikan password
    function togglePassword() {
        const passwordInput = document.getElementById('password');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
}
    const loginForm = document.getElementById('loginForm');
    const pesanError = document.getElementById('pesanError');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Sembunyikan pesan error sebelumnya
            pesanError.style.display = 'none';

            if (username === 'enzo' && password === '241207') {
                
                // Jika berhasil, arahkan ke dashboard
                alert('Login Berhasil!');
                window.location.href = 'dashboard.html'; 
                
            } else {
                // Jika gagal, tampilkan pesan error di dalam kotak login
                pesanError.innerText = 'Username atau Password salah! Silakan coba lagi.';
                pesanError.style.display = 'block';
            }
        });
    }

    // --- BAGIAN DASHBOARD ---
    // Mengecek apakah kita sedang di halaman dashboard
    const headerDashboard = document.querySelector('header .logo');
    if (headerDashboard && headerDashboard.innerText === 'dashboard.html') {
        
        // Di sini kita bisa menambahkan logika keamanan.
        // Contoh: Cek apakah pengguna sudah login sebelumnya (menggunakan localStorage)
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        // Jika belum login, tendang kembali ke halaman login
        if (isLoggedIn !== 'true') {
            alert('Anda belum login! Silakan login terlebih dahulu.');
            window.location.href = 'login.html';
        }
    }
})

// Fungsi untuk mengirim pesanan ke WhatsApp
function kirimKeWhatsApp() {
    if (pesanan.length === 0) {
        alert('Keranjang masih kosong. Silakan pesan terlebih dahulu.');
        return;
    }
    
    // 1. Mengambil data pelanggan
    const nama = document.getElementById('namaPelanggan').value.trim();
    const nomorMeja = document.getElementById('nomorMeja').value.trim();

    // 2. Validasi: Cek apakah nama dan nomorMeja sudah diisi
    if (nama === '' || nomorMeja === '') {
        alert('Mohon isi Nama dan nomorMeja Pengiriman terlebih dahulu!');
        return;
    }
    
    // 3. Membuat format teks pesanan
    let teksPesanan = 'Halo Kafe Mr.Enzo, saya ingin memesan:%0A%0A';
    
    // Menambahkan data pelanggan ke pesan
    teksPesanan += `*Nama:* ${nama}%0A`;
    teksPesanan += `*nomorMeja:* ${nomorMeja}%0A%0A`;
    
    // Menambahkan detail pesanan
    teksPesanan += `*Detail Pesanan:*%0A`;
    pesanan.forEach((item, index) => {
        teksPesanan += `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}%0A`;
    });
    teksPesanan += `%0A*Total: Rp ${total.toLocaleString('id-ID')}*`;
    
    // NOMOR WA ADMIN (Format 62)
    const nomorWA = '6281247504581'; 
    
    // 4. Buka WhatsApp di tab baru
    window.location.href = `https://wa.me/${nomorWA}?text=${teksPesanan}`;
    // ==========================================
    // 5. RESET KERANJANG & FORMULIR
    // ==========================================
    pesanan = [];
    total = 0;

    // Kembalikan angka di ikon keranjang menjadi 0
    const jumlahItem = document.getElementById('jumlahItem');
    if (jumlahItem) {
        jumlahItem.innerText = '0';
    }

    // Kosongkan kembali kolom nama dan nomor meja
    document.getElementById('namaPelanggan').value = '';
    document.getElementById('nomorMeja').value = '';

    // Tutup pop-up keranjang
    tutupKeranjang();

    // Tampilkan pesan sukses
    alert('Pesanan Anda berhasil dikirim ke WhatsApp kami. Terima kasih!');
};