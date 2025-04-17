document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const ribbonOverlay = document.getElementById('ribbonOverlay');
  const unwrapBtn = document.getElementById('unwrapBtn');
  const mainContent = document.getElementById('mainContent');
  const popperContainer = document.getElementById('popperContainer');
  const loader = document.getElementById('loader');
  const loadBar = document.getElementById('loadBar');
  const musicToggle = document.getElementById('musicToggle');
  const photoGallery = document.getElementById('photoGallery');
  const heartBtn = document.getElementById('heartBtn');
  const loveNote = document.getElementById('loveNote');
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popupText');
  const closePopup = document.getElementById('closePopup');
  const effects = document.getElementById('effects');

  // Photos Data
  const photos = [
    { img: 'memory1.jpg', message: 'This was the first time I saw you my girl 💗 ' },
    { img: 'memory2.jpg', message: 'The days we used to tease and play together ...😭 it was an initial phase but still one of the cutest ones 🐣 ' },
    { img: 'memory3.jpg', message: 'The unforgettable Rakshabandhan Night ??? 🐥🌻' },
    { img: 'memory4.jpg', message: ' Anushku ziiiis Editing skillls 🐮 ' },
    { img: 'memory5.jpg', message: '10/10 Bihariii baddie on her farewellll ... Cutieee 💗' },
    { img: 'memory6.jpg', message: 'Finally Manjhi Jayantiiii 🐮 💗' }
  ];

  // Audio
  const birthdaySong = new Audio('https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-108.mp3');
  birthdaySong.volume = 0.3;
  birthdaySong.loop = true;

  // Initialize
  init();

  function init() {
    // Simulate loading
    simulateLoading();
    
    // Create photo gallery
    createPhotoGallery();
    
    // Set up event listeners
    setupEventListeners();
  }

  function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      loadBar.style.width = `${progress}%`;
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 500);
        }, 500);
      }
    }, 50);
  }

  function createPhotoGallery() {
    photos.forEach(photo => {
      const photoDiv = document.createElement('div');
      const img = new Image();
      
      img.src = photo.img;
      img.alt = "Memory";
      img.onerror = () => {
        photoDiv.innerHTML = '<div class="missing-photo">Memory</div>';
        photoDiv.style.display = 'flex';
        photoDiv.style.alignItems = 'center';
        photoDiv.style.justifyContent = 'center';
        photoDiv.style.backgroundColor = 'rgba(255,255,255,0.2)';
      };
      
      photoDiv.appendChild(img);
      photoDiv.addEventListener('click', () => showPopup(photo.message));
      photoGallery.appendChild(photoDiv);
    });
  }

  function setupEventListeners() {
    // Unwrap button
    unwrapBtn.addEventListener('click', handleUnwrap);
    
    // Popper click
    popperContainer.addEventListener('click', createConfetti);
    
    // Heart button
    heartBtn.addEventListener('click', handleHeartClick);
    
    // Music toggle
    musicToggle.addEventListener('click', toggleMusic);
    
    // Close popup
    closePopup.addEventListener('click', hidePopup);
    
    // Floating elements on scroll
    window.addEventListener('scroll', createFloatingElement);
  }

  function handleUnwrap() {
    // Play unwrap sound
    const unwrapSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3');
    unwrapSound.play();
    
    // Hide ribbon overlay
    ribbonOverlay.style.opacity = '0';
    setTimeout(() => {
      ribbonOverlay.style.display = 'none';
    }, 500);
    
    // Show main content
    mainContent.style.display = 'block';
    
    // Animate popper
    popperContainer.style.animation = 'popIn 0.5s forwards';
    
    // Play birthday song
    birthdaySong.play();
    musicToggle.textContent = '🔊';
    
    // Create initial confetti
    createConfetti();
  }

  function createConfetti() {
    const floaters = ['❤️', '💖', '💗', '🎈', '🎈', '🎈'];
    const colors = [
      '#FF5252', // Bright red
      '#FF8A80', // Light red
      '#FFCDD2', // Pale pink
      '#FFFFFF'  // White
    ];
    
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'floating-effect';
        confetti.textContent = floaters[Math.floor(Math.random() * floaters.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.fontSize = `${Math.random() * 15 + 25}px`; // Larger size
        confetti.style.animationDuration = `${Math.random() * 2 + 4}s`;
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Add random rotation
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Brighter colors for better visibility
        if (Math.random() > 0.7) {
          confetti.style.filter = 'brightness(1.2)';
        }
        
        effects.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 6000);
      }, i * 150);
    }
    
    const popSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
    popSound.play();
  }


  function handleHeartClick() {
    loveNote.classList.add('visible');
    heartBtn.style.display = 'none';
    createFloatingHearts();
    
    setTimeout(() => {
      loveNote.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  function createFloatingHearts() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-effect';
        heart.textContent = '💖';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animation = `float ${Math.random() * 3 + 2}s linear forwards`;
        effects.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
      }, i * 150);
    }
  }

  function showPopup(message) {
    popupText.textContent = message;
    popup.style.display = 'flex';
  }

  function hidePopup() {
    popup.style.display = 'none';
  }

  function toggleMusic() {
    if (birthdaySong.paused) {
      birthdaySong.play();
      musicToggle.textContent = '🔊';
    } else {
      birthdaySong.pause();
      musicToggle.textContent = '🔇';
    }
  }

  function createFloatingElement() {
    if (Math.random() > 0.95) { // Less frequent floating elements
      const floaters = ['❤️', '💖', '💗', '🎈'];
      const element = document.createElement('div');
      element.className = 'floating-effect';
      element.textContent = floaters[Math.floor(Math.random() * floaters.length)];
      element.style.left = `${Math.random() * 100}vw`;
      element.style.fontSize = `${Math.random() * 20 + 20}px`;
      element.style.animationDuration = `${Math.random() * 3 + 4}s`;
      element.style.color = `hsl(${Math.random() * 30 + 350}, 100%, 70%)`; // Red-pink colors
      effects.appendChild(element);
      
      setTimeout(() => element.remove(), 7000);
    }
  }
});
