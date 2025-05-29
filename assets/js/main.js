// Scroll progress bar
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollProgress + '%';
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
});

const interactiveElements = document.querySelectorAll('a, button, input, textarea, .model-card, .quiz-option, .view-project');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// Dark/light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    html.classList.toggle('light');
    
    // Save preference to localStorage
    const isDark = html.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
});

// Check for saved preference
if (localStorage.getItem('darkMode') === 'false') {
    html.classList.remove('dark');
    html.classList.add('light');
}


// Enhanced Mobile Menu: Fade, Blur, Staggered Content
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const overlay = mobileMenu.querySelector('.mobile-menu-overlay');
const menuLinks = Array.from(mobileMenu.querySelectorAll('.mobile-menu-link'));
const socialIcons = mobileMenu.querySelector('.mobile-menu-social');
let menuOpen = false;

function openMobileMenu() {
    menuOpen = true;
    mobileMenu.classList.add('active');
    overlay.classList.add('pointer-events-auto');
    overlay.style.opacity = '1';
    // Remove visible first, then stagger in
    menuLinks.forEach(link => link.classList.remove('visible'));
    socialIcons.classList.remove('visible');
    // Stagger fade-in for links
    menuLinks.forEach((link, i) => {
        setTimeout(() => link.classList.add('visible'), 120 + i * 90);
    });
    // Fade in social icons after links
    setTimeout(() => socialIcons.classList.add('visible'), 120 + menuLinks.length * 90 + 100);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    mobileMenu.setAttribute('aria-hidden', 'false');
}

function closeMobileMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('active');
    menuLinks.forEach(link => link.classList.remove('visible'));
    socialIcons.classList.remove('visible');
    overlay.classList.remove('pointer-events-auto');
    overlay.style.opacity = '0';
    document.body.style.overflow = '';
    mobileMenu.setAttribute('aria-hidden', 'true');
}

menuToggle.addEventListener('click', () => {
    if (!menuOpen) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
});

// Close on menu link click
menuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

// Optional: close on overlay click
overlay.addEventListener('click', closeMobileMenu);



// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to hero (from quiz arrow) smooth scroll
const backArrow = document.getElementById('back-to-hero-arrow');
if (backArrow) {
    backArrow.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById('home');
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// Project modal
const projectButtons = document.querySelectorAll('.view-project');
const projectModal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

projectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        
        // In a real implementation, you would fetch project data based on the ID
        // For this demo, we'll use placeholder content
        const projects = {
            '1': {
                title: 'Virtual Museum',
                description: 'This immersive virtual museum experience allows visitors to explore exhibits from anywhere in the world. Our team created highly detailed 3D scans of artifacts and built interactive information points throughout the space. The project utilized WebGL and Three.js for smooth performance across devices.',
                image: 'bg-gradient-to-br from-yellow-500 to-red-600'
            },
            '2': {
                title: 'Augmented Reality App',
                description: 'Our AR application brings 3D models into the real world with remarkable accuracy. Users can place furniture, artwork, or products in their space to visualize how they would look before purchasing. The app features realistic lighting and shadows that adapt to the environment.',
                image: 'bg-gradient-to-br from-purple-500 to-blue-600'
            },
            '3': {
                title: '3D Product Configurator',
                description: 'This interactive product configurator allows customers to customize products in real-time with various colors, materials, and features. The high-fidelity 3D rendering shows accurate material properties and lighting conditions. The tool increased conversion rates by 35% for our client.',
                image: 'bg-gradient-to-br from-green-500 to-teal-600'
            }
        };
        
        const project = projects[projectId];
        
        modalImage.className = `h-96 ${project.image} flex items-center justify-center`;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        
        projectModal.classList.remove('opacity-0');
        projectModal.classList.remove('invisible');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    projectModal.classList.add('opacity-0');
    projectModal.classList.add('invisible');
    document.body.style.overflow = 'auto';
});



// Quiz functionality
const quizData = [
    {
        question: "What does the term 'polygon count' refer to in 3D modeling?",
        options: [
            "The number of polygons in a 3D model",
            "The color palette used for textures",
            "The resolution of the final render",
            "The animation frame rate"
        ],
        answer: 0
    },
    {
        question: "Which of these is NOT a common 3D file format?",
        options: [
            "OBJ",
            "FBX",
            "STL",
            "JPG"
        ],
        answer: 3
    },
    {
        question: "What is the purpose of UV mapping in 3D modeling?",
        options: [
            "To create realistic lighting effects",
            "To apply 2D textures to 3D surfaces",
            "To animate character movements",
            "To optimize polygon count"
        ],
        answer: 1
    },
    {
        question: "Which technique is used to create the illusion of detail without adding polygons?",
        options: [
            "Ray tracing",
            "Normal mapping",
            "Keyframe animation",
            "Boolean operations"
        ],
        answer: 1
    },
    {
        question: "What does 'PBR' stand for in 3D rendering?",
        options: [
            "Polygon-Based Rendering",
            "Physically Based Rendering",
            "Pixel Buffer Resolution",
            "Primary Bounce Reflection"
        ],
        answer: 1
    },
    {
        question: "Which of these is a common method for creating organic 3D shapes?",
        options: [
            "Extrusion",
            "Subdivision surface modeling",
            "Lathe modeling",
            "All of the above"
        ],
        answer: 3
    },
    {
        question: "What is the primary purpose of a 3D rig?",
        options: [
            "To add textures to a model",
            "To prepare a model for animation",
            "To reduce polygon count",
            "To create lighting effects"
        ],
        answer: 1
    }
];

