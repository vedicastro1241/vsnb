const courseDays = [
    { file: 'index.html', label: 'Day 1', title: 'Pūrvabhāga: The Vedic Foundation', verses: 'Introductory Theory', youtubeId: '' },
    { file: 'Day2.html', label: 'Day 2', title: 'Pūrvāṅgam: Vighna-Nivāraṇa', verses: 'Prelude Ślokas 1-2', youtubeId: '5GrhAx-6Tqw' },
    { file: 'Day3.html', label: 'Day 3', title: 'Pūrvāṅgam: Vyāsa-Vandanā', verses: 'Prelude Ślokas 3-4', youtubeId: 'thTeLSb62Zw' },
    { file: 'Day4.html', label: 'Day 4', title: 'Nyāsam: The Body as a Temple', verses: 'Prelude 5-6 & Nyāsam', youtubeId: 'QwxGvk5PqBA' },
    { file: 'Day5.html', label: 'Day 5', title: 'Dhyānam & Prathama-Nāma', verses: 'Stotra 1-8 (The Questions)', youtubeId: 'jdLfG_p3fag' }
];

async function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `
        <div class="sidebar-brand" style="padding: 20px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.1);">
            By Shri. Ramabhadran V Guruji
        </div>
        <div id="dynamic-links"></div>
    `;
    
    const container = document.getElementById('dynamic-links');
    const currentFileName = window.location.pathname.split('/').pop() || 'index.html';

    courseDays.forEach(day => {
        const link = document.createElement('a');
        
        // SIMPLE PATH LOGIC
        // If we are on index.html, we need to go INTO Days/ for others.
        // If we are already in Days/, index.html needs to go UP ../.
        const isCurrentlyIndex = (currentFileName === 'index.html');
        const isTargetIndex = (day.file === 'index.html');
        
        let finalPath = day.file;
        if (isCurrentlyIndex && !isTargetIndex) {
            finalPath = 'Days/' + day.file;
        } else if (!isCurrentlyIndex && isTargetIndex) {
            finalPath = '../index.html';
        }

        link.href = finalPath;
        link.className = 'nav-item';
        
        // MATCHING LOGIC
        if (currentFileName === day.file) {
            link.classList.add('active');
            window.currentVideoId = day.youtubeId; // This feeds the toggleVideo() function
            
            const mainTitle = document.getElementById('main-title');
            if (mainTitle) mainTitle.innerText = `${day.label}: ${day.title}`;
        }

        link.innerHTML = `
            <span class="day-num">${day.label}</span>
            <span class="day-name">${day.title}</span>
            <span class="day-num" style="color:var(--primary); opacity:1; font-size:0.7rem;">[${day.verses}]</span>
        `;
        
        container.appendChild(link);
    });
}

window.addEventListener('DOMContentLoaded', initSidebar);
