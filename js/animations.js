// Initialisation des animations au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('.counter');
    const progressBar = document.querySelector('.progress-bar');
    const statusMessage = document.querySelector('.status-message');
    const heroContent = document.querySelector('.hero-content');
    
    // Configuration du tableau de bord final
    const finalDashboard = document.createElement('div');
    finalDashboard.className = 'final-dashboard';
    finalDashboard.innerHTML = `
        <div class="final-message">
            <div class="impact-text">
                <h1>Et vous ?</h1>
                <h2>Vous avez le droit à combien de kilomètres sur votre leasing ?</h2>
            </div>
            
            <div class="content-wrapper">
                <img src="assets/logo.png" alt="Milésio" class="floating-logo">
                <div class="cta-buttons">
                    <a href="#" class="cta-button ios">
                        <i class="fab fa-apple"></i>
                        <span>
                            <small>Disponible sur</small>
                            App Store
                        </span>
                    </a>
                    <a href="#" class="cta-button android">
                        <i class="fab fa-android"></i>
                        <span>
                            <small>Bientôt sur</small>
                            Google Play
                        </span>
                    </a>
                </div>
            </div>
        </div>
    `;
    finalDashboard.style.opacity = '0';
    finalDashboard.style.transform = 'scale(0.9)';
    finalDashboard.style.transition = 'all 0.5s ease-out';
    document.querySelector('.hero').appendChild(finalDashboard);

    const maxValue = 60000;
    let currentValue = 35000;
    let targetValue = 35000;
    const animationDuration = 39000; // 39 secondes
    const fps = 60;
    const increment = (maxValue - currentValue) / (animationDuration / (1000 / fps));
    
    progressBar.style.transition = 'width 0.1s linear, background-color 0.5s ease';
    
    function getColorForPercentage(percentage) {
        if (percentage >= 100) return '#FF4444';
        if (percentage > 90) return '#FFA500';
        if (percentage > 80) return '#FFD700';
        return '#4CAF50';
    }
    
    function showFinalDashboard() {
        const currentCounter = document.querySelector('.kilometer-display');
        const finalDashboard = document.querySelector('.final-dashboard');
        
        // Animation de transition
        heroContent.style.transition = 'all 0.5s ease-out';
        heroContent.style.opacity = '0';
        
        setTimeout(() => {
            heroContent.style.display = 'none';
            finalDashboard.style.display = 'flex';
            
            requestAnimationFrame(() => {
                finalDashboard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                finalDashboard.style.opacity = '1';
                finalDashboard.style.transform = 'scale(1)';
            });
        }, 500);
    }
    
    function updateDisplay() {
        counter.textContent = Math.round(currentValue).toLocaleString();
        
        const percentage = (currentValue / maxValue) * 100;
        progressBar.style.width = `${percentage}%`;
        progressBar.style.backgroundColor = getColorForPercentage(percentage);
        progressBar.style.boxShadow = `0 0 10px ${getColorForPercentage(percentage)}`;
        
        if (currentValue >= maxValue) {
            statusMessage.innerHTML = '⚠️ Vous avez consommé tous vos kilomètres';
            statusMessage.style.color = '#FF4444';
            showFinalDashboard();
        } else if (percentage > 90) {
            statusMessage.innerHTML = '⚠️ Attention, vous approchez de la limite !';
            statusMessage.style.color = '#FFA500';
        } else if (percentage > 80) {
            statusMessage.innerHTML = '⚡ Surveillez votre kilométrage';
            statusMessage.style.color = '#FFD700';
        } else {
            statusMessage.innerHTML = '✨ Vous êtes dans les temps !';
            statusMessage.style.color = 'rgba(255, 255, 255, 0.9)';
        }
    }
    
    function animate() {
        currentValue = Math.min(currentValue + increment, maxValue);
        updateDisplay();
        
        if (currentValue < maxValue) {
            requestAnimationFrame(animate);
        }
    }
    
    // Initialiser l'affichage
    updateDisplay();
    
    // Démarrer l'animation
    setTimeout(animate, 500);
    
    // Gestion du menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// Animation du compteur kilométrique
function initSpeedometer() {
    const canvas = document.getElementById('speedometer');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let progress = 0;
    const targetProgress = 85; // Pourcentage cible
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessin de l'arc de progression
        ctx.beginPath();
        ctx.arc(100, 100, 80, 0, Math.PI * 2 * (progress / 100));
        ctx.strokeStyle = '#FFD8BE';
        ctx.lineWidth = 10;
        ctx.stroke();
        
        if (progress < targetProgress) {
            progress += 0.5;
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Animations au scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Animation des particules en arrière-plan
function initParticles() {
    const particlesContainer = document.querySelector('.particles-bg');
    if (!particlesContainer) return;
    
    const particlesConfig = {
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            opacity: {
                value: 0.1,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                out_mode: 'out'
            }
        }
    };
    
    // Initialisation des particules
    particlesJS('particles-bg', particlesConfig);
}

// Animation des boutons
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseover', function(e) {
        const x = e.pageX - this.offsetLeft;
        const y = e.pageY - this.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Animation du texte
function splitText() {
    const textElements = document.querySelectorAll('.split-text');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
        });
    });
}

// Appel des fonctions
splitText(); 