const quizContainer = document.getElementById('quiz');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionDisplay = document.getElementById('current-question');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const quizResults = document.getElementById('quiz-results');
const finalScore = document.getElementById('final-score');
const finalProgress = document.getElementById('final-progress');
const resultMessage = document.getElementById('result-message');
const closeResults = document.getElementById('close-results');

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const quiz = quizData[currentQuestion];
    questionText.textContent = quiz.question;
    optionsContainer.innerHTML = '';
    quiz.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer transition-colors';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index, optionElement));
        optionsContainer.appendChild(optionElement);
    });
    currentQuestionDisplay.textContent = currentQuestion + 1;
    scoreDisplay.textContent = score;
    progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;
}

function selectOption(index, optionElement) {
    // Prevent double answer
    if (optionsContainer.classList.contains('answered')) return;
    optionsContainer.classList.add('answered');

    const quiz = quizData[currentQuestion];
    const options = optionsContainer.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.classList.remove('border-green-500', 'border-red-500', 'bg-green-500', 'bg-red-500', 'bg-opacity-10');
        if (i === quiz.answer) {
            opt.classList.add('border-green-500', 'bg-green-500', 'bg-opacity-10');
        } else if (i === index && i !== quiz.answer) {
            opt.classList.add('border-red-500', 'bg-red-500', 'bg-opacity-10');
        }
    });

    if (index === quiz.answer) {
        score++;
        scoreDisplay.textContent = score;
    }

    setTimeout(() => {
        optionsContainer.classList.remove('answered');
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 700); // Short delay for feedback

    // Ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = optionElement.getBoundingClientRect();
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
    ripple.style.left = (event ? event.offsetX : rect.width/2) - rect.width/2 + 'px';
    ripple.style.top = (event ? event.offsetY : rect.height/2) - rect.height/2 + 'px';
    optionElement.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);

    if (index === quizData[currentQuestion].answer) {
        optionElement.classList.add('correct');
        setTimeout(() => optionElement.classList.remove('correct'), 700);
    }
}

function showResults() {
    finalScore.textContent = score;
    const percentage = (score / quizData.length) * 100;
    finalProgress.style.width = `${percentage}%`;

    let message;
    if (percentage >= 90) {
        message = "Expert level! You clearly know your 3D design concepts.";
    } else if (percentage >= 70) {
        message = "Great job! You have a solid understanding of 3D design.";
    } else if (percentage >= 50) {
        message = "Not bad! You know some 3D design basics.";
    } else {
        message = "Keep learning! Check out our resources to improve your 3D design knowledge.";
    }

    resultMessage.textContent = message;
    quizResults.classList.remove('opacity-0', 'invisible');
    document.body.style.overflow = 'hidden';

    // Confetti effect (full screen)
    if (window.confetti) {
        window.confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 }
        });
    } else {
        // Dynamically load confetti if not present
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
        script.onload = () => {
            window.confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 }
            });
        };
        document.body.appendChild(script);
    }
}

closeResults.addEventListener('click', () => {
    quizResults.classList.add('opacity-0', 'invisible');
    document.body.style.overflow = 'auto';
    // Reset quiz
    currentQuestion = 0;
    score = 0;
    loadQuestion();
});

// Initialize quiz
loadQuestion();

// Contact form
const contactForm = document.getElementById('contact-form');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    submitText.textContent = 'Sending...';
    submitSpinner.classList.remove('hidden');
    
    // Simulate form submission
    setTimeout(() => {
        submitText.textContent = 'Message Sent!';
        submitSpinner.classList.add('hidden');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            submitText.textContent = 'Send Message';
        }, 2000);
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});



//refresh to hero

document.addEventListener('DOMContentLoaded', function() {
    // Remove hash and scroll to #home on page load/refresh
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
    const hero = document.getElementById('home');
    if (hero) {
        hero.scrollIntoView({ behavior: 'auto' });
    }
});



document.addEventListener('DOMContentLoaded', function() {
    pannellum.viewer('virtual-tour-viewer', {
        "default": {
            "firstScene": "lobby",
            "sceneFadeDuration": 1000
        },
        "scenes": {
            "lobby": {
                "title": "Lobby",
                "panorama": "media/virtualtour/lobby.jpg", // Replace with your PanoVR panorama
                "hotSpots": [
                    {
                        "pitch": 2,
                        "yaw": 120,
                        "type": "scene",
                        "text": "Go to Gallery",
                        "sceneId": "gallery"
                    }
                ]
            },
            "gallery": {
                "title": "Gallery",
                "panorama": "media/virtualtour/gallery.jpg", // Replace with your PanoVR panorama
                "hotSpots": [
                    {
                        "pitch": 0,
                        "yaw": -60,
                        "type": "scene",
                        "text": "Back to Lobby",
                        "sceneId": "lobby"
                    }
                ]
            }
            // Add more scenes as needed
        }
    });
});

// magnetic buttons and cards
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    el.style.setProperty('--mx', `${mx}px`);
    el.style.setProperty('--my', `${my}px`);
    el.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    el.style.setProperty('--mx', `0px`);
    el.style.setProperty('--my', `0px`);
    el.classList.remove('active');
  });
});


// Ascroll triggered sections
function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setTimeout(() => el.classList.add('visible'), i * 80);
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// Add to selectOption in main.js
function selectOption(index, optionElement) {
  // Ripple effect
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = optionElement.getBoundingClientRect();
  ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
  ripple.style.left = (event ? event.offsetX : rect.width/2) - rect.width/2 + 'px';
  ripple.style.top = (event ? event.offsetY : rect.height/2) - rect.height/2 + 'px';
  optionElement.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);

  if (index === quizData[currentQuestion].answer) {
    optionElement.classList.add('correct');
    setTimeout(() => optionElement.classList.remove('correct'), 700);
  }
}

