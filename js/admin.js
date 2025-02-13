// Vérification des identifiants
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'Lucca29' && password === 'Training123*') {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                document.getElementById('error-message').textContent = 'Identifiants incorrects';
            }
        });
    }

    // Vérification de l'authentification sur le dashboard
    const isDashboard = document.querySelector('.admin-dashboard');
    if (isDashboard && !localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'login.html';
    }

    // Gestion de la déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // Navigation dans le dashboard
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            
            // Mise à jour des classes actives
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Affichage de la section correspondante
            document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
            document.getElementById(section).classList.add('active');
        });
    });

    // Gestion des articles
    let articles = JSON.parse(localStorage.getItem('articles')) || [
        {
            id: 1,
            title: "Comment optimiser son forfait kilométrique en LLD ?",
            category: "guide",
            content: "Découvrez nos conseils d'experts pour gérer efficacement votre kilométrage et éviter les dépassements coûteux en fin de contrat.",
            image: "https://images.unsplash.com/photo-1511837008003-71eca36ceb70?w=1200&h=600&fit=crop",
            date: "12 Mars 2024",
            readTime: "5 min"
        }
    ];

    // Fonctions de gestion des articles
    function displayArticles() {
        const articlesList = document.querySelector('.articles-list');
        if (!articlesList) return;

        articlesList.innerHTML = articles.map(article => `
            <div class="article-item" data-id="${article.id}">
                <div class="article-info">
                    <h3>${article.title}</h3>
                    <span class="article-meta">Publié le ${article.date}</span>
                </div>
                <div class="article-actions">
                    <button class="edit-btn" onclick="editArticle(${article.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="delete-btn" onclick="deleteArticle(${article.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Gestion du formulaire d'article
    const articleForm = document.querySelector('.article-form');
    if (articleForm) {
        articleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                id: Date.now(), // Génère un ID unique
                title: document.getElementById('title').value,
                category: document.getElementById('category').value,
                content: document.getElementById('content').value,
                date: new Date().toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }),
                readTime: "5 min"
            };

            // Gestion de l'image
            const imageFile = document.getElementById('image').files[0];
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    formData.image = e.target.result;
                    saveArticle(formData);
                };
                reader.readAsDataURL(imageFile);
            } else {
                formData.image = "https://images.unsplash.com/photo-1511837008003-71eca36ceb70?w=1200&h=600&fit=crop";
                saveArticle(formData);
            }
        });
    }

    // Fonction pour sauvegarder un article
    function saveArticle(articleData) {
        if (articleData.id) {
            // Mise à jour d'un article existant
            const index = articles.findIndex(a => a.id === articleData.id);
            if (index !== -1) {
                articles[index] = articleData;
            }
        } else {
            // Nouvel article
            articles.push(articleData);
        }
        
        localStorage.setItem('articles', JSON.stringify(articles));
        displayArticles();
        resetForm();
        showNotification('Article sauvegardé avec succès!');
    }

    // Fonction pour éditer un article
    window.editArticle = function(id) {
        const article = articles.find(a => a.id === id);
        if (!article) return;

        // Basculer vers le formulaire
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector('[data-section="new"]').classList.add('active');
        
        document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
        document.getElementById('new').classList.add('active');

        // Remplir le formulaire
        document.getElementById('title').value = article.title;
        document.getElementById('category').value = article.category;
        document.getElementById('content').value = article.content;
        
        // Ajouter l'ID pour la mise à jour
        articleForm.dataset.editId = article.id;
    };

    // Fonction pour supprimer un article
    window.deleteArticle = function(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            articles = articles.filter(a => a.id !== id);
            localStorage.setItem('articles', JSON.stringify(articles));
            displayArticles();
            showNotification('Article supprimé avec succès!');
        }
    };

    // Fonction pour réinitialiser le formulaire
    function resetForm() {
        articleForm.reset();
        delete articleForm.dataset.editId;
    }

    // Fonction pour afficher une notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Afficher les articles au chargement
    displayArticles();
}); 