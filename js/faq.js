document.addEventListener('DOMContentLoaded', function() {
    // Gestion des catégories
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categories = document.querySelectorAll('.faq-category');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Mise à jour des boutons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mise à jour des catégories
            categories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category) {
                    cat.classList.add('active');
                }
            });
        });
    });

    // Gestion des questions/réponses
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Ferme toutes les réponses
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle la réponse cliquée
            item.classList.toggle('active');
        });
    });
}); 