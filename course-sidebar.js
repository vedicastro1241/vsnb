const courseDays = [
    { file: 'index.html', label: 'Day 1' },
    { file: 'Days/Day2.html', label: 'Day 2' },
    { file: 'Days/Day3.html', label: 'Day 3' }
];

async function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `<div class="sidebar-header">By Shri. Ramabhadran V Guruji</div><div id="dynamic-links"></div>`;
    const container = document.getElementById('dynamic-links');

    // Get the base URL (the folder where vsnb lives)
    // If you're in /vsnb/Days/Day2.html, the base is /vsnb/
    const pathParts = window.location.pathname.split('/');
    pathParts.pop(); // remove current file
    if (pathParts[pathParts.length - 1] === 'Days') pathParts.pop(); // remove Days folder if we are in it
    const rootPath = pathParts.join('/') + '/';

    for (const day of courseDays) {
        const link = document.createElement('a');
        
        // Construct an ABSOLUTE path relative to the site root
        // This stops the Days/Days error forever
        const finalPath = window.location.origin + rootPath + day.file;

        link.href = finalPath;
        link.className = 'day-link';
        
        // Active state check
        if (window.location.href === new URL(finalPath).href) {
            link.classList.add('active');
        }

        link.innerHTML = `<strong>${day.label}</strong><br><small>Loading...</small>`;
        container.appendChild(link);

        fetchTitle(finalPath, day.label, link);
    }
}

async function fetchTitle(fetchPath, label, linkElement) {
    try {
        const response = await fetch(fetchPath);
        if (!response.ok) throw new Error();
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const h1 = doc.querySelector('h1')?.innerText || "Module";
        const title = h1.includes(':') ? h1.split(':').pop().trim() : h1;
        linkElement.innerHTML = `<strong>${label}:</strong><br>${title}`;
    } catch (e) {
        linkElement.innerHTML = `<strong>${label}</strong><br>View Module`;
    }
}

window.addEventListener('DOMContentLoaded', initSidebar);
