// assets/script.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggler = document.getElementById('navToggler');
    const navMenu = document.getElementById('navMenu');

    if (navToggler && navMenu) {
        navToggler.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggler.classList.toggle('active');
            const isExpanded = navToggler.getAttribute('aria-expanded') === 'true' || false;
            navToggler.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Update Copyright Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Opsional: Smooth scroll untuk anchor links
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if(targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    // --- TAMBAHAN JIKA MEMILIH SKENARIO 2 (DYNAMIC LOADING) ---
    // Fungsi untuk memuat dan menampilkan postingan
    async function loadPosts() {
        const postsContainer = document.getElementById('postsContainer');
        if (!postsContainer) {
            // console.log('Elemen #postsContainer tidak ditemukan di halaman ini.');
            return;
        }

        // Ganti dengan URL API/endpoint yang benar di masandigital.com
        // Ini HANYA CONTOH. Anda perlu tahu bagaimana cara mendapatkan data postingan
        // dari masandigital.com. Apakah ada API? Apakah ada file JSON?
        const postsApiUrl = 'https://masandigital.com/api/posts'; // GANTI INI

        try {
            const response = await fetch(postsApiUrl);

            if (!response.ok) {
                // Periksa apakah ini masalah CORS atau error server lain
                if (response.status === 0) { // Kemungkinan besar CORS
                     console.error('Gagal memuat postingan: Kemungkinan masalah CORS. Pastikan masandigital.com mengizinkan permintaan dari domain ini.');
                     postsContainer.innerHTML = '<p>Tidak dapat memuat postingan karena batasan domain (CORS). Konten harus disajikan dari domain yang sama atau server tujuan harus mengizinkan akses.</p>';
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return;
            }
            const posts = await response.json(); // Asumsi responsenya JSON

            postsContainer.innerHTML = ''; // Kosongkan placeholder

            if (posts && posts.length > 0) {
                posts.forEach(post => {
                    const postElement = document.createElement('article');
                    postElement.classList.add('post-item');

                    let fullImageUrl = post.imageUrl || (post.image ? post.image.url : null); // Sesuaikan dengan struktur data Anda
                    if (fullImageUrl && !fullImageUrl.startsWith('http')) {
                        // Jika imageUrl adalah path relatif seperti 'posts/gambar-post.jpg' atau '/assets/images/foo.png'
                        // dan perlu di-prefix dengan domain masandigital.com
                        fullImageUrl = `https://masandigital.com/${fullImageUrl.startsWith('/') ? fullImageUrl.substring(1) : fullImageUrl}`;
                    }

                    // Buat link postingan, asumsikan ada properti 'slug' atau 'url'
                    const postLink = post.url || `https://masandigital.com/posts/${post.slug || post.id}`;

                    postElement.innerHTML = `
                        <h3><a href="${postLink}" target="_blank" rel="noopener noreferrer">${post.title}</a></h3>
                        ${fullImageUrl ? `<img src="${fullImageUrl}" alt="${post.title || 'Gambar Postingan'}" style="max-width:100%; height:auto;">` : ''}
                        <p>${post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : '')}</p>
                        <a href="${postLink}" target="_blank" rel="noopener noreferrer" class="read-more">Baca Selengkapnya</a>
                    `;
                    postsContainer.appendChild(postElement);
                });
            } else {
                postsContainer.innerHTML = '<p>Tidak ada postingan untuk ditampilkan.</p>';
            }

        } catch (error) {
            console.error('Gagal memuat atau memproses postingan:', error);
            if (postsContainer && !postsContainer.innerHTML.includes('CORS')) { // Jangan timpa pesan CORS
                postsContainer.innerHTML = '<p>Gagal memuat postingan. Silakan coba lagi nanti.</p>';
            }
        }
    }

    // Panggil fungsi untuk memuat postingan jika elemen #postsContainer ada di halaman
    if (document.getElementById('postsContainer')) {
        loadPosts();
    }
    // --- AKHIR TAMBAHAN ---
});
