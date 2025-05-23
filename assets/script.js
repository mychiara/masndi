document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Toggler ---
    const navToggler = document.getElementById('navToggler');
    const navMenu = document.getElementById('navMenu');

    if (navToggler && navMenu) {
        navToggler.addEventListener('click', () => {
            const isExpanded = navToggler.getAttribute('aria-expanded') === 'true' || false;
            navToggler.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // --- Current Year for Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Fetch and Display Posts ---
    fetchAndDisplayPosts();
});

async function preliminaryApiTest(owner, repo) {
    const testApiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    console.log(`Running preliminary API test to: ${testApiUrl}`);
    try {
        const response = await fetch(testApiUrl, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        console.log(`Preliminary API Test - Status: ${response.status}, OK: ${response.ok}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Preliminary API Test - Failed. Response text: ${errorText}`);
            return false;
        }
        const data = await response.json();
        console.log('Preliminary API Test - Success. Data received for repo:', data.full_name);
        return true;
    } catch (error) {
        console.error('Preliminary API Test - Network or other error:', error);
        return false;
    }
}

async function fetchAndDisplayPosts() {
    const owner = 'mychiara'; // Pastikan ini benar
    const repo = 'masndi';   // Pastikan ini benar
    const postsDir = 'posts'; // Pastikan ini nama direktori yang benar (case-sensitive)

    const apiTestSuccessful = await preliminaryApiTest(owner, repo);
    if (!apiTestSuccessful) {
        console.error("Preliminary GitHub API test failed. Aborting posts fetch.");
        const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
        const allPostsSidebarContainer = document.querySelector('.all-posts-sidebar .posts-list-sidebar');
        if (featuredPostsContainer) featuredPostsContainer.innerHTML = `<p class="error-message">Could not connect to GitHub API.</p>`;
        if (allPostsSidebarContainer) allPostsSidebarContainer.innerHTML = `<p class="error-message">Could not connect to GitHub API.</p>`;
        return;
    }
    console.log("Preliminary GitHub API test successful. Proceeding to fetch posts.");

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${postsDir}`;
    
    const siteBaseUrl = `https://${owner}.github.io/${repo}/`;
    const postsBaseUrl = `${siteBaseUrl}${postsDir}/`; // Menggunakan postsDir di sini
    const imagesBaseUrl = `${siteBaseUrl}assets/images/`; // Asumsi path gambar

    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    const allPostsSidebarContainer = document.querySelector('.all-posts-sidebar .posts-list-sidebar');

    console.log('Fetching Posts - Details:');
    console.log('Owner:', owner);
    console.log('Repo:', repo);
    console.log('Posts Directory:', postsDir);
    console.log('Constructed API URL for posts:', apiUrl);

    if (featuredPostsContainer) {
        featuredPostsContainer.innerHTML = '<p class="loading-message">Loading articles...</p>';
    }
    if (allPostsSidebarContainer) {
        allPostsSidebarContainer.innerHTML = '<p class="loading-message">Loading article list...</p>';
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        console.log('Fetch Posts - API Response Status:', response.status);
        console.log('Fetch Posts - API Response OK:', response.ok);

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Fetch Posts - GitHub API Response Text (if error):', errorText);
            throw new Error(`GitHub API error for ${postsDir}: ${response.status} ${response.statusText}`);
        }
        
        const files = await response.json();
        console.log(`Fetch Posts - Files received from API for directory '${postsDir}':`, files);

        // Pastikan files adalah array
        if (!Array.isArray(files)) {
            console.error(`Expected an array of files from API for directory '${postsDir}', but received:`, files);
            throw new Error(`Invalid data structure received from API for ${postsDir}.`);
        }

        const htmlFiles = files.filter(file => file.name && file.name.endsWith('.html') && file.type === 'file');

        if (htmlFiles.length === 0) {
            if (featuredPostsContainer) featuredPostsContainer.innerHTML = `<p>No articles found in the '${postsDir}' directory.</p>`;
            if (allPostsSidebarContainer) allPostsSidebarContainer.innerHTML = `<p>No articles found in the '${postsDir}' directory.</p>`;
            console.warn(`No HTML files found in ${postsDir}. Ensure files exist and the 'postsDir' variable is correct.`);
            return;
        }

        const postsData = htmlFiles.map((file, index) => {
            // `file.name` sudah memiliki kapitalisasi yang benar dari API
            // Contoh: "Ini-Artikel-Saya.html"
            const slugWithExtension = file.name;
            const slug = slugWithExtension.replace('.html', ''); // Contoh: "Ini-Artikel-Saya"
            
            // Membuat judul dari slug: "Ini Artikel Saya"
            const title = slug.split('-')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ');
            
            return {
                id: `article-dynamic-${index + 1}`,
                title: title,
                // URL postingan menggunakan nama file asli (dengan kapitalisasi)
                url: `${postsBaseUrl}${slugWithExtension}`,
                // URL gambar menggunakan slug (yang berasal dari nama file asli)
                imgWebp: `${imagesBaseUrl}${slug}-featured.webp`,
                imgJpg: `${imagesBaseUrl}${slug}-featured.jpg`,
                // Excerpt generik
                excerpt: `Jelajahi wawasan dan detail tentang "${title}". Petualangan Anda dimulai di sini dengan panduan komprehensif kami.`,
                // Tanggal placeholder
                date: "2025-05-18", 
                displayDate: "18/05/2025" // Sesuaikan format jika perlu
            };
        });

        // Acak postingan untuk variasi di "Featured Articles"
        const shuffledPosts = [...postsData].sort(() => 0.5 - Math.random());

        // Isi "Featured Articles" (misalnya, 4 postingan pertama yang diacak)
        if (featuredPostsContainer) {
            featuredPostsContainer.innerHTML = ''; 
            const numFeatured = Math.min(shuffledPosts.length, 4);
            if (numFeatured > 0) {
                for (let i = 0; i < numFeatured; i++) {
                    const post = shuffledPosts[i];
                    const articleEl = createFeaturedArticleElement(post);
                    featuredPostsContainer.appendChild(articleEl);
                }
            } else {
                 featuredPostsContainer.innerHTML = '<p>Tidak ada artikel untuk ditampilkan saat ini.</p>';
            }
        }

        // Isi "All Articles" di Sidebar (urutkan berdasarkan judul untuk konsistensi)
        if (allPostsSidebarContainer) {
            allPostsSidebarContainer.innerHTML = ''; 
            const sortedPostsForSidebar = [...postsData].sort((a, b) => a.title.localeCompare(b.title));
            if (sortedPostsForSidebar.length > 0) {
                sortedPostsForSidebar.forEach(post => {
                    const listItemEl = createSidebarListItemElement(post);
                    allPostsSidebarContainer.appendChild(listItemEl);
                });
            } else {
                 allPostsSidebarContainer.innerHTML = '<p>Tidak ada artikel tersedia dalam daftar.</p>';
            }
        }

    } catch (error) {
        console.error('Error fetching or displaying posts:', error);
        if (featuredPostsContainer) {
            featuredPostsContainer.innerHTML = `<p class="error-message">Tidak dapat memuat artikel. ${error.message}</p>`;
        }
        if (allPostsSidebarContainer) {
            allPostsSidebarContainer.innerHTML = `<p class="error-message">Tidak dapat memuat daftar artikel. ${error.message}</p>`;
        }
    }
}

