// assets/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Bagian Navigasi dan Tahun (diasumsikan sudah ada dan benar) ---
    const navToggler = document.getElementById('navToggler');
    const navMenu = document.getElementById('navMenu');
    if (navToggler && navMenu) {
        navToggler.addEventListener('click', () => {
            const isExpanded = navToggler.getAttribute('aria-expanded') === 'true' || false;
            navToggler.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    // --- Akhir Bagian Navigasi dan Tahun ---

    console.log("[Masandigital Debug] Script dimulai. Mengecek elemen dasar...");

    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    if (!featuredPostsContainer) {
        console.error('[Masandigital Debug] KRITIS: Kontainer .featured-posts .posts-grid TIDAK DITEMUKAN. Artikel tidak bisa ditampilkan.');
        return; // Hentikan jika kontainer utama tidak ada
    }
    console.log("[Masandigital Debug] Kontainer .featured-posts .posts-grid ditemukan.");

    const allArticles = [ // PASTIKAN title, excerpt, dan altText diisi dengan benar!
        {
            slug: "activity-hotels-for-families-in-the-uk-a-comprehensive-guide",
            title: "Activity Hotels for Families in the UK: A Comprehensive Guide",
            excerpt: "Discover the best activity hotels in the UK, perfect for unforgettable family adventures and fun-filled stays...",
            altText: "Family enjoying activities at a hotel in the UK"
        },
        {
            slug: "adventure-getaway-destinations-a-comprehensive-guide",
            title: "Adventure Getaway Destinations: A Comprehensive Guide",
            excerpt: "Explore breathtaking adventure getaway destinations for thrill-seekers and explorers alike. Your next journey starts here...",
            altText: "Scenic view of an adventure destination with mountains and lakes"
        },
        {
            slug: "best-adventure-places-in-the-world-a-connoisseurs-guide",
            title: "Best Adventure Places in the World: A Connoisseur's Guide",
            excerpt: "Embark on a journey to the most thrilling adventure destinations across the globe, curated for the discerning traveler...",
            altText: "People kayaking in a stunning canyon"
        },
        {
            slug: "best-adventure-trips-in-europe-a-comprehensive-guide-for-the-discerning-traveler",
            title: "Best Adventure Trips in Europe: A Guide for the Discerning Traveler",
            excerpt: "Europe offers a diverse range of adventure trips, from hiking majestic mountains to exploring historic coastlines...",
            altText: "Hikers on a mountain trail in the European Alps"
        },
        {
            slug: "best-family-holiday-company-a-comprehensive-guide",
            title: "Best Family Holiday Company: A Comprehensive Guide",
            excerpt: "Planning a family vacation? Choosing the right holiday company can make all the difference for a memorable trip...",
            altText: "Happy family with luggage ready for a holiday"
        },
        {
            slug: "cheap-activity-holidays-uk-a-comprehensive-guide",
            title: "Cheap Activity Holidays UK: A Comprehensive Guide",
            excerpt: "Enjoy exciting and affordable activity holidays across the UK. Discover budget-friendly options for adventure...",
            altText: "Group of friends on a budget-friendly hike in the UK"
        },
        {
            slug: "cheap-adventure-holidays-europe-a-comprehensive-guide",
            title: "Cheap Adventure Holidays Europe: A Comprehensive Guide",
            excerpt: "Explore Europe's thrilling adventures without breaking the bank. This guide covers budget-friendly options...",
            altText: "Backpacker looking at a map in a European city square"
        },
        {
            slug: "east-coast-adventure-trips-a-comprehensive-guide",
            title: "East Coast Adventure Trips: A Comprehensive Guide",
            excerpt: "Discover the best adventure trips along the US East Coast, from serene trails to exciting water sports and vibrant cities...",
            altText: "Kayaking along a scenic East Coast shoreline at sunset"
        },
        {
            slug: "east-coast-adventure-vacations-a-comprehensive-guide",
            title: "East Coast Adventure Vacations: A Comprehensive Guide",
            excerpt: "Plan your next unforgettable adventure vacation on the East Coast with this detailed guide to top spots and activities...",
            altText: "Couple hiking on a picturesque East Coast trail"
        },
        {
            slug: "exploring-holidays-for-couples-a-comprehensive-guide",
            title: "Exploring Holidays for Couples: A Comprehensive Guide",
            excerpt: "Find the perfect romantic and adventurous holiday destinations for couples, from city breaks to secluded getaways...",
            altText: "Couple enjoying a scenic ocean view during their holiday"
        },
        {
            slug: "family-activity-holidays-england-a-comprehensive-guide",
            title: "Family Activity Holidays England: A Comprehensive Guide",
            excerpt: "Discover fun-filled family activity holidays across England, perfect for creating lasting memories and shared experiences...",
            altText: "Family exploring a historic castle grounds in England"
        },
        {
            slug: "family-activity-weekend-breaks-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks: A Comprehensive Guide",
            excerpt: "Plan a memorable and action-packed weekend getaway for the whole family with these great ideas for quick escapes...",
            altText: "Family cycling together on a scenic trail during a weekend break"
        },
        {
            slug: "family-activity-weekend-breaks-uk-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks UK: A Comprehensive Guide",
            excerpt: "Make the most of your weekend with exciting family activity breaks available throughout the UK for all ages...",
            altText: "Children enjoying a climbing wall activity during a UK weekend break"
        },
        {
            slug: "family-adventure-breaks-uk-a-comprehensive-guide",
            title: "Family Adventure Breaks UK: A Comprehensive Guide",
            excerpt: "Discover thrilling adventure breaks across the UK suitable for the entire family. Plan your next exciting escape...",
            altText: "Family zip-lining through a forest in the UK"
        },
        {
            slug: "family-sports-holidays-europe-a-comprehensive-guide",
            title: "Family Sports Holidays Europe: A Comprehensive Guide",
            excerpt: "Combine your love for sports with a family vacation in Europe. Explore top destinations and activities for active families...",
            altText: "Family playing beach volleyball on a European coast"
        },
        {
            slug: "great-family-holidays-abroad-a-comprehensive-guide",
            title: "Great Family Holidays Abroad: A Comprehensive Guide",
            excerpt: "Find the perfect international destination for your next family vacation with our detailed guide to amazing experiences...",
            altText: "Family posing happily on a beautiful beach during an international holiday"
        },
        {
            slug: "hotels-with-activities-for-families-a-comprehensive-guide",
            title: "Hotels with Activities for Families: A Comprehensive Guide",
            excerpt: "Discover hotels that offer more than just a stay. Our guide helps you find family-friendly resorts with engaging activities...",
            altText: "Family having fun at a resort pool with slides"
        },
        {
            slug: "kids-activity-holidays-uk-a-comprehensive-guide",
            title: "Kids Activity Holidays UK: A Comprehensive Guide",
            excerpt: "Keep your children entertained and active with these fantastic kid-friendly holiday options and activity centers in the UK...",
            altText: "Children participating in an outdoor adventure course in the UK"
        },
        {
            slug: "organized-trips-for-young-adults-a-comprehensive-guide",
            title: "Organized Trips for Young Adults: A Comprehensive Guide",
            excerpt: "Discover exciting and well-planned trips tailored for young adults seeking adventure, culture, and new experiences...",
            altText: "Group of young adults taking a selfie on an organized tour in a city"
        }
    ];

    const numberOfFeaturedPosts = 12;
    const siteBaseUrl = window.location.origin; // e.g., "https://masandigital.com"

    console.log(`[Masandigital Debug] Base URL situs: ${siteBaseUrl}`);
    console.log(`[Masandigital Debug] Jumlah artikel terdefinisi: ${allArticles.length}`);

    function getRandomArticles(articles, count) {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    function createArticleCardHTML(article, index) {
        const postUrl = `${siteBaseUrl}/posts/${article.slug}.html`; // Path absolut untuk link artikel
        
        // Membuat path absolut untuk gambar dari root domain
        const webpImageSrc = `${siteBaseUrl}/assets/images/${article.slug}-featured.webp`;
        const jpgImageSrc = `${siteBaseUrl}/assets/images/${article.slug}-featured.jpg`;
        
        const articleId = `article-title-featured-${index + 1}`;

        console.log(`[Masandigital Debug] Memproses Artikel: "${article.title}" (slug: ${article.slug})`);
        console.log(`  -> URL WebP yang akan digunakan: ${webpImageSrc}`);
        console.log(`  -> URL JPG yang akan digunakan: ${jpgImageSrc}`);
        console.log(`  -> URL Post: ${postUrl}`);

        // Fungsi untuk error handler gambar
        const handleError = (imgElement, attemptedSrc) => {
            console.error(`[Masandigital Debug] GAGAL MEMUAT GAMBAR: ${attemptedSrc}. Slug: ${article.slug}`);
            const parentDiv = imgElement.closest('.article-image');
            if (parentDiv) {
                parentDiv.innerHTML = `<div style="width:100%; aspect-ratio: 2/1; background:#f0f0f0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#777; text-align:center; border:1px solid #ddd; box-sizing:border-box; padding:10px; font-size:0.9em;">
                                        <p style="margin:0 0 5px 0; font-weight:bold;">Image not found</p>
                                        <p style="margin:0; word-break:break-all;">${attemptedSrc.split('/').pop()}</p>
                                     </div>`;
            }
        };
        
        // Membuat elemen gambar secara dinamis untuk kontrol error yang lebih baik
        const pictureElement = document.createElement('picture');
        
        const sourceWebp = document.createElement('source');
        sourceWebp.srcset = webpImageSrc;
        sourceWebp.type = 'image/webp';
        
        const sourceJpg = document.createElement('source'); // Fallback kedua jika webp gagal dan jpg juga gagal di <source>
        sourceJpg.srcset = jpgImageSrc;
        sourceJpg.type = 'image/jpeg';

        const imgElement = document.createElement('img');
        imgElement.src = jpgImageSrc; // Default src
        imgElement.alt = article.altText || `Featured image for ${article.title}`;
        imgElement.width = 360;
        imgElement.height = 180;
        imgElement.loading = 'lazy';
        imgElement.onerror = () => handleError(imgElement, imgElement.src); // Error pada <img> utama

        sourceWebp.onerror = () => { // Jika <source webp> gagal, browser akan coba <source jpg> atau <img>. Ini untuk logging.
            console.warn(`[Masandigital Debug] Gagal memuat source WebP: ${webpImageSrc} untuk slug: ${article.slug}. Mencoba JPG.`);
        };

        pictureElement.appendChild(sourceWebp);
        pictureElement.appendChild(sourceJpg); // Tambahkan source JPG sebelum img
        pictureElement.appendChild(imgElement);

        // Membuat string HTML untuk kartu artikel
        // Kita akan memasukkan elemen gambar yang sudah dibuat ke dalamnya nanti
        // Untuk sementara, kita buat placeholder untuk div gambar.
        const articleCardDiv = document.createElement('article');
        articleCardDiv.className = 'article-card';
        articleCardDiv.setAttribute('aria-labelledby', articleId);

        const articleImageDiv = document.createElement('div');
        articleImageDiv.className = 'article-image';
        const linkImage = document.createElement('a');
        linkImage.href = postUrl;
        linkImage.appendChild(pictureElement); // Masukkan elemen <picture> yang sudah dibuat
        articleImageDiv.appendChild(linkImage);
        
        const articleContentDiv = document.createElement('div');
        articleContentDiv.className = 'article-content';
        articleContentDiv.innerHTML = `
            <h3 class="article-title" id="${articleId}"><a href="${postUrl}">${article.title}</a></h3>
            <p class="excerpt">${article.excerpt || 'Read more about this topic.'}</p>
            <a href="${postUrl}" class="read-more">Read More <span class="visually-hidden">about ${article.title}</span>→</a>
        `;

        articleCardDiv.appendChild(articleImageDiv);
        articleCardDiv.appendChild(articleContentDiv);
        
        return articleCardDiv; // Mengembalikan elemen DOM, bukan string HTML
    }

    if (allArticles.length > 0) {
        featuredPostsContainer.innerHTML = ''; // Kosongkan konten statis
        const randomArticles = getRandomArticles(allArticles, numberOfFeaturedPosts);
        console.log(`[Masandigital Debug] Akan menampilkan ${randomArticles.length} artikel unggulan.`);
        
        randomArticles.forEach((article, index) => {
            const cardElement = createArticleCardHTML(article, index);
            featuredPostsContainer.appendChild(cardElement); // Tambahkan elemen DOM ke kontainer
        });
        console.log("[Masandigital Debug] Semua kartu artikel telah ditambahkan ke DOM.");
    } else {
        featuredPostsContainer.innerHTML = '<p>No featured articles to display at the moment.</p>';
        console.warn("[Masandigital Debug] Tidak ada artikel yang didefinisikan dalam 'allArticles'.");
    }
    console.log("[Masandigital Debug] Script artikel unggulan selesai dijalankan.");
});
