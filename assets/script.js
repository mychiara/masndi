// assets/script.js

document.addEventListener('DOMContentLoaded', function() {

    // Helper function to generate a title from a slug
    function generateTitleFromSlug(slug) {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // --- Content Data ---
    // Data ini dihasilkan berdasarkan file yang terlihat di:
    // Posts: https://github.com/mychiara/masndi/tree/main/posts
    //
    // !!! PENTING SEKALI UNTUK ANDA PERIKSA DAN PERBARUI !!!
    // 1. PASTIKAN SEMUA FILE HTML ARTIKEL (dari daftar slug di bawah) BENAR-BENAR ADA
    //    di folder 'posts/' lokal Anda dengan nama yang SAMA PERSIS (termasuk huruf besar/kecil).
    // 2. Periksa dan sesuaikan 'title' agar lebih alami dan benar.
    // 3. Ganti 'date' dengan tanggal publikasi yang sebenarnya untuk setiap artikel.
    // 4. Meskipun tidak ditampilkan di homepage, 'imageJpg', 'imageWebp', dan 'altText'
    //    mungkin masih berguna untuk halaman artikel individual. Isi dengan benar.
    // 5. Tulis 'excerpt' yang menarik untuk setiap artikel.

    const postSlugs = [
        "activity-hotels-for-families-in-the-uk-a-comprehensive-guide",
        "adventure-getaway-destinations-a-comprehensive-guide",
        "best-adventure-places-in-the-world-a-connoisseurs-guide",
        "best-adventure-trips-in-europe-a-comprehensive-guide-for-the-discerning-traveler",
        "best-family-holiday-company-a-comprehensive-guide",
        "cheap-activity-holidays-uk-a-comprehensive-guide",
        "cheap-adventure-holidays-europe-a-comprehensive-guide",
        "east-coast-adventure-trips-a-comprehensive-guide",
        "east-coast-adventure-vacations-a-comprehensive-guide",
        "exploring-holidays-for-couples-a-comprehensive-guide",
        "family-activity-holidays-england-a-comprehensive-guide",
        "family-activity-weekend-breaks-a-comprehensive-guide",
        "family-activity-weekend-breaks-uk-a-comprehensive-guide",
        "family-adventure-breaks-uk-a-comprehensive-guide",
        "family-sports-holidays-europe-a-comprehensive-guide",
        "great-family-holidays-abroad-a-comprehensive-guide",
        "hotels-with-activities-for-families-a-comprehensive-guide",
        "kids-activity-holidays-uk-a-comprehensive-guide",
        "organized-trips-for-young-adults-a-comprehensive-guide"
    ];

    const postsData = postSlugs.map((slug, index) => {
        const title = generateTitleFromSlug(slug);
        // Anda HARUS mengganti tanggal ini dengan tanggal publikasi yang sebenarnya
        // Saya akan membuat tanggal yang berbeda agar pengurutan terlihat
        const baseDate = new Date(2024, 6, 27); // 27 Juli 2024
        baseDate.setDate(baseDate.getDate() - index); // Membuat tanggal mundur untuk setiap artikel
        const placeholderDate = baseDate.toISOString().split('T')[0];

        return {
            slug: slug,
            title: title, // WAJIB DISESUAIKAN
            date: placeholderDate, // WAJIB DIGANTI DENGAN TANGGAL ASLI
            imageJpg: `assets/images/${slug}-featured.jpg`, // Untuk halaman artikel, jika perlu
            imageWebp: `assets/images/${slug}-featured.webp`, // Untuk halaman artikel, jika perlu
            altText: `${title} - Featured image`, // WAJIB DISESUAIKAN
            excerpt: `Discover more about ${title}. Our comprehensive guide covers everything you need to know.`, // WAJIB DISESUAIKAN
        };
    });

    // --- Helper Function to Format Date ---
    function formatDate(isoDate) {
        if (!isoDate) return '';
        if (isoDate.includes('/')) { // Already formatted
            return isoDate;
        }
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    // --- Populate Featured Articles (TANPA GAMBAR) ---
    const featuredPostsContainer = document.querySelector('.posts-grid');
    const numberOfFeaturedPosts = 4;

    if (featuredPostsContainer) {
        // Sort posts by date, newest first.
        const sortedPosts = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedPosts.slice(0, numberOfFeaturedPosts).forEach((post, index) => {
            const articleId = `article-title-featured-${index + 1}`;
            const postUrl = `posts/${post.slug}.html`;

            // Elemen gambar dihilangkan dari output untuk featured articles
            const articleCard = `
                <article class="article-card article-card-no-image" aria-labelledby="${articleId}">
                    <div class="article-content">
                        <h3 class="article-title" id="${articleId}"><a href="${postUrl}">${post.title}</a></h3>
                        <p class="excerpt">${post.excerpt}</p>
                        <a href="${postUrl}" class="read-more">Read More <span class="visually-hidden">about ${post.title}</span>→</a>
                    </div>
                </article>
            `;
            featuredPostsContainer.innerHTML += articleCard;
        });
    }

    // --- Populate All Articles in Sidebar ---
    const allPostsSidebarContainer = document.querySelector('.posts-list-sidebar');
    if (allPostsSidebarContainer) {
        // Sort posts by date for the sidebar as well, newest first.
        const sortedPostsForSidebar = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedPostsForSidebar.forEach(post => {
            const postUrl = `posts/${post.slug}.html`;
            const listItem = `
                <div class="post-list-item-sidebar">
                    <h3 class="post-list-title-sidebar"><a href="${postUrl}">${post.title}</a></h3>
                    <div class="post-meta-sidebar"><time datetime="${post.date}">${formatDate(post.date)}</time></div>
                </div>
            `;
            allPostsSidebarContainer.innerHTML += listItem;
        });
    }

    // --- Mobile Navigation Toggle ---
    const navToggler = document.getElementById('navToggler');
    const navMenu = document.getElementById('navMenu');

    if (navToggler && navMenu) {
        navToggler.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggler.classList.toggle('active');
            const isExpanded = navToggler.getAttribute('aria-expanded') === 'true' || false;
            navToggler.setAttribute('aria-expanded', !isExpanded);
            navToggler.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
        });
    }

    // --- Update Copyright Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
