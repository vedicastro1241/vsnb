const courseDays = [
    { 
        file: 'index.html', 
        label: 'Day 1', 
        title: 'Pūrvabhāga: The Vedic Foundation', 
        verses: 'Introductory Theory', 
        youtubeId: '' // No ID provided for Day 1
    },
    { 
        file: 'Days/Day2.html', 
        label: 'Day 2', 
        title: 'Pūrvāṅgam: Vighna-Nivāraṇa', 
        verses: 'Prelude Ślokas 1-2', 
        youtubeId: '5GrhAx-6Tqw' 
    },
    { 
        file: 'Days/Day3.html', 
        label: 'Day 3', 
        title: 'Pūrvāṅgam: Vyāsa-Vandanā', 
        verses: 'Prelude Ślokas 3-4', 
        youtubeId: 'thTeLSb62Zw' 
    },
    { 
        file: 'Days/Day4.html', 
        label: 'Day 4', 
        title: 'Nyāsam: The Body as a Temple', 
        verses: 'Prelude 5-6 & Nyāsam', 
        youtubeId: 'QwxGvk5PqBA' 
    },
    { 
        file: 'Days/Day5.html', 
        label: 'Day 5', 
        title: 'Dhyānam & Prathama-Nāma', 
        verses: 'Stotra 1-8 (The Questions)', 
        youtubeId: 'jdLfG_p3fag' 
    }
];

async function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Use your existing header style
    sidebar.innerHTML = `<div class="sidebar-header">By Shri. Ramabhadran V Guruji</div><div id="dynamic-links"></div>`;
    const container = document.getElementById('dynamic-links');

    // Path Logic (Root handling)
    const pathParts = window.location.pathname.split('/');
    pathParts.pop(); 
    if (pathParts[pathParts.length - 1] === 'Days') pathParts.pop(); 
    const rootPath = pathParts.join('/') + '/';

    courseDays.forEach(day => {
        const link = document.createElement('a');
        const finalPath = window.location.origin + rootPath + day.file;

        link.href = finalPath;
        link.className = 'day-link';
        
        // Active state check
        if (window.location.href === new URL(finalPath).href) {
            link.classList.add('active');
            // Update the Video Player if an ID exists for the current page
            if (day.youtubeId) updateVideoPlayer(day.youtubeId);
        }

        // Verse Label Logic
        const verseBadge = day.verses 
            ? `<br><span style="color:var(--primary); font-size:0.75rem; font-weight:bold;">[${day.verses}]</span>` 
            : "";

        // Construct the Link HTML using the data from the array
        link.innerHTML = `<strong>${day.label}:</strong><br>${day.title}${verseBadge}`;
        container.appendChild(link);
    });
}

// Function to handle the YouTube Embed
function updateVideoPlayer(videoId) {
    const iframe = document.getElementById('ytPlayer');
    if (iframe && videoId) {
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
    }
}

window.addEventListener('DOMContentLoaded', initSidebar);
