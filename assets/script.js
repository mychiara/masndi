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

    // --- Logika Artikel Unggulan ---
    const allArticles = [
        {
            slug: "activity-hotels-for-families-in-the-uk-a-comprehensive-guide",
            title: "Activity Hotels for Families in the UK: A Comprehensive Guide", // GANTI DENGAN JUDUL SEBENARNYA
            excerpt: "Discover the best activity hotels in the UK, perfect for unforgettable family adventures and fun-filled stays...", // GANTI DENGAN KUTIPAN SEBENARNYA
            altText: "Family enjoying activities at a hotel in the UK" // GANTI DENGAN ALT TEXT SEBENARNYA
        },
        {
            slug: "adventure-getaway-destinations-a-comprehensive-guide",
            title: "Adventure Getaway Destinations: A Comprehensive Guide", // GANTI
            excerpt: "Explore breathtaking adventure getaway destinations for thrill-seekers and explorers alike. Your next journey starts here...", // GANTI
            altText: "Scenic view of an adventure destination with mountains and lakes" // GANTI
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
            title: "Cheap Activity Holidays UK: A Comprehensive Guide", // GANTI
            excerpt: "Enjoy exciting and affordable activity holidays across the UK. Discover budget-friendly options for adventure...", // GANTI
            altText: "Group of friends on a budget-friendly hike in the UK" // GANTI
        },
        {
            slug: "cheap-adventure-holidays-europe-a-comprehensive-guide",
            title: "Cheap Adventure Holidays Europe: A Comprehensive Guide", // GANTI
            excerpt: "Explore Europe's thrilling adventures without breaking the bank. This guide covers budget-friendly options...", // GANTI
            altText: "Backpacker looking at a map in a European city square" // GANTI
        },
        {
            slug: "east-coast-adventure-trips-a-comprehensive-guide",
            title: "East Coast Adventure Trips: A Comprehensive Guide", // GANTI
            excerpt: "Discover the best adventure trips along the US East Coast, from serene trails to exciting water sports and vibrant cities...", // GANTI
            altText: "Kayaking along a scenic East Coast shoreline at sunset" // GANTI
        },
        {
            slug: "east-coast-adventure-vacations-a-comprehensive-guide",
            title: "East Coast Adventure Vacations: A Comprehensive Guide", // GANTI
            excerpt: "Plan your next unforgettable adventure vacation on the East Coast with this detailed guide to top spots and activities...", // GANTI
            altText: "Couple hiking on a picturesque East Coast trail" // GANTI
        },
        {
            slug: "exploring-holidays-for-couples-a-comprehensive-guide",
            title: "Exploring Holidays for Couples: A Comprehensive Guide", // GANTI
            excerpt: "Find the perfect romantic and adventurous holiday destinations for couples, from city breaks to secluded getaways...", // GANTI
            altText: "Couple enjoying a scenic ocean view during their holiday" // GANTI
        },
        {
            slug: "family-activity-holidays-england-a-comprehensive-guide",
            title: "Family Activity Holidays England: A Comprehensive Guide", // GANTI
            excerpt: "Discover fun-filled family activity holidays across England, perfect for creating lasting memories and shared experiences...", // GANTI
            altText: "Family exploring a historic castle grounds in England" // GANTI
        },
        {
            slug: "family-activity-weekend-breaks-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks: A Comprehensive Guide", // GANTI
            excerpt: "Plan a memorable and action-packed weekend getaway for the whole family with these great ideas for quick escapes...", // GANTI
            altText: "Family cycling together on a scenic trail during a weekend break" // GANTI
        },
        {
            slug: "family-activity-weekend-breaks-uk-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks UK: A Comprehensive Guide", // GANTI
            excerpt: "Make the most of your weekend with exciting family activity breaks available throughout the UK for all ages...", // GANTI
            altText: "Children enjoying a climbing wall activity during a UK weekend break" // GANTI
        },
        {
            slug: "family-adventure-breaks-uk-a-comprehensive-guide",
            title: "Family Adventure Breaks UK: A Comprehensive Guide", // GANTI
            excerpt: "Discover thrilling adventure breaks across the UK suitable for the entire family. Plan your next exciting escape...", // GANTI
            altText: "Family zip-lining through a forest in the UK" // GANTI
        },
        {
            slug: "family-sports-holidays-europe-a-comprehensive-guide",
            title: "Family Sports Holidays Europe: A Comprehensive Guide", // GANTI
            excerpt: "Combine your love for sports with a family vacation in Europe. Explore top destinations and activities for active families...", // GANTI
            altText: "Family playing beach volleyball on a European coast" // GANTI
        },
        {
            slug: "great-family-holidays-abroad-a-comprehensive-guide",
            title: "Great Family Holidays Abroad: A Comprehensive Guide", // GANTI
            excerpt: "Find the perfect international destination for your next family vacation with our detailed guide to amazing experiences...", // GANTI
            altText: "Family posing happily on a beautiful beach during an international holiday" // GANTI
        },
        {
            slug: "hotels-with-activities-for-families-a-comprehensive-guide",
            title: "Hotels with Activities for Families: A Comprehensive Guide",
            excerpt: "Discover hotels that offer more than just a stay. Our guide helps you find family-friendly resorts with engaging activities...",
            altText: "Family having fun at a resort pool with slides"
        },
        {
            slug: "kids-activity-holidays-uk-a-comprehensive-guide",
            title: "Kids Activity Holidays UK: A Comprehensive Guide", // GANTI
            excerpt: "Keep your children entertained and active with these fantastic kid-friendly holiday options and activity centers in the UK...", // GANTI
            altText: "Children participating in an outdoor adventure course in the UK" // GANTI
        },
        {
            slug: "organized-trips-for-young-adults-a-comprehensive-guide",
            title: "Organized Trips for Young Adults: A Comprehensive Guide", // GANTI
            excerpt: "Discover exciting and well-planned trips tailored for young adults seeking adventure, culture, and new experiences...", // GANTI
            altText: "Group of young adults taking a selfie on an organized tour in a city" // GANTI
        }
    ];

    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    const numberOfFeaturedPosts = 12;

    function getRandomArticles(articles, count) {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    function createArticleCardHTML(article, index) {
        const postUrl = `posts/${article.slug}.html`;
        const webpImageSrc = `assets/images/${article.slug}-featured.webp`; // Path relatif
        const jpgImageSrc = `assets/images/${article.slug}-featured.jpg`;   // Path relatif
        const articleId = `article-title-featured-${index + 1}`;

        return `
            <article class="article-card" aria-labelledby="${articleId}">
                <div class="article-image">
                    <a href="${postUrl}">
                        <picture>
                            <source srcset="${webpImageSrc}" type="image/webp">
                            <source srcset="${jpgImageSrc}" type="image/jpeg">
                            <img src="${jpgImageSrc}" alt="${article.altText}" width="360" height="180" loading="lazy">
                        </picture>
                    </a>
                </div>
                <div class="article-content">
                    <h3 class="article-title" id="${articleId}"><a href="${postUrl}">${article.title}</a></h3>
                    <p class="excerpt">${article.excerpt}</p>
                    <a href="${postUrl}" class="read-more">Read More <span class="visually-hidden">about ${article.title}</span>→</a>
                </div>
            </article>
        `;
    }

    if (featuredPostsContainer) {
        if (allArticles.length > 0) {
            featuredPostsContainer.innerHTML = ''; // Kosongkan konten statis
            const randomArticles = getRandomArticles(allArticles, numberOfFeaturedPosts);
            randomArticles.forEach((article, index) => {
                featuredPostsContainer.innerHTML += createArticleCardHTML(article, index);
            });
        } else {
            featuredPostsContainer.innerHTML = '<p>No featured articles to display at the moment.</p>';
        }
    } else {
        console.error('Error: Featured posts container (.featured-posts .posts-grid) not found.');
    }
    // --- Akhir Logika Artikel Unggulan ---
});
