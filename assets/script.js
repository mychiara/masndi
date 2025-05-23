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
    // Data ini dihasilkan berdasarkan file di:
    // Posts: https://github.com/mychiara/masndi/tree/main/posts
    // Images: https://github.com/mychiara/masndi/tree/main/assets/images
    //
    // PENTING:
    // 1. Periksa dan sesuaikan 'title' agar lebih alami dan benar.
    // 2. Ganti 'date' dengan tanggal publikasi yang sebenarnya untuk setiap artikel.
    // 3. Perbarui 'altText' agar deskriptif untuk setiap gambar.
    // 4. Tulis 'excerpt' yang menarik untuk setiap artikel.
    // 5. Pastikan file HTML artikel ada di folder 'posts/' dan gambar ada di 'assets/images/'
    //    dengan nama file '{slug}-featured.jpg' dan '{slug}-featured.webp'.

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

    const postsData = postSlugs.map(slug => {
        const title = generateTitleFromSlug(slug);
        // Anda HARUS mengganti tanggal ini dengan tanggal publikasi yang sebenarnya
        const placeholderDate = "2024-07-27"; // Ganti dengan tanggal yang relevan

        return {
            slug: slug,
            title: title,
            date: placeholderDate,
            imageJpg: `assets/images/${slug}-featured.jpg`,
            imageWebp: `assets/images/${slug}-featured.webp`,
            // Anda HARUS mengganti altText ini
            altText: `${title} - Featured image`,
            // Anda HARUS mengganti excerpt ini
            excerpt: `Discover more about ${title}. Our comprehensive guide covers everything you need to know for an unforgettable experience.`
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

    // --- Populate Featured Articles ---
    const featuredPostsContainer = document.querySelector('.posts-grid');
    const numberOfFeaturedPosts = 4; // Display the first X newest posts as featured

    if (featuredPostsContainer) {
        const sortedPosts = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedPosts.slice(0, numberOfFeaturedPosts).forEach((post, index) => {
            const articleId = `article-title-featured-${index + 1}`;
            const postUrl = `posts/${post.slug}.html`;

            const imageJpg = post.imageJpg;
            const imageWebp = post.imageWebp;

            const articleCard = `
                <article class="article-card" aria-labelledby="${articleId}">
                    <div class="article-image">
                        <a href="${postUrl}">
                            <picture>
                                <source srcset="${imageWebp}" type="image/webp">
                                <source srcset="${imageJpg}" type="image/jpeg">
                                <img src="${imageJpg}" alt="${post.altText}" width="360" height="180" loading="lazy">
                            </picture>
                        </a>
                    </div>
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
