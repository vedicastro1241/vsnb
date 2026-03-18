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
    const pathParts = window.location.pathname.split('/');
    const currentPath = pathParts.pop() || 'index.html';
    const isInSubfolder = pathParts.includes('Days');

    courseDays.forEach(day => {
        const link = document.createElement('a');
        
        // Path logic: if we are in /Days/, index needs ../. 
        // If we are in /Days/ and target is in Days/, strip the prefix.
        let finalPath = day.file;
        if (isInSubfolder) {
            finalPath = (day.file === 'index.html') ? '../index.html' : day.file.replace('Days/', '');
        }

        link.href = finalPath;
        link.className = 'nav-item';
        
        const targetFileName = day.file.split('/').pop();
        
        if (currentPath === targetFileName) {
            link.classList.add('active');
            // This is the global variable the toggleVideo() function looks for
            window.currentVideoId = day.youtubeId; 
            
            // Update the header title automatically if the element exists
            const mainTitle = document.getElementById('main-title');
            if (mainTitle) mainTitle.innerText = `${day.label}: ${day.title}`;
        }

        const verseLabel = day.verses ? `<span class="day-num" style="color:var(--primary); opacity:1; font-size:0.7rem;">[${day.verses}]</span>` : "";
        
        link.innerHTML = `
            <span class="day-num">${day.label}</span>
            <span class="day-name">${day.title}</span>
            ${verseLabel}
        `;
        
        container.appendChild(link);
    });
}

window.initSidebar = initSidebar;
window.addEventListener('DOMContentLoaded', initSidebar);
