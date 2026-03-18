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

    sidebar.innerHTML = `
        <div class="sidebar-brand">By Shri. Ramabhadran V Guruji</div>
        <div id="dynamic-links"></div>
    `;
    
    const container = document.getElementById('dynamic-links');
    const isInSubfolder = window.location.pathname.includes('/Days/');

    // Get the current file name to identify active day
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    courseDays.forEach(day => {
        const link = document.createElement('a');
        let finalPath = day.file;
        if (isInSubfolder) {
            finalPath = (day.file === 'index.html') ? '../index.html' : day.file.replace('Days/', '');
        }

        link.href = finalPath;
        link.className = 'nav-item';
        
        const targetFileName = day.file.split('/').pop();
        
        if (currentPath === targetFileName) {
            link.classList.add('active');
            window.currentVideoId = day.youtubeId; // Crucial for video toggle
            const mainTitle = document.getElementById('main-title');
            if (mainTitle) mainTitle.innerText = `${day.label}: ${day.title}`;
        }

        const verseLabel = day.verses ? `<span class="day-num" style="color:var(--primary); opacity:1;">[${day.verses}]</span>` : "";
        
        link.innerHTML = `
            <span class="day-num">${day.label}</span>
            <span class="day-name">${day.title}</span>
            ${verseLabel}
        `;
        
        container.appendChild(link);
    });
}

// Make it globally accessible
window.initSidebar = initSidebar;
window.addEventListener('DOMContentLoaded', initSidebar);
