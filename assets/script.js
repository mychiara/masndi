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

async function fetchAndDisplayPosts() {
    const owner = 'mychiara';
    const repo = 'masndi';
    const postsDir = 'posts';
    const apiUrl = `https://masandigital.com/${owner}/${repo}/contents/${postsDir}`;
    
    // Base URLs for GitHub Pages site
    const siteBaseUrl = `https://${owner}.github.io/${repo}/`;
    const postsBaseUrl = `${siteBaseUrl}posts/`;
    const imagesBaseUrl = `${siteBaseUrl}assets/images/`;

    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    const allPostsSidebarContainer = document.querySelector('.all-posts-sidebar .posts-list-sidebar');

    // Placeholders while loading
    if (featuredPostsContainer) {
        featuredPostsContainer.innerHTML = '<p class="loading-message">Loading articles...</p>';
    }
    if (allPostsSidebarContainer) {
        allPostsSidebarContainer.innerHTML = '<p class="loading-message">Loading article list...</p>';
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        const files = await response.json();

        const htmlFiles = files.filter(file => file.name.endsWith('.html') && file.type === 'file');

        if (htmlFiles.length === 0) {
            if (featuredPostsContainer) featuredPostsContainer.innerHTML = '<p>No articles found.</p>';
            if (allPostsSidebarContainer) allPostsSidebarContainer.innerHTML = '<p>No articles found.</p>';
            return;
        }

        const postsData = htmlFiles.map((file, index) => {
            const slug = file.name.replace('.html', '');
            const title = slug.split('-')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(' ');
            return {
                id: `article-dynamic-${index + 1}`,
                title: title,
                url: `${postsBaseUrl}${file.name}`,
                imgWebp: `${imagesBaseUrl}${slug}-featured.webp`,
                imgJpg: `${imagesBaseUrl}${slug}-featured.jpg`,
                // Generic excerpt - could be improved if metadata was available
                excerpt: `Explore insights and details about "${title}". Your adventure starts here with our comprehensive guide.`,
                // Using a placeholder date as it's not easily available from this API endpoint
                date: "2025-05-18", // Placeholder date
                displayDate: "18/5/2025" // Placeholder display date
            };
        });

        // Shuffle posts for variety
        const shuffledPosts = [...postsData].sort(() => 0.5 - Math.random());

        // Populate Featured Articles (e.g., first 4 shuffled)
        if (featuredPostsContainer) {
            featuredPostsContainer.innerHTML = ''; // Clear loading message
            const numFeatured = Math.min(shuffledPosts.length, 4);
            for (let i = 0; i < numFeatured; i++) {
                const post = shuffledPosts[i];
                const articleEl = createFeaturedArticleElement(post);
                featuredPostsContainer.appendChild(articleEl);
            }
            if (numFeatured === 0) {
                 featuredPostsContainer.innerHTML = '<p>No articles to feature at the moment.</p>';
            }
        }

        // Populate All Articles in Sidebar (show all fetched, sorted by title for consistency)
        if (allPostsSidebarContainer) {
            allPostsSidebarContainer.innerHTML = ''; // Clear loading message
            const sortedPostsForSidebar = [...postsData].sort((a, b) => a.title.localeCompare(b.title));
            sortedPostsForSidebar.forEach(post => {
                const listItemEl = createSidebarListItemElement(post);
                allPostsSidebarContainer.appendChild(listItemEl);
            });
             if (sortedPostsForSidebar.length === 0) {
                 allPostsSidebarContainer.innerHTML = '<p>No articles available in the list.</p>';
            }
        }

    } catch (error) {
        console.error('Error fetching or displaying posts:', error);
        if (featuredPostsContainer) {
            featuredPostsContainer.innerHTML = `<p class="error-message">Could not load articles. ${error.message}</p>`;
        }
        if (allPostsSidebarContainer) {
            allPostsSidebarContainer.innerHTML = `<p class="error-message">Could not load article list. ${error.message}</p>`;
        }
    }
}

function createFeaturedArticleElement(post) {
    const articleCard = document.createElement('article');
    articleCard.classList.add('article-card');
    articleCard.setAttribute('aria-labelledby', `${post.id}-title`);

    articleCard.innerHTML = `
        <div class="article-image">
            <a href="${post.url}">
                <picture>
                    <source srcset="${post.imgWebp}" type="image/webp">
                    <source srcset="${post.imgJpg}" type="image/jpeg">
                    <img src="${post.imgJpg}" alt="Featured image for ${post.title}" width="360" height="180" loading="lazy">
                </picture>
            </a>
        </div>
        <div class="article-content">
            <h3 class="article-title" id="${post.id}-title"><a href="${post.url}">${post.title}</a></h3>
            <p class="excerpt">${post.excerpt}</p>
            <a href="${post.url}" class="read-more">Read More <span class="visually-hidden">about ${post.title}</span>→</a>
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
