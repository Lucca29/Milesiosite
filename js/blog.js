let currentPage = 1;
const totalPages = 3;

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
}

function goToPage(page) {
    currentPage = page;
    updatePagination();
}

function updatePagination() {
    const buttons = document.querySelectorAll('.pagination button[data-page]');
    buttons.forEach(button => {
        const page = parseInt(button.dataset.page);
        button.classList.toggle('active', page === currentPage);
    });
    
    // Ici, vous pouvez ajouter la logique pour charger les articles de la page
    // Pour l'instant, c'est juste visuel
}

// Event listeners
document.querySelectorAll('.pagination button[data-page]').forEach(button => {
    button.addEventListener('click', () => {
        goToPage(parseInt(button.dataset.page));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const pageContents = document.querySelectorAll('.page-content');
    const paginationButtons = document.querySelectorAll('.pagination button');

    function showPage(pageNumber) {
        // Cache toutes les pages
        pageContents.forEach(page => {
            page.style.display = 'none';
            const articles = page.querySelectorAll('.blog-article');
            articles.forEach(article => {
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';
            });
        });

        // Affiche la page sélectionnée
        const selectedPage = document.querySelector(`.page-content[data-page="${pageNumber}"]`);
        if (selectedPage) {
            selectedPage.style.display = 'block';
            const articles = selectedPage.querySelectorAll('.blog-article');
            articles.forEach((article, index) => {
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        }

        // Met à jour les boutons de pagination
        paginationButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.page === pageNumber.toString()) {
                button.classList.add('active');
            }
        });
    }

    // Ajoute les écouteurs d'événements sur les boutons de pagination
    paginationButtons.forEach(button => {
        if (button.dataset.page) {
            button.addEventListener('click', () => {
                const pageNumber = parseInt(button.dataset.page);
                showPage(pageNumber);
            });
        }
    });

    // Initialise la première page
    showPage(1);
}); 