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
    const postsDir = 'posts'; // CRITICAL: Ensure this matches your directory name exactly (case-sensitive)

    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${postsDir}`;
    
    // Base URLs for GitHub Pages site
    const siteBaseUrl = `https://${owner}.github.io/${repo}/`; // e.g., https://mychiara.github.io/masndi/
    const postsBaseUrl = `${siteBaseUrl}posts/`;
    const imagesBaseUrl = `${siteBaseUrl}assets/images/`;

    const featuredPostsContainer = document.querySelector('.featured-posts .posts-grid');
    const allPostsSidebarContainer = document.querySelector('.all-posts-sidebar .posts-list-sidebar');

    // Log the critical variables and the constructed API URL
    console.log('GitHub API Fetch Details:');
    console.log('Owner:', owner);
    console.log('Repo:', repo);
    console.log('Posts Directory:', postsDir);
    console.log('Constructed API URL:', apiUrl);

    if (featuredPostsContainer) {
        featuredPostsContainer.innerHTML = '<p class="loading-message">Loading articles...</p>';
    }
    if (allPostsSidebarContainer) {
        allPostsSidebarContainer.innerHTML = '<p class="loading-message">Loading article list...</p>';
    }

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json' // Recommended Accept header
            }
        });

        console.log('GitHub API Response Status:', response.status);
        console.log('GitHub API Response OK:', response.ok);

        if (!response.ok) {
            // Log the full response if possible, or at least statusText
            const errorText = await response.text(); // Try to get more error details
            console.error('GitHub API Response Text (if error):', errorText);
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        
        const files = await response.json();
        console.log('Files received from API:', files);

        const htmlFiles = files.filter(file => file.name.endsWith('.html') && file.type === 'file');

        if (htmlFiles.length === 0) {
            if (featuredPostsContainer) featuredPostsContainer.innerHTML = '<p>No articles found in the directory.</p>';
            if (allPostsSidebarContainer) allPostsSidebarContainer.innerHTML = '<p>No articles found in the directory.</p>';
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
                excerpt: `Explore insights and details about "${title}". Your adventure starts here with our comprehensive guide.`,
                date: "2025-05-18", 
                displayDate: "18/5/2025"
            };
        });

        const shuffledPosts = [...postsData].sort(() => 0.5 - Math.random());

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
                 featuredPostsContainer.innerHTML = '<p>No articles to feature at the moment.</p>';
            }
        }

        if (allPostsSidebarContainer) {
            allPostsSidebarContainer.innerHTML = ''; 
            const sortedPostsForSidebar = [...postsData].sort((a, b) => a.title.localeCompare(b.title));
            if (sortedPostsForSidebar.length > 0) {
                sortedPostsForSidebar.forEach(post => {
                    const listItemEl = createSidebarListItemElement(post);
                    allPostsSidebarContainer.appendChild(listItemEl);
                });
            } else {
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
                    <img src="${post.imgJpg}" alt="Featured image for ${post.title}" width="360" height="180" loading="lazy" onerror="this.style.display='none'; this.parentElement.parentElement.querySelector('.missing-image-placeholder')?.remove(); const placeholder = document.createElement('div'); placeholder.className='missing-image-placeholder'; placeholder.textContent='Image not found'; this.parentElement.appendChild(placeholder);">
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

// Basic styling for missing image placeholder (add to your style.css if you want more)
const style = document.createElement('style');
style.innerHTML = `
.missing-image-placeholder {
    width: 360px;
    height: 180px;
    background-color: #f0f0f0;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    border: 1px dashed #ccc;
}
.article-image picture { /* Ensure picture tag itself doesn't collapse if img fails */
    display: block; 
    min-width: 100px; /* Or some other fallback size */
    min-height: 50px;
}
`;
document.head.appendChild(style);
