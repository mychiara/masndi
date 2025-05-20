// assets/script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- START: Existing script.js content (nav toggler, current year) ---
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
    // --- END: Existing script.js content ---

    // --- START: New Featured Articles Logic ---

    // Daftar artikel berdasarkan file di https://github.com/mychiara/masndi/tree/main/posts
    // Judul, kutipan, dan altText di sini adalah placeholder. Anda HARUS memperbaikinya agar sesuai dengan konten artikel Anda.
    const allArticles = [
        {
            slug: "activity-hotels-for-families-in-the-uk-a-comprehensive-guide",
            title: "Activity Hotels for Families in the UK: A Comprehensive Guide",
            excerpt: "Discover the best activity hotels in the UK perfect for family fun and adventure...",
            altText: "Family enjoying activities at a UK hotel"
        },
        {
            slug: "adventure-getaway-destinations-a-comprehensive-guide",
            title: "Adventure Getaway Destinations: A Comprehensive Guide",
            excerpt: "Explore thrilling adventure getaway destinations for your next exciting vacation...",
            altText: "Adventurer on a scenic mountain top"
        },
        {
            slug: "best-adventure-places-in-the-world-a-connoisseurs-guide",
            title: "Best Adventure Places in the World: A Connoisseur's Guide",
            excerpt: "Embark on a journey to the most thrilling adventure destinations across the globe...",
            altText: "People kayaking in a beautiful canyon"
        },
        {
            slug: "best-adventure-trips-in-europe-a-comprehensive-guide-for-the-discerning-traveler",
            title: "Best Adventure Trips in Europe: A Guide for the Discerning Traveler",
            excerpt: "Europe offers diverse adventure trips, from majestic mountains to historic coastlines...",
            altText: "Hiking in the European Alps"
        },
        {
            slug: "best-family-holiday-company-a-comprehensive-guide",
            title: "Best Family Holiday Company: A Comprehensive Guide",
            excerpt: "Choosing the right holiday company can make all the difference for your family vacation...",
            altText: "Happy family on vacation with luggage"
        },
        {
            slug: "cheap-activity-holidays-uk-a-comprehensive-guide",
            title: "Cheap Activity Holidays UK: A Comprehensive Guide",
            excerpt: "Enjoy exciting activity holidays in the UK without breaking the bank. Discover budget-friendly options...",
            altText: "Group enjoying an affordable outdoor activity in the UK"
        },
        {
            slug: "cheap-adventure-holidays-europe-a-comprehensive-guide",
            title: "Cheap Adventure Holidays Europe: A Comprehensive Guide",
            excerpt: "Explore Europe's thrilling adventures on a budget. This guide covers affordable options...",
            altText: "Backpacker looking at a map in a European city"
        },
        {
            slug: "east-coast-adventure-trips-a-comprehensive-guide",
            title: "East Coast Adventure Trips: A Comprehensive Guide",
            excerpt: "Discover the best adventure trips along the US East Coast, from mountains to shores...",
            altText: "Kayaking along a scenic East Coast shoreline"
        },
        {
            slug: "east-coast-adventure-vacations-a-comprehensive-guide",
            title: "East Coast Adventure Vacations: A Comprehensive Guide",
            excerpt: "Plan your next adventure vacation on the East Coast with this detailed guide...",
            altText: "Couple hiking on an East Coast trail"
        },
        {
            slug: "exploring-holidays-for-couples-a-comprehensive-guide",
            title: "Exploring Holidays for Couples: A Comprehensive Guide",
            excerpt: "Find the perfect romantic and adventurous holiday destinations for couples...",
            altText: "Couple enjoying a scenic view during their holiday"
        },
        {
            slug: "family-activity-holidays-england-a-comprehensive-guide",
            title: "Family Activity Holidays England: A Comprehensive Guide",
            excerpt: "Discover fun-filled family activity holidays across England, perfect for creating lasting memories...",
            altText: "Family exploring a historic site in England"
        },
        {
            slug: "family-activity-weekend-breaks-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks: A Comprehensive Guide",
            excerpt: "Plan a memorable and action-packed weekend getaway for the whole family...",
            altText: "Family cycling together on a weekend break"
        },
        {
            slug: "family-activity-weekend-breaks-uk-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks UK: A Comprehensive Guide",
            excerpt: "Make the most of your weekend with exciting family activity breaks throughout the UK...",
            altText: "Children on a climbing wall during a UK weekend break"
        },
        {
            slug: "family-adventure-breaks-uk-a-comprehensive-guide",
            title: "Family Adventure Breaks UK: A Comprehensive Guide",
            excerpt: "Discover thrilling adventure breaks across the UK suitable for the entire family...",
            altText: "Family zip-lining in a UK forest"
        },
        {
            slug: "family-sports-holidays-europe-a-comprehensive-guide",
            title: "Family Sports Holidays Europe: A Comprehensive Guide",
            excerpt: "Combine your love for sports with a family vacation in Europe. Explore top destinations...",
            altText: "Family playing beach volleyball in Europe"
        },
        {
            slug: "great-family-holidays-abroad-a-comprehensive-guide",
            title: "Great Family Holidays Abroad: A Comprehensive Guide",
            excerpt: "Find the perfect international destination for your next family vacation with our guide...",
            altText: "Family on a beach during an international holiday"
        },
        {
            slug: "hotels-with-activities-for-families-a-comprehensive-guide",
            title: "Hotels with Activities for Families: A Comprehensive Guide",
            excerpt: "Discover hotels that offer more than just a stay, with activities for all family members...",
            altText: "Family enjoying activities at a resort pool"
        },
        {
            slug: "kids-activity-holidays-uk-a-comprehensive-guide",
            title: "Kids Activity Holidays UK: A Comprehensive Guide",
            excerpt: "Keep your children entertained with fantastic kid-friendly activity holidays in the UK...",
            altText: "Children participating in an outdoor activity in the UK"
        },
        {
            slug: "organized-trips-for-young-adults-a-comprehensive-guide",
            title: "Organized Trips for Young Adults: A Comprehensive Guide",
            excerpt: "Discover exciting and well-planned trips tailored for young adults seeking adventure...",
            altText: "Group of young adults on an organized tour"
        }
    ];

    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    const numberOfFeaturedPosts = 12;

    function getRandomArticles(articles, count) {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length)); // Ensure not to pick more than available
    }

    function createArticleCardHTML(article, index) {
        const postUrl = `posts/${article.slug}.html`;
        // Asumsi nama file gambar adalah SLUG-featured.webp dan SLUG-featured.jpg
        const webpImageSrc = `assets/images/${article.slug}-featured.webp`;
        const jpgImageSrc = `assets/images/${article.slug}-featured.jpg`;
        const articleId = `article-title-featured-${index + 1}`; // Buat ID unik untuk aria-labelledby

        // Periksa apakah gambar ada di repositori (ini hanya contoh, tidak bisa dilakukan di client-side JS untuk file lokal)
        // Anda harus memastikan file gambar ada di server Anda.

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

    if (featuredPostsContainer && allArticles.length > 0) {
        featuredPostsContainer.innerHTML = ''; // Kosongkan konten statis yang mungkin ada

        const randomArticles = getRandomArticles(allArticles, numberOfFeaturedPosts);

        randomArticles.forEach((article, index) => {
            featuredPostsContainer.innerHTML += createArticleCardHTML(article, index);
        });
    } else if (featuredPostsContainer) {
        // Jika tidak ada artikel yang terdefinisi, mungkin tampilkan pesan
        featuredPostsContainer.innerHTML = '<p>No featured articles to display at the moment.</p>';
    }
    // --- END: New Featured Articles Logic ---
});
