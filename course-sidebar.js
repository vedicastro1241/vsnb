const courseDays = [
    { file: 'index.html', label: 'Day 1', title: 'Pūrvabhāga: The Vedic Foundation', verses: 'Introductory Theory', youtubeId: '' },
    { file: 'Days/Day2.html', label: 'Day 2', title: 'Pūrvāṅgam: Vighna-Nivāraṇa', verses: 'Prelude Ślokas 1-2', youtubeId: '5GrhAx-6Tqw' },
    { file: 'Days/Day3.html', label: 'Day 3', title: 'Pūrvāṅgam: Vyāsa-Vandanā', verses: 'Prelude Ślokas 3-4', youtubeId: 'thTeLSb62Zw' },
    { file: 'Days/Day4.html', label: 'Day 4', title: 'Nyāsam: The Body as a Temple', verses: 'Prelude 5-6 & Nyāsam', youtubeId: 'QwxGvk5PqBA' },
    { file: 'Days/Day5.html', label: 'Day 5', title: 'Dhyānam & Prathama-Nāma', verses: 'Stotra 1-8 (The Questions)', youtubeId: 'jdLfG_p3fag' }
];

async function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Maintain your specific header
    sidebar.innerHTML = `
        <div class="sidebar-brand">By Shri. Ramabhadran V Guruji</div>
        <div id="dynamic-links"></div>
    `;
    
    const container = document.getElementById('dynamic-links');
    const isInSubfolder = window.location.pathname.includes('/Days/');

    courseDays.forEach(day => {
        const link = document.createElement('a');
        
        // Path logic: adjust link based on where the user currently is
        let finalPath = day.file;
        if (isInSubfolder) {
            finalPath = (day.file === 'index.html') ? '../index.html' : day.file.replace('Days/', '');
        }

        link.href = finalPath;
        link.className = 'nav-item'; // Matches your CSS
        
        // Active state check based on filename
        const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
        const targetFileName = day.file.split('/').pop();
        
        if (currentFileName === targetFileName) {
            link.classList.add('active');
            // Store the ID globally so the toggle function can find it later
            window.currentVideoId = day.youtubeId; 
            
            // Auto-update the Header title while we are here
            const mainTitle = document.getElementById('main-title');
            if (mainTitle) mainTitle.innerText = `${day.label}: ${day.title}`;
        }

        // Clean formatting for the sidebar text
        const verseLabel = day.verses ? `<span class="day-num">[${day.verses}]</span>` : "";
        
        link.innerHTML = `
            <span class="day-num">${day.label}</span>
            <span class="day-name">${day.title}</span>
            ${verseLabel}
        `;
        
        container.appendChild(link);
    });
}

// Global initialization
window.addEventListener('DOMContentLoaded', initSidebar);
