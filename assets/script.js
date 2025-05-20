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
    const allArticles = [
        {
            slug: "best-adventure-places-in-the-world-a-connoisseurs-guide",
            title: "Best Adventure Places in the World: A Connoisseur's Guide",
            excerpt: "Embark on a journey to the most thrilling adventure destinations across the globe...",
            altText: "People kayaking in a beautiful canyon"
        },
        {
            slug: "hotels-with-activities-for-families-a-comprehensive-guide",
            title: "Hotels with Activities for Families: A Comprehensive Guide",
            excerpt: "Discover hotels that offer more than just a stay. Our guide helps you find family-friendly resorts...",
            altText: "Family enjoying activities at a resort pool"
        },
        {
            slug: "best-family-holiday-company-a-comprehensive-guide",
            title: "Best Family Holiday Company: A Comprehensive Guide",
            excerpt: "Planning a family vacation? Choosing the right holiday company can make all the difference...",
            altText: "Happy family on vacation with luggage"
        },
        {
            slug: "best-adventure-trips-in-europe-a-comprehensive-guide-for-the-discerning-traveler",
            title: "Best Adventure Trips in Europe: A Comprehensive Guide for the Discerning Traveler",
            excerpt: "Europe offers a diverse range of adventure trips, from hiking majestic mountains to exploring historic coastlines...",
            altText: "Hiking in the European Alps"
        },
        {
            slug: "cheap-adventure-holidays-europe-a-comprehensive-guide",
            title: "Cheap Adventure Holidays Europe: A Comprehensive Guide",
            excerpt: "Explore Europe's thrilling adventures without breaking the bank. This guide covers budget-friendly options...",
            altText: "Backpacker looking at a map in a European city"
        },
        {
            slug: "great-family-holidays-abroad-a-comprehensive-guide",
            title: "Great Family Holidays Abroad: A Comprehensive Guide",
            excerpt: "Find the perfect international destination for your next family vacation with our detailed guide...",
            altText: "Family on a beach during an international holiday"
        },
        {
            slug: "kids-activity-holidays-uk-a-comprehensive-guide",
            title: "Kids Activity Holidays UK: A Comprehensive Guide",
            excerpt: "Keep your children entertained and active with these fantastic kid-friendly holiday options in the UK...",
            altText: "Children participating in an outdoor activity in the UK"
        },
        {
            slug: "organized-trips-for-young-adults-a-comprehensive-guide",
            title: "Organized Trips for Young Adults: A Comprehensive Guide",
            excerpt: "Discover exciting and well-planned trips tailored for young adults seeking adventure and new experiences...",
            altText: "Group of young adults on an organized tour"
        },
        {
            slug: "east-coast-adventure-vacations-a-comprehensive-guide",
            title: "East Coast Adventure Vacations: A Comprehensive Guide",
            excerpt: "From mountains to coastlines, explore the best adventure vacations the East Coast has to offer...",
            altText: "Kayaking along a scenic East Coast shoreline"
        },
        {
            slug: "family-activity-weekend-breaks-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks: A Comprehensive Guide",
            excerpt: "Plan a memorable and action-packed weekend getaway for the whole family with these great ideas...",
            altText: "Family cycling together on a weekend break"
        },
        {
            slug: "family-adventure-breaks-uk-a-comprehensive-guide",
            title: "Family Adventure Breaks UK: A Comprehensive Guide",
            excerpt: "Discover thrilling adventure breaks across the UK suitable for the entire family. Plan your next escape...",
            altText: "Family zip-lining in a UK forest"
        },
        {
            slug: "family-sports-holidays-europe-a-comprehensive-guide",
            title: "Family Sports Holidays Europe: A Comprehensive Guide",
            excerpt: "Combine your love for sports with a family vacation in Europe. Explore top destinations and activities...",
            altText: "Family playing beach volleyball in Europe"
        },
        {
            slug: "activity-hotels-for-families-in-the-uk-a-comprehensive-guide",
            title: "Activity Hotels for Families in the UK: A Comprehensive Guide",
            excerpt: "Find UK hotels that offer a wide range of activities to keep every family member entertained...",
            altText: "Hotel exterior with signs for various family activities"
        },
        {
            slug: "adventure-getaway-destinations-a-comprehensive-guide",
            title: "Adventure Getaway Destinations: A Comprehensive Guide",
            excerpt: "Your ultimate guide to breathtaking adventure getaway destinations for thrill-seekers...",
            altText: "Mountain biker on a challenging trail"
        },
        {
            slug: "cheap-activity-holidays-uk-a-comprehensive-guide",
            title: "Cheap Activity Holidays UK: A Comprehensive Guide",
            excerpt: "Enjoy an adventurous holiday in the UK without overspending. Discover budget-friendly activity options...",
            altText: "Group of friends hiking on a budget in the UK"
        },
        {
            slug: "east-coast-adventure-trips-a-comprehensive-guide",
            title: "East Coast Adventure Trips: A Comprehensive Guide",
            excerpt: "Uncover the best adventure trips along the East Coast, from serene trails to exciting water sports...",
            altText: "Surfer catching a wave on the East Coast"
        },
        {
            slug: "exploring-holidays-for-couples-a-comprehensive-guide",
            title: "Exploring Holidays for Couples: A Comprehensive Guide",
            excerpt: "Plan a romantic and adventurous getaway with your partner using our guide to couple's holidays...",
            altText: "Couple enjoying a scenic view during their holiday"
        },
        {
            slug: "family-activity-holidays-england-a-comprehensive-guide",
            title: "Family Activity Holidays England: A Comprehensive Guide",
            excerpt: "Discover fun-filled family activity holidays across England, perfect for creating lasting memories...",
            altText: "Family exploring a castle in England"
        },
        {
            slug: "family-activity-weekend-breaks-uk-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks UK: A Comprehensive Guide",
            excerpt: "Make the most of your weekend with exciting family activity breaks available throughout the UK...",
            altText: "Children on a climbing wall during a UK weekend break"
        }
        // Add more articles here if you have them
    ];

    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    const numberOfFeaturedPosts = 12;

    function getRandomArticles(articles, count) {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    function createArticleCardHTML(article, index) {
        const postUrl = `posts/${article.slug}.html`;
        const webpImageSrc = `assets/images/${article.slug}-featured.webp`;
        const jpgImageSrc = `assets/images/${article.slug}-featured.jpg`;
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

    if (featuredPostsContainer && allArticles.length > 0) {
        featuredPostsContainer.innerHTML = ''; // Clear existing static content

        const randomArticles = getRandomArticles(allArticles, Math.min(numberOfFeaturedPosts, allArticles.length));

        randomArticles.forEach((article, index) => {
            featuredPostsContainer.innerHTML += createArticleCardHTML(article, index);
        });
    }
    // --- END: New Featured Articles Logic ---
});
