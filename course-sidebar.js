const courseDays = [
    { 
        file: 'index.html', 
        label: 'Day 1', 
        title: 'The Vedic Path', 
        verses: '', 
        youtubeId: '' 
    },
    { 
        file: 'Days/Day2.html', 
        label: 'Day 2', 
        title: 'Vedic Structure', 
        verses: '', 
        youtubeId: '' 
    },
    { 
        file: 'Days/Day3.html', 
        label: 'Day 3', 
        title: 'The Purpose', 
        verses: '', 
        youtubeId: '' 
    },
    { 
        file: 'Days/Day4.html', 
        label: 'Day 4', 
        title: 'Questions of Yudhiṣṭhira', 
        verses: 'Poorvangam 1-5', 
        youtubeId: 'YOUR_VIDEO_ID_HERE' 
    },
    { 
        file: 'Days/Day5.html', 
        label: 'Day 5', 
        title: 'The Divine Architecture', 
        verses: 'Dhyaanam 1-8', 
        youtubeId: 'S2pX9jHwFz0' 
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
