// Ajoutez ce script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.kilometer-form');
    
    // Définir la date max à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').max = today;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs
        const startDate = new Date(document.getElementById('startDate').value);
        const currentKm = parseFloat(document.getElementById('currentKm').value);
        const allowedKm = parseFloat(document.getElementById('allowedKm').value);
        const duration = parseFloat(document.getElementById('leaseDuration').value);
        
        if (!startDate || !currentKm || !allowedKm || !duration) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        // Calculs
        const totalAllowed = allowedKm * duration;
        const percentage = Math.min((currentKm / totalAllowed) * 100, 100);
        
        // Calcul du temps écoulé depuis le début du leasing
        const currentDate = new Date();
        const elapsedTime = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 365); // Temps écoulé en années
        const remainingTime = duration - elapsedTime;
        
        // Calcul de la projection
        const dailyAverage = currentKm / (elapsedTime * 365); // km par jour
        const projectedKm = currentKm + (dailyAverage * remainingTime * 365);
        const difference = totalAllowed - projectedKm;

        // Mise à jour du compteur
        document.querySelector('.counter').textContent = currentKm.toLocaleString('fr-FR');
        
        // Mise à jour de la barre de progression
        document.querySelector('.progress-bar').style.width = `${percentage}%`;
        
        // Mise à jour des labels
        document.querySelector('.progress-labels span:first-child').textContent = '0 km';
        document.querySelector('.progress-labels span:last-child').textContent = 
            `Objectif: ${totalAllowed.toLocaleString('fr-FR')} km`;
        
        // Mise à jour du statut et de la projection
        const status = document.querySelector('.status');
        const projection = document.querySelector('.status-message p');
        
        // Calcul du rythme actuel par rapport à l'objectif
        const idealDailyRate = totalAllowed / (duration * 365);
        const actualDailyRate = dailyAverage;
        
        if (actualDailyRate <= idealDailyRate) {
            status.textContent = 'Vous êtes dans les temps !';
            status.style.color = '#4CAF50';
            projection.textContent = `Projection fin de contrat : ${Math.abs(Math.round(difference)).toLocaleString('fr-FR')} km restants`;
        } else {
            status.textContent = 'Attention au dépassement !';
            status.style.color = '#FF5252';
            projection.textContent = `Projection fin de contrat : ${Math.abs(Math.round(difference)).toLocaleString('fr-FR')} km en excès`;
        }

        // Animation de la mise à jour
        const kilometerDisplay = document.querySelector('.kilometer-display');
        kilometerDisplay.style.animation = 'none';
        kilometerDisplay.offsetHeight;
        kilometerDisplay.style.animation = 'pulse 4s ease-in-out infinite';
    });
}); 