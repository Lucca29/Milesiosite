document.addEventListener('DOMContentLoaded', () => {
    // Configuration du compteur
    let currentValue = 0;
    const targetValue = 53374; // Valeur cible
    const duration = 3000; // Durée de l'animation en ms
    const updateInterval = 50; // Intervalle de mise à jour en ms
    
    const digits = document.querySelectorAll('.digit');
    
    function updateCounter() {
        // Calcul de l'incrément
        const increment = Math.ceil(targetValue / (duration / updateInterval));
        
        const animation = setInterval(() => {
            if (currentValue >= targetValue) {
                clearInterval(animation);
                return;
            }
            
            currentValue = Math.min(currentValue + increment, targetValue);
            
            // Mise à jour de l'affichage
            const valueString = currentValue.toString().padStart(5, '0');
            digits.forEach((digit, index) => {
                digit.textContent = valueString[index];
                
                // Ajout d'effet de rotation
                digit.style.transform = 'rotateX(360deg)';
                setTimeout(() => {
                    digit.style.transform = 'rotateX(0deg)';
                }, 300);
            });
            
        }, updateInterval);
    }
    
    // Animation du cercle de progression
    const canvas = document.getElementById('progressRing');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 600;
        
        function drawProgress(progress) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.beginPath();
            ctx.arc(300, 300, 280, 0, Math.PI * 2 * progress);
            ctx.strokeStyle = 'rgba(255, 216, 190, 0.2)';
            ctx.lineWidth = 4;
            ctx.stroke();
        }
        
        // Animation du cercle
        let progress = 0;
        const progressAnimation = setInterval(() => {
            progress += 0.01;
            if (progress >= 1) {
                clearInterval(progressAnimation);
            }
            drawProgress(progress);
        }, 30);
    }
    
    // Démarrer l'animation après un court délai
    setTimeout(updateCounter, 500);
}); 