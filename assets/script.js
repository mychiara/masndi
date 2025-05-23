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

    // --- FUNGSI UNTUK MEMUAT DAN MENAMPILKAN POSTINGAN ---
    async function loadAndDisplayPosts() {
        const featuredPostsGrid = document.getElementById('featuredPostsGrid');
        const allPostsListSidebar = document.getElementById('allPostsListSidebar');
        const postsDataUrl = 'https://masandigital.com/posts/posts-data.json'; // URL ke file JSON Anda

        try {
            const response = await fetch(postsDataUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const posts = await response.json();

            // Kosongkan pesan loading
            if (featuredPostsGrid) featuredPostsGrid.innerHTML = '';
            if (allPostsListSidebar) allPostsListSidebar.innerHTML = '';

            if (posts && posts.length > 0) {
                posts.forEach(post => {
                    const postUrl = `https://masandigital.com/posts/${post.slug}.html`;
                    // Pastikan path gambar diawali dengan domain jika belum absolut
                    let imageUrl = post.image;
                    if (imageUrl && !imageUrl.startsWith('http')) {
                        imageUrl = `https://masandigital.com/${imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl}`;
                    }

                    // Buat elemen untuk daftar semua artikel di sidebar
                    if (allPostsListSidebar) {
                        const listItem = document.createElement('div');
                        listItem.classList.add('sidebar-post-item');
                        listItem.innerHTML = `
                            <a href="${postUrl}" class="sidebar-post-title">${post.title}</a>
                            ${post.date ? `<p class="sidebar-post-date">${new Date(post.date).toLocaleDateString()}</p>` : ''}
                        `;
                        allPostsListSidebar.appendChild(listItem);
                    }

                    // Buat elemen untuk artikel unggulan di grid utama
                    if (post.isFeatured && featuredPostsGrid) {
                        const articleElement = document.createElement('article');
                        articleElement.classList.add('post-card'); // Anda mungkin perlu class CSS untuk ini
                        articleElement.innerHTML = `
                            ${imageUrl ? `<a href="${postUrl}"><img src="${imageUrl}" alt="${post.title}" class="post-card-image" loading="lazy"></a>` : ''}
                            <div class="post-card-content">
                                ${post.category ? `<span class="post-card-category">${post.category}</span>` : ''}
                                <h3 class="post-card-title"><a href="${postUrl}">${post.title}</a></h3>
                                <p class="post-card-excerpt">${post.excerpt}</p>
                                <a href="${postUrl}" class="post-card-readmore">Read More →</a>
                            </div>
                        `;
                        featuredPostsGrid.appendChild(articleElement);
                    }
                });

                // Jika tidak ada artikel unggulan yang ditemukan
                if (featuredPostsGrid && featuredPostsGrid.children.length === 0) {
                     featuredPostsGrid.innerHTML = '<p>No featured articles available at the moment.</p>';
                }

            } else {
                if (featuredPostsGrid) featuredPostsGrid.innerHTML = '<p>No articles found.</p>';
                if (allPostsListSidebar) allPostsListSidebar.innerHTML = '<p>No articles found.</p>';
            }

        } catch (error) {
            console.error('Error loading posts:', error);
            if (featuredPostsGrid) featuredPostsGrid.innerHTML = '<p>Error loading articles. Please try again later.</p>';
            if (allPostsListSidebar) allPostsListSidebar.innerHTML = '<p>Error loading article list.</p>';
        }
    }

    // Panggil fungsi untuk memuat postingan
    // Pastikan elemen target ada sebelum memanggil
    if (document.getElementById('featuredPostsGrid') || document.getElementById('allPostsListSidebar')) {
        loadAndDisplayPosts();
    }

    // Optional: Smooth scroll (jika Anda menggunakannya)
    // Pastikan semua link yang dituju ada di domain masandigital.com jika ini adalah Single Page App
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => { // Ini untuk hash link internal halaman
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
});