function createFeaturedArticleElement(post) {
    const articleCard = document.createElement('article');
    articleCard.classList.add('article-card');
    articleCard.setAttribute('aria-labelledby', `${post.id}-title`);

    // Periksa apakah URL gambar valid (sederhana, hanya untuk tidak error jika path aneh)
    // Anda bisa menambahkan validasi yang lebih canggih jika perlu
    const isValidImageUrl = (url) => {
        try {
            new URL(url); // Coba buat objek URL
            return true;
        } catch (_) {
            return false; // Jika gagal, URL tidak valid
        }
    };

    const imgWebpSrc = isValidImageUrl(post.imgWebp) ? post.imgWebp : '';
    const imgJpgSrc = isValidImageUrl(post.imgJpg) ? post.imgJpg : 'assets/images/placeholder-image.jpg'; // Fallback jika JPG juga tidak valid

    articleCard.innerHTML = `
        <div class="article-image">
            <a href="${post.url}">
                <picture>
                    ${imgWebpSrc ? `<source srcset="${imgWebpSrc}" type="image/webp">` : ''}
                    <source srcset="${imgJpgSrc}" type="image/jpeg">
                    <img src="${imgJpgSrc}" alt="Gambar unggulan untuk ${post.title}" width="360" height="180" loading="lazy" 
                         onerror="this.onerror=null; this.src='assets/images/placeholder-image.jpg'; this.alt='Gambar tidak ditemukan';">
                </picture>
            </a>
        </div>
        <div class="article-content">
            <h3 class="article-title" id="${post.id}-title"><a href="${post.url}">${post.title}</a></h3>
            <p class="excerpt">${post.excerpt}</p>
            <a href="${post.url}" class="read-more">Baca Selengkapnya <span class="visually-hidden">tentang ${post.title}</span>→</a>
        </div>
    `;
    return articleCard;
}

function createSidebarListItemElement(post) {
    const listItem = document.createElement('div');
    listItem.classList.add('post-list-item-sidebar');
    listItem.innerHTML = `
        <h3 class="post-list-title-sidebar"><a href="${post.url}">${post.title}</a></h3>
        <div class="post-meta-sidebar"><time datetime="${post.date}">${post.displayDate}</time></div>
    `;
    return listItem;
}

// Gaya dasar untuk placeholder (tambahkan ke style.css Anda jika ingin lebih baik)
const style = document.createElement('style');
style.innerHTML = `
.missing-image-placeholder, img[alt='Gambar tidak ditemukan'] { /* Targetkan juga img yang error */
    width: 100%; /* Biarkan gambar mengisi container */
    height: 180px; /* Atau gunakan aspect-ratio jika didukung */
    background-color: #f0f0f0;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    border: 1px dashed #ccc;
    box-sizing: border-box;
    object-fit: cover; /* Untuk placeholder jika ukurannya tetap */
}
.article-image picture {
    display: block; 
}
.loading-message, .error-message {
    padding: 20px;
    text-align: center;
    color: #555;
}
.error-message {
    color: red;
    font-weight: bold;
}
`;
document.head.appendChild(style);

// Tambahkan placeholder jika Anda belum punya
// Anda perlu membuat file assets/images/placeholder-image.jpg
// atau ganti path di atas dengan gambar placeholder yang Anda miliki.
// console.log("Pastikan Anda memiliki 'assets/images/placeholder-image.jpg' atau ganti path fallback gambar.");
