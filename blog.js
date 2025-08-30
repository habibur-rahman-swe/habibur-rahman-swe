// Blog functionality
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});

async function loadBlogPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    try {
        const response = await fetch('blogs.json');
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }

        const blogPosts = await response.json();

        // Hide loading
        loadingElement.style.display = 'none';

        // Display blog posts
        blogPosts.forEach(post => {
            const postElement = createBlogPostElement(post);
            blogPostsContainer.appendChild(postElement);
        });

    } catch (error) {
        console.error('Error loading blog posts:', error);
        loadingElement.style.display = 'none';
        errorElement.classList.remove('d-none');
    }
}

function createBlogPostElement(post) {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-lg-6 mb-4';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card h-100 shadow-sm modern-card';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';

    // Image
    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = post.title;
        img.className = 'card-img-top rounded mb-3';
        img.style.height = '200px';
        img.style.objectFit = 'cover';
        // Append the image to the card before the body
        cardDiv.appendChild(img);
    }

    // Title
    const title = document.createElement('h3');
    title.className = 'card-title mb-2';
    title.textContent = post.title;
    cardBody.appendChild(title);

    // Meta info
    const metaDiv = document.createElement('div');
    metaDiv.className = 'mb-2 text-muted small';
    metaDiv.innerHTML = `
        <i class="fas fa-calendar me-1"></i>${formatDate(post.date)} |
        <i class="fas fa-clock me-1"></i>${post.readTime} |
        <i class="fas fa-user me-1"></i>${post.author}
    `;
    cardBody.appendChild(metaDiv);

    // Excerpt
    const excerpt = document.createElement('p');
    excerpt.className = 'card-text';
    excerpt.textContent = post.excerpt;
    cardBody.appendChild(excerpt);

    // Tags
    if (post.tags && post.tags.length > 0) {
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'mb-3';
        post.tags.forEach(tag => {
            const badge = document.createElement('span');
            badge.className = 'badge bg-secondary me-1';
            badge.textContent = tag;
            tagsDiv.appendChild(badge);
        });
        cardBody.appendChild(tagsDiv);
    }

    // Read more button
    const readMoreBtn = document.createElement('a');
    readMoreBtn.href = '#';
    readMoreBtn.className = 'btn btn-primary mt-auto';
    readMoreBtn.innerHTML = '<i class="fas fa-arrow-right me-2"></i>Read More';
    readMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showBlogPostModal(post);
    });
    cardBody.appendChild(readMoreBtn);

    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    return colDiv;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showBlogPostModal(post) {
    // Create modal for full blog post
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'blogModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${post.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="img-fluid mb-3 rounded">` : ''}
                    <div class="mb-3 text-muted small">
                        <i class="fas fa-calendar me-1"></i>${formatDate(post.date)} |
                        <i class="fas fa-clock me-1"></i>${post.readTime} |
                        <i class="fas fa-user me-1"></i>${post.author}
                    </div>
                    <div class="mb-3">
                        ${post.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                    </div>
                    <div class="blog-content">
                        ${post.content}
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize and show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Remove modal from DOM after hiding
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}