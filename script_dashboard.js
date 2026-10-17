// ==========================================
// 1. VARIABEL GLOBAL (Untuk Keranjang Pemesanan)
// ==========================================
let pesanan = [];
let total = 0;

// Nomor WhatsApp Toko Kopi Enzo (Format 62)
const nomorWA = '6281247504581';

// ==========================================
// 2. FUNGSI-FUNGSI PEMESANAN
// ==========================================

function tambahPesanan(nama, harga) {
    pesanan.push({ nama: nama, harga: harga });
    total += harga;
    
    const jumlahItem = document.getElementById('jumlahItem');
    if (jumlahItem) {
        jumlahItem.innerText = pesanan.length;
    }
    
    alert(nama + ' berhasil ditambahkan ke keranjang!');
}

function bukaKeranjang() {
    const modal = document.getElementById('modalKeranjang');
    const daftar = document.getElementById('daftarPesanan');
    
    if (!modal || !daftar) return;
    
    daftar.innerHTML = '';
    
    if (pesanan.length === 0) {
        daftar.innerHTML = '<li>Keranjang masih kosong.</li>';
    } else {
        pesanan.forEach((item) => {
            daftar.innerHTML += `<li>${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}</li>`;
        });
    }
    
    document.getElementById('totalHarga').innerText = `Total: Rp ${total.toLocaleString('id-ID')}`;
    modal.style.display = 'flex';
}

function tutupKeranjang() {
    const modal = document.getElementById('modalKeranjang');
    if (modal) modal.style.display = 'none';
}

function kirimKeWhatsApp() {
    if (pesanan.length === 0) {
        alert('Keranjang masih kosong. Silakan pilih kopi terlebih dahulu.');
        return;
    }
    
    const nama = document.getElementById('namaPelanggan').value.trim();
    const alamat = document.getElementById('alamatPelanggan').value.trim();

    if (nama === '' || alamat === '') {
        alert('Mohon isi Nama dan Alamat Pengiriman terlebih dahulu!');
        return;
    }
    
    let teksPesanan = 'Halo Toko Kopi Enzo, saya ingin memesan:%0A%0A';
    teksPesanan += `*Nama:* ${nama}%0A`;
    teksPesanan += `*Alamat:* ${alamat}%0A%0A`;
    teksPesanan += `*Detail Pesanan:*%0A`;
    
    pesanan.forEach((item, index) => {
        teksPesanan += `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}%0A`;
    });
    teksPesanan += `%0A*Total: Rp ${total.toLocaleString('id-ID')}*`;
    
    window.open(`https://wa.me/${nomorWA}?text=${teksPesanan}`, '_blank');

    // Reset keranjang & form
    pesanan = [];
    total = 0;
    
    const jumlahItem = document.getElementById('jumlahItem');
    if (jumlahItem) jumlahItem.innerText = '0';
    
    document.getElementById('namaPelanggan').value = '';
    document.getElementById('alamatPelanggan').value = '';
    
    tutupKeranjang();
    alert('Pesanan Anda berhasil dikirim ke WhatsApp kami. Terima kasih!');
}

// ==========================================
// 3. FUNGSI FEEDBACK
// ==========================================
function kirimFeedback(event) {
    event.preventDefault();

    const nama = document.getElementById('fbNama').value.trim();
    const rating = document.getElementById('fbRating').value;
    const pesan = document.getElementById('fbPesan').value.trim();

    let teksFeedback = 'Halo Admin Toko Kopi Enzo!%0A%0A';
    teksFeedback += `*Ulasan dari:* ${nama}%0A`;
    teksFeedback += `*Rating:* ${rating} Bintang%0A`;
    teksFeedback += `*Pesan:* ${pesan}`;

    window.open(`https://wa.me/${nomorWA}?text=${teksFeedback}`, '_blank');
    document.getElementById('feedbackForm').reset();
    alert('Terima kasih atas ulasan Anda!');
}

// ==========================================
// 4. FUNGSI LOGIN & LOGOUT
// ==========================================

// Toggle lihat password
function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }
}

// Fungsi Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    alert('Anda telah keluar dari dashboard.');
    window.location.href = 'login.html';
}

// Fungsi buka WhatsApp dari dashboard
function bukaWhatsApp() {
    window.open(`https://wa.me/${nomorWA}`, '_blank');
}

// ==========================================
// 5. LOGIKA UTAMA (Dijalankan Saat Halaman Dimuat)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    


    // --- BAGIAN LOGIN ---
    const loginForm = document.getElementById('loginForm');
    const pesanError = document.getElementById('pesanError');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Sembunyikan pesan error sebelumnya
            if (pesanError) pesanError.style.display = 'none';

            // Username: enzo | Password: 241207
            if (username === 'enzo' && password === '241207') {
                
                // Simpan status login di browser
                localStorage.setItem('isLoggedIn', 'true');
                
                alert('Login Berhasil!');
                window.location.href = 'dashboard.html';
                
            } else {
                if (pesanError) {
                    pesanError.innerText = 'Username atau Password salah! Silakan coba lagi.';
                    pesanError.style.display = 'block';
                } else {
                    alert('Username atau Password salah!');
                }
            }
        });
    }
});