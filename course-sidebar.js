const courseDays = [
    { id: 1, file: 'index.html', label: 'Day 1' },
    { id: 2, file: 'Days/Day2.html', label: 'Day 2' },
    { id: 3, file: 'Days/Day3.html', label: 'Day 3' }
];

async function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `<div class="sidebar-header">By Shri. Ramabhadran V Guruji</div><div id="dynamic-links"></div>`;
    const container = document.getElementById('dynamic-links');

    const isInsideFolder = window.location.pathname.includes('/Days/');
    const currentFileName = window.location.pathname.split("/").pop() || 'index.html';

    for (const day of courseDays) {
        const link = document.createElement('a');
        let finalPath = '';

        // FIXING THE PATH LOGIC HERE:
        if (isInsideFolder) {
            // If we are already in the Days folder...
            if (day.file === 'index.html') {
                finalPath = '../index.html'; // Go up to find home
            } else {
                finalPath = day.file.replace('Days/', ''); // Remove "Days/" prefix because we are already in it
            }
        } else {
            // If we are on the index.html (root)
            finalPath = day.file; // Use path as defined in the array
        }

        link.href = finalPath;
        link.className = 'day-link';
        
        // Highlight active link
        if (day.file.includes(currentFileName)) link.classList.add('active');

        link.innerHTML = `<strong>${day.label}</strong>`;
        container.appendChild(link);

        // Fetch the title using the corrected path
        fetchTitle(finalPath, day.label, link);
    }
}

async function fetchTitle(fetchPath, label, linkElement) {
    try {
        const response = await fetch(fetchPath);
        if (!response.ok) throw new Error();
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const fullTitle = doc.querySelector('h1')?.innerText || "Module";
        const cleanTitle = fullTitle.includes(':') ? fullTitle.split(':').pop().trim() : fullTitle;
        
        linkElement.innerHTML = `<strong>${label}:</strong><br>${cleanTitle}`;
    } catch (e) {
        linkElement.innerHTML = `<strong>${label}</strong>`;
    }
}

window.addEventListener('DOMContentLoaded', initSidebar);
