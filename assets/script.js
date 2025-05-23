// assets/script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Content Data ---
    // This array holds all your post data.
    // - slug: used to build the URL (posts/{slug}.html) and image names (assets/images/{slug}-featured.jpg/webp)
    // - title: The article title.
    // - date: Publication date in YYYY-MM-DD format.
    // - imageJpg: Path to the JPG featured image.
    // - imageWebp: Path to the WebP featured image.
    // - altText: Alt text for the featured image.
    // - excerpt: A short summary for the article card.
    const postsData = [
        {
            slug: "best-adventure-places-in-the-world-a-connoisseurs-guide",
            title: "Best Adventure Places in the World: A Connoisseur's Guide",
            date: "2025-05-18",
            imageJpg: "assets/images/best-adventure-places-in-the-world-a-connoisseurs-guide-featured.jpg",
            imageWebp: "assets/images/best-adventure-places-in-the-world-a-connoisseurs-guide-featured.webp",
            altText: "People kayaking in a beautiful canyon",
            excerpt: "Embark on a journey to the most thrilling adventure destinations across the globe..."
        },
        {
            slug: "hotels-with-activities-for-families-a-comprehensive-guide",
            title: "Hotels with Activities for Families: A Comprehensive Guide",
            date: "2025-05-17", // Example of different date for sorting
            imageJpg: "assets/images/hotels-with-activities-for-families-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/hotels-with-activities-for-families-a-comprehensive-guide-featured.webp",
            altText: "Family enjoying activities at a resort pool",
            excerpt: "Discover hotels that offer more than just a stay. Our guide helps you find family-friendly resorts..."
        },
        {
            slug: "best-family-holiday-company-a-comprehensive-guide",
            title: "Best Family Holiday Company: A Comprehensive Guide",
            date: "2025-05-16", // Example of different date
            imageJpg: "assets/images/best-family-holiday-company-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/best-family-holiday-company-a-comprehensive-guide-featured.webp",
            altText: "Happy family on vacation with luggage",
            excerpt: "Planning a family vacation? Choosing the right holiday company can make all the difference..."
        },
        {
            slug: "best-adventure-trips-in-europe-a-comprehensive-guide-for-the-discerning-traveler",
            title: "Best Adventure Trips in Europe: A Comprehensive Guide for the Discerning Traveler",
            date: "2025-05-15", // Example of different date
            imageJpg: "assets/images/best-adventure-trips-in-europe-a-comprehensive-guide-for-the-discerning-traveler-featured.jpg",
            imageWebp: "assets/images/best-adventure-trips-in-europe-a-comprehensive-guide-for-the-discerning-traveler-featured.webp",
            altText: "Hiking in the European Alps",
            excerpt: "Europe offers a diverse range of adventure trips, from hiking majestic mountains to exploring historic coastlines..."
        },
        {
            slug: "cheap-adventure-holidays-europe-a-comprehensive-guide",
            title: "Cheap Adventure Holidays Europe: A Comprehensive Guide",
            date: "2025-05-14",
            imageJpg: "assets/images/cheap-adventure-holidays-europe-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/cheap-adventure-holidays-europe-a-comprehensive-guide-featured.webp",
            altText: "Backpacker enjoying a scenic view in Europe",
            excerpt: "Explore Europe on a budget with these fantastic cheap adventure holiday ideas."
        },
        {
            slug: "great-family-holidays-abroad-a-comprehensive-guide",
            title: "Great Family Holidays Abroad: A Comprehensive Guide",
            date: "2025-05-13",
            imageJpg: "assets/images/great-family-holidays-abroad-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/great-family-holidays-abroad-a-comprehensive-guide-featured.webp",
            altText: "Family smiling on a beach abroad",
            excerpt: "Discover amazing destinations for unforgettable family holidays abroad."
        },
        {
            slug: "kids-activity-holidays-uk-a-comprehensive-guide",
            title: "Kids Activity Holidays UK: A Comprehensive Guide",
            date: "2025-05-12",
            imageJpg: "assets/images/kids-activity-holidays-uk-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/kids-activity-holidays-uk-a-comprehensive-guide-featured.webp",
            altText: "Children participating in an outdoor activity in the UK",
            excerpt: "Find the best activity holidays in the UK to keep your kids entertained and active."
        },
        {
            slug: "organized-trips-for-young-adults-a-comprehensive-guide",
            title: "Organized Trips for Young Adults: A Comprehensive Guide",
            date: "2025-05-11",
            imageJpg: "assets/images/organized-trips-for-young-adults-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/organized-trips-for-young-adults-a-comprehensive-guide-featured.webp",
            altText: "Group of young adults on an adventure trip",
            excerpt: "Explore the world and meet new people with these organized trips tailored for young adults."
        },
        {
            slug: "east-coast-adventure-vacations-a-comprehensive-guide",
            title: "East Coast Adventure Vacations: A Comprehensive Guide",
            date: "2025-05-10",
            imageJpg: "assets/images/east-coast-adventure-vacations-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/east-coast-adventure-vacations-a-comprehensive-guide-featured.webp",
            altText: "Kayaking along a scenic East Coast shoreline",
            excerpt: "Discover thrilling adventure vacations along the beautiful East Coast."
        },
        {
            slug: "family-activity-weekend-breaks-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks: A Comprehensive Guide",
            date: "2025-05-09",
            imageJpg: "assets/images/family-activity-weekend-breaks-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/family-activity-weekend-breaks-a-comprehensive-guide-featured.webp",
            altText: "Family cycling together on a weekend break",
            excerpt: "Plan your next family adventure with these exciting activity weekend break ideas."
        },
        {
            slug: "family-adventure-breaks-uk-a-comprehensive-guide",
            title: "Family Adventure Breaks UK: A Comprehensive Guide",
            date: "2025-05-08",
            imageJpg: "assets/images/family-adventure-breaks-uk-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/family-adventure-breaks-uk-a-comprehensive-guide-featured.webp",
            altText: "Family hiking in the UK countryside",
            excerpt: "Discover thrilling family adventure breaks across the United Kingdom."
        },
        {
            slug: "family-sports-holidays-europe-a-comprehensive-guide",
            title: "Family Sports Holidays Europe: A Comprehensive Guide",
            date: "2025-05-07",
            imageJpg: "assets/images/family-sports-holidays-europe-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/family-sports-holidays-europe-a-comprehensive-guide-featured.webp",
            altText: "Family playing beach volleyball in Europe",
            excerpt: "Combine your love for sports and travel with these family sports holidays in Europe."
        },
        {
            slug: "activity-hotels-for-families-in-the-uk-a-comprehensive-guide",
            title: "Activity Hotels for Families in the UK: A Comprehensive Guide",
            date: "2025-05-06",
            imageJpg: "assets/images/activity-hotels-for-families-in-the-uk-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/activity-hotels-for-families-in-the-uk-a-comprehensive-guide-featured.webp",
            altText: "Family enjoying activities at a UK hotel",
            excerpt: "Find UK hotels packed with activities to ensure a fun-filled family vacation."
        },
        {
            slug: "adventure-getaway-destinations-a-comprehensive-guide",
            title: "Adventure Getaway Destinations: A Comprehensive Guide",
            date: "2025-05-05",
            imageJpg: "assets/images/adventure-getaway-destinations-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/adventure-getaway-destinations-a-comprehensive-guide-featured.webp",
            altText: "Person zip-lining through a forest",
            excerpt: "Explore breathtaking destinations perfect for your next adventure getaway."
        },
        {
            slug: "cheap-activity-holidays-uk-a-comprehensive-guide",
            title: "Cheap Activity Holidays UK: A Comprehensive Guide",
            date: "2025-05-04",
            imageJpg: "assets/images/cheap-activity-holidays-uk-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/cheap-activity-holidays-uk-a-comprehensive-guide-featured.webp",
            altText: "Group hiking on a budget in the UK",
            excerpt: "Enjoy an action-packed holiday in the UK without breaking the bank."
        },
        {
            slug: "east-coast-adventure-trips-a-comprehensive-guide",
            title: "East Coast Adventure Trips: A Comprehensive Guide",
            date: "2025-05-03",
            imageJpg: "assets/images/east-coast-adventure-trips-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/east-coast-adventure-trips-a-comprehensive-guide-featured.webp",
            altText: "Surfer on an East Coast beach",
            excerpt: "Plan your ultimate adventure trip along the scenic East Coast."
        },
        {
            slug: "exploring-holidays-for-couples-a-comprehensive-guide",
            title: "Exploring Holidays for Couples: A Comprehensive Guide",
            date: "2025-05-02",
            imageJpg: "assets/images/exploring-holidays-for-couples-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/exploring-holidays-for-couples-a-comprehensive-guide-featured.webp",
            altText: "Couple enjoying a scenic view on holiday",
            excerpt: "Discover romantic and adventurous holiday ideas perfect for couples."
        },
        {
            slug: "family-activity-holidays-england-a-comprehensive-guide",
            title: "Family Activity Holidays England: A Comprehensive Guide",
            date: "2025-05-01",
            imageJpg: "assets/images/family-activity-holidays-england-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/family-activity-holidays-england-a-comprehensive-guide-featured.webp",
            altText: "Family exploring a historical site in England",
            excerpt: "Find exciting family activity holidays throughout England."
        },
        {
            slug: "family-activity-weekend-breaks-uk-a-comprehensive-guide",
            title: "Family Activity Weekend Breaks UK: A Comprehensive Guide",
            date: "2025-04-30", // Example of older date
            imageJpg: "assets/images/family-activity-weekend-breaks-uk-a-comprehensive-guide-featured.jpg",
            imageWebp: "assets/images/family-activity-weekend-breaks-uk-a-comprehensive-guide-featured.webp",
            altText: "Family canoeing on a lake in the UK",
            excerpt: "Make the most of your weekends with these family activity breaks in the UK."
        }
        // Add more post objects here as you create new articles
        // Ensure image files exist in assets/images/ with names like {slug}-featured.jpg and {slug}-featured.webp
        // and the HTML files exist in posts/ like {slug}.html
    ];

    // --- Helper Function to Format Date ---
    function formatDate(isoDate) {
        if (!isoDate) return '';
        // Check if date is already in DD/MM/YYYY format (from old hardcoded HTML)
        if (isoDate.includes('/')) {
            return isoDate;
        }
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    }

    // --- Populate Featured Articles ---
    const featuredPostsContainer = document.querySelector('.posts-grid');
    const numberOfFeaturedPosts = 4; // Display the first X newest posts as featured

    if (featuredPostsContainer) {
        // Sort posts by date, newest first.
        const sortedPosts = [...postsData].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedPosts.slice(0, numberOfFeaturedPosts).forEach((post, index) => {
            const articleId = `article-title-featured-${index + 1}`; // Unique ID for featured
            const postUrl = `posts/${post.slug}.html`;

            // Check if image paths exist, otherwise use a placeholder or skip image
            const imageJpg = post.imageJpg || 'assets/images/placeholder.jpg'; // Define a placeholder.jpg if needed
            const imageWebp = post.imageWebp || 'assets/images/placeholder.webp'; // Define a placeholder.webp if needed

            const articleCard = `
                <article class="article-card" aria-labelledby="${articleId}">
                    <div class="article-image">
                        <a href="${postUrl}">
                            <picture>
                                <source srcset="${imageWebp}" type="image/webp">
                                <source srcset="${imageJpg}" type="image/jpeg">
                                <img src="${imageJpg}" alt="${post.altText || 'Article image'}" width="360" height="180" loading="lazy">
                            </picture>
                        </a>
                    </div>
                    <div class="article-content">
                        <h3 class="article-title" id="${articleId}"><a href="${postUrl}">${post.title}</a></h3>
                        <p class="excerpt">${post.excerpt || 'Read more about this topic.'}</p>
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
