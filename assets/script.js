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

    // --- Logika Artikel Unggulan (Featured Articles) ---
    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    if (!featuredPostsContainer) {
        console.error('[Masandigital Debug] KRITIS: Kontainer .featured-posts .posts-grid TIDAK DITEMUKAN. Artikel unggulan tidak bisa ditampilkan.');
    } else {
        console.log("[Masandigital Debug] Kontainer .featured-posts .posts-grid ditemukan.");
    }

    const allArticlesData = [ // Data untuk artikel unggulan dan bisa juga untuk sidebar jika diperlukan
        // PASTIKAN SEMUA DATA INI BENAR DAN SESUAI DENGAN ARTIKEL ANDA
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
    const siteBaseUrl = window.location.origin;

    console.log(`[Masandigital Debug] Base URL situs: ${siteBaseUrl}`);
    console.log(`[Masandigital Debug] Jumlah artikel terdefinisi untuk data: ${allArticlesData.length}`);

    function shuffleArray(array) {
        const newArray = [...array]; // Buat salinan agar tidak mengubah array asli
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Tukar elemen
        }
        return newArray;
    }

    // Fungsi untuk Artikel Unggulan
    function displayFeaturedArticles() {
        if (!featuredPostsContainer) return; // Keluar jika kontainer tidak ada

        function createFeaturedArticleCardElement(article) {
            const postUrl = `${siteBaseUrl}/posts/${article.slug}.html`;
            const webpImageSrc = `${siteBaseUrl}/assets/images/${article.slug}-featured.webp`;
            const jpgImageSrc = `${siteBaseUrl}/assets/images/${article.slug}-featured.jpg`;
            const articleId = `article-title-featured-${article.slug.substring(0,10)}-${Math.random().toString(36).substring(2, 7)}`;


            console.log(`[Masandigital Debug FEATURED] Memproses Artikel: "${article.title}" (slug: ${article.slug})`);
            console.log(`  -> URL WebP: ${webpImageSrc}`);
            console.log(`  -> URL JPG: ${jpgImageSrc}`);

            const handleError = (imgElement, attemptedSrc) => {
                console.error(`[Masandigital Debug FEATURED] GAGAL MEMUAT GAMBAR: ${attemptedSrc}. Slug: ${article.slug}`);
                const parentDiv = imgElement.closest('.article-image');
                if (parentDiv) {
                    parentDiv.innerHTML = `<div style="width:100%; aspect-ratio: 2/1; background:#f0f0f0; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#777; text-align:center; border:1px solid #ddd; box-sizing:border-box; padding:10px; font-size:0.9em;">
                                            <p style="margin:0 0 5px 0; font-weight:bold;">Image not found</p>
                                            <p style="margin:0; word-break:break-all;">${attemptedSrc.split('/').pop()}</p>
                                         </div>`;
                }
            };
            
            const pictureElement = document.createElement('picture');
            const sourceWebp = document.createElement('source');
            sourceWebp.srcset = webpImageSrc;
            sourceWebp.type = 'image/webp';
            const sourceJpg = document.createElement('source');
            sourceJpg.srcset = jpgImageSrc;
            sourceJpg.type = 'image/jpeg';
            const imgElement = document.createElement('img');
            imgElement.src = jpgImageSrc;
            imgElement.alt = article.altText || `Featured image for ${article.title}`;
            imgElement.width = 360;
            imgElement.height = 180;
            imgElement.loading = 'lazy';
            imgElement.onerror = () => handleError(imgElement, imgElement.src);

            pictureElement.appendChild(sourceWebp);
            pictureElement.appendChild(sourceJpg);
            pictureElement.appendChild(imgElement);

            const articleCardDiv = document.createElement('article');
            articleCardDiv.className = 'article-card';
            articleCardDiv.setAttribute('aria-labelledby', articleId);

            const articleImageDiv = document.createElement('div');
            articleImageDiv.className = 'article-image';
            const linkImage = document.createElement('a');
            linkImage.href = postUrl;
            linkImage.appendChild(pictureElement);
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
            return articleCardDiv;
        }

        if (allArticlesData.length > 0) {
            featuredPostsContainer.innerHTML = '';
            const randomArticlesForFeatured = shuffleArray(allArticlesData).slice(0, numberOfFeaturedPosts);
            console.log(`[Masandigital Debug FEATURED] Akan menampilkan ${randomArticlesForFeatured.length} artikel unggulan.`);
            
            randomArticlesForFeatured.forEach(article => {
                const cardElement = createFeaturedArticleCardElement(article);
                featuredPostsContainer.appendChild(cardElement);
            });
            console.log("[Masandigital Debug FEATURED] Semua kartu artikel unggulan telah ditambahkan ke DOM.");
        } else {
            featuredPostsContainer.innerHTML = '<p>No featured articles to display at the moment.</p>';
            console.warn("[Masandigital Debug FEATURED] Tidak ada artikel yang didefinisikan dalam 'allArticlesData'.");
        }
    }

    // --- Logika Acak "All Articles" di Sidebar ---
    function randomizeSidebarArticles() {
        const sidebarPostsListContainer = document.querySelector('.all-posts-sidebar .posts-list-sidebar');
        if (!sidebarPostsListContainer) {
            console.warn('[Masandigital Debug SIDEBAR] Kontainer .posts-list-sidebar TIDAK DITEMUKAN. Tidak bisa mengacak artikel sidebar.');
            return;
        }
        console.log("[Masandigital Debug SIDEBAR] Kontainer .posts-list-sidebar ditemukan.");

        const sidebarItems = Array.from(sidebarPostsListContainer.querySelectorAll('.post-list-item-sidebar'));
        
        if (sidebarItems.length === 0) {
            console.log("[Masandigital Debug SIDEBAR] Tidak ada item .post-list-item-sidebar ditemukan di sidebar.");
            return;
        }
        console.log(`[Masandigital Debug SIDEBAR] Ditemukan ${sidebarItems.length} item artikel di sidebar.`);

        const shuffledSidebarItems = shuffleArray(sidebarItems);

        // Kosongkan kontainer sebelum menambahkan yang sudah diacak
        sidebarPostsListContainer.innerHTML = ''; 

        shuffledSidebarItems.forEach(item => {
            sidebarPostsListContainer.appendChild(item);
        });
        console.log("[Masandigital Debug SIDEBAR] Artikel di sidebar telah diacak dan dimasukkan kembali ke DOM.");
    }

    // Panggil fungsi-fungsi
    if (featuredPostsContainer) { // Hanya jalankan jika kontainer artikel unggulan ada
       displayFeaturedArticles();
    }
    randomizeSidebarArticles(); // Selalu coba acak sidebar

    console.log("[Masandigital Debug] Script utama selesai dijalankan.");
});
