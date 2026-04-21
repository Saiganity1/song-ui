// Update this URL to match your deployed Render Backend API URL
const API_BASE_URL = 'https://song-api-g1nk.onrender.com'; // e.g., 'https://song-api-xxxx.onrender.com'

const songForm = document.getElementById('song-form');
const songList = document.getElementById('song-list');
const errorMessage = document.getElementById('error-message');

// Fetch and display songs
async function fetchSongs() {
    try {
        const response = await fetch(`${API_BASE_URL}/songs`);
        if (!response.ok) throw new Error('Failed to fetch songs');
        const songs = await response.json();
        
        songList.innerHTML = '';
        songs.forEach(song => {
            const div = document.createElement('div');
            div.className = 'song-item';
            div.innerHTML = `
                <div>
                    <strong>${song.title}</strong> by ${song.artist}
                </div>
            `;
            songList.appendChild(div);
        });
    } catch (error) {
        showError('Could not load songs. Make sure your API is running and the URL is set in app.js.');
        console.error(error);
    }
}

// Add a new song
songForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.textContent = '';
    
    const title = document.getElementById('title').value;
    const artist = document.getElementById('artist').value;

    try {
        const response = await fetch(`${API_BASE_URL}/songs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, artist })
        });
        
        if (!response.ok) throw new Error('Failed to add song');
        
        songForm.reset();
        fetchSongs();
    } catch (error) {
        showError('Could not add song. Check console for details.');
        console.error(error);
    }
});

function showError(msg) {
    errorMessage.textContent = msg;
}

// Initial fetch if API URL is set
if (API_BASE_URL !== 'YOUR_RENDER_BACKEND_URL_HERE') {
    fetchSongs();
} else {
    showError('Please set your YOUR_RENDER_BACKEND_URL_HERE in app.js first.');
}
