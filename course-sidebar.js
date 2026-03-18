// Add all your files here in one place!
const courseDays = [
    { id: 1, file: 'index.html', label: 'Day 1' },
    { id: 2, file: 'Days/Day2.html', label: 'Day 2' },
    { id: 3, file: 'Days/Day3.html', label: 'Day 3' }
];

async function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // 1. Set the Header
    sidebar.innerHTML = `<div class="sidebar-header">By Shri. Ramabhadran V Guruji</div><div id="dynamic-links"></div>`;
    const container = document.getElementById('dynamic-links');

    // 2. Identify where we are (to handle relative paths)
    const isInsideFolder = window.location.pathname.includes('/Days/');
    const currentFileName = window.location.pathname.split("/").pop() || 'index.html';

    for (const day of courseDays) {
        const link = document.createElement('a');
        
        // Adjust paths: If we are in /Days/Day2.html, index.html is "../index.html"
        let finalPath = day.file;
        if (isInsideFolder && !day.file.includes('Days/')) {
            finalPath = '../' + day.file;
        } else if (!isInsideFolder && day.file.includes('Days/')) {
            finalPath = day.file;
        } else if (isInsideFolder && day.file.includes('Days/')) {
            finalPath = day.file.split('/').pop();
        }

        link.href = finalPath;
        link.className = 'day-link';
        
        // Highlight active
        if (day.file.includes(currentFileName)) link.classList.add('active');

        link.innerHTML = `<strong>${day.label}</strong>`;
        container.appendChild(link);

        // Optional: Auto-fetch titles from the files
        fetchTitle(day, link);
    }
}

async function fetchTitle(day, linkElement) {
    try {
        const isInsideFolder = window.location.pathname.includes('/Days/');
        let fetchPath = day.file;
        if (isInsideFolder && !day.file.includes('Days/')) fetchPath = '../' + day.file;

        const response = await fetch(fetchPath);
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const fullTitle = doc.querySelector('h1')?.innerText || "Module";
        // Clean up title (remove "Day X:" prefix if it exists)
        const cleanTitle = fullTitle.includes(':') ? fullTitle.split(':').pop().trim() : fullTitle;
        
        linkElement.innerHTML = `<strong>${day.label}:</strong><br>${cleanTitle}`;
    } catch (e) {
        linkElement.innerHTML = `<strong>${day.label}</strong>`;
    }
}

// Run when page loads
window.addEventListener('DOMContentLoaded', initSidebar);
