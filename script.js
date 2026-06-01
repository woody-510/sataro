// Image list based on the directory contents
const images = [
    'image/ahuro.jpeg',
    'image/bakabon.jpeg',
    'image/bed.jpeg',
    'image/call.jpeg',
    'image/car.jpeg',
    'image/gohan.jpeg',
    'image/ikemen.jpeg',
    'image/keirei.jpeg',
    'image/lajento.jpeg',
    'image/megane.jpeg',
    'image/nakayubi.jpeg',
    'image/peace.jpeg',
    'image/shinkannsen.jpeg',
    'image/sinngekinokyozin.jpeg',
    'image/ski.jpeg',
    'image/sotuaru.jpeg'
];

const container = document.getElementById('container');
const startOverlay = document.getElementById('start-overlay');
const bgMusic = document.getElementById('bg-music');

let isPlaying = false;

// 10 levels of size (square dimension in px, from 60px to 330px)
const sizeLevels = [60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

// 10 levels of speed (animation duration in seconds, from fast(4s) to slow(22s))
const speedLevels = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

startOverlay.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        
        // Start playing the background music
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide the start overlay
        startOverlay.style.opacity = '0';
        setTimeout(() => {
            startOverlay.style.visibility = 'hidden';
            startOverlay.style.display = 'none';
        }, 500);
        
        // Start spawning images
        startSpawning();
    }
});

function spawnImage() {
    if (!isPlaying) return;

    const img = document.createElement('img');
    
    // Select random image
    const randomImage = images[Math.floor(Math.random() * images.length)];
    img.src = randomImage;
    
    // 1. Image Size Adjustment (10 levels)
    // To ensure images look uniform ("全て同じ大きさに調整"), we make them square with object-fit: cover
    const sizeIndex = Math.floor(Math.random() * 10);
    const size = sizeLevels[sizeIndex];
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    
    img.className = 'flowing-image';
    
    // Random vertical position (0 to viewportHeight - size)
    const maxTop = window.innerHeight - size;
    const randomTop = Math.random() * maxTop;
    img.style.top = randomTop + 'px';
    
    // 2. Speed Adjustment (10 levels)
    const speedIndex = Math.floor(Math.random() * 10);
    const duration = speedLevels[speedIndex];
    
    // Random delay (0s to 2s) for an organic starting stagger
    const delay = Math.random() * 2;
    
    // Apply animation
    img.style.animation = `flow ${duration}s linear ${delay}s forwards`;
    
    // Add image to container
    container.appendChild(img);
    
    // Clean up memory after animation finishes
    setTimeout(() => {
        if (img.parentNode) {
            img.parentNode.removeChild(img);
        }
    }, (duration + delay) * 1000 + 1000); // add 1s buffer just in case
}

function startSpawning() {
    // Initial burst so the screen doesn't start completely empty
    for (let i = 0; i < 15; i++) {
        // For the initial burst, we can spawn them already slightly scattered
        spawnImage();
    }
    
    // Continuously spawn images to fill the screen ("画面いっぱいを埋め尽くすぐらい")
    // 150ms interval produces a lot of images over time
    setInterval(spawnImage, 150);
}
