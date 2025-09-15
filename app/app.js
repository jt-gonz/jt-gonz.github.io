const contentDiv = document.getElementById("content");
const menuItems = document.querySelectorAll("#menu li");

function loadContent(filepath, liClicked) {
    // Add fade out effect before loading
    contentDiv.style.opacity = '0.3';
    contentDiv.style.transform = 'translateY(10px)';

    fetch(filepath)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;

            menuItems.forEach(li => li.classList.remove("active"));
            if (liClicked) liClicked.classList.add("active");

            // Fade in effect after loading
            setTimeout(() => {
                contentDiv.style.opacity = '1';
                contentDiv.style.transform = 'translateY(0)';
            }, 100);

            // Setup all dynamic effects
            setupSkillsClickHandler();
            setupProjectCardEffects();
            setupTypingEffect();
        })
        .catch(error => console.error("Error loading content:", error));
}

menuItems.forEach(li => {
    li.addEventListener("click", () => {
        const file = li.getAttribute("file");
        const filepath = "./components/" + file + ".html";

        console.log(filepath);
        loadContent(filepath, li);
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const defaultLi = document.querySelector("#menu li[file='about']");
    if (defaultLi) {
        const filepath = "./components/" + defaultLi.getAttribute("file") + ".html";
        loadContent(filepath, defaultLi);
    }

    // Initialize all effects on page load
    setupTypingEffect();
    setupMouseTracker();
    setupThemeToggle();
});

// Language switcher animation
document.addEventListener('DOMContentLoaded', () => {
  const navUl = document.querySelector('.nav-ul');
  const langLinks = document.querySelectorAll('.nav-li a');

  if (navUl) navUl.classList.add('en');

  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      if (link.parentNode === langLinks[0].parentNode) {
        navUl.classList.remove('es');
        navUl.classList.add('en');
      } else {
        navUl.classList.remove('en');
        navUl.classList.add('es');
      }
    });
  });
});

// WORK - Existing functions
function flipCard(card) {
    card.classList.toggle('flipped');
}

function handleLinkClick(event) {
  event.stopPropagation();
  document.querySelectorAll('.project-link').forEach(link => {
    link.classList.remove('active');
  });
  event.target.classList.add('active');
}

function setupProjectCardEffects() {
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });
}

function setupSkillsClickHandler() {
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(skill => {
    skill.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
}

function setupTypingEffect() {
  const titles = document.querySelectorAll('h2');

  titles.forEach(title => {
    const originalText = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid #cc3333';
    title.style.animation = 'blink 1s infinite';

    let index = 0;
    const typeTimer = setInterval(() => {
      title.textContent = originalText.slice(0, index + 1);
      index++;

      if (index === originalText.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          title.style.borderRight = 'none';
          title.style.animation = 'none';
        }, 1000);
      }
    }, 100);
  });
}

function setupMouseTracker() {
  // Create cursor follower
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-follower');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Add hover effects to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.backgroundColor = 'rgba(204, 51, 51, 0.3)';
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.backgroundColor = 'rgba(204, 51, 51, 0.1)';
    });
  });
}

function setupThemeToggle() {
  const themeToggle = document.createElement('button');
  themeToggle.innerHTML = '🌙';
  themeToggle.classList.add('theme-toggle');
  themeToggle.style.position = 'fixed';
  themeToggle.style.top = '20px';
  themeToggle.style.right = '20px';
  themeToggle.style.zIndex = '1000';
  document.body.appendChild(themeToggle);

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(savedTheme + '-theme');
  themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.classList.remove(currentTheme + '-theme');
    document.body.classList.add(newTheme + '-theme');

    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);

    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  });
}

const dynamicStyles = `
  <style>
    @keyframes blink {
      0%, 50% { border-color: transparent; }
      51%, 100% { border-color: #cc3333; }
    }
    
    .cursor-follower {
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: rgba(204, 51, 51, 0.1);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease, background-color 0.2s ease;
      transform: translate(-50%, -50%);
    }
    
    .theme-toggle {
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    
    .theme-toggle:hover {
      transform: scale(1.1);
    }
    
    .dark-theme {
      background-color: #1a1a1a !important;
      color: #ffffff !important;
    }
    
    .dark-theme .project-card,
    .dark-theme .skill-item,
    .dark-theme .about-card {
      background-color: #2d2d2d !important;
      color: #ffffff !important;
      border-color: #444 !important;
    }
    
    .dark-theme header,
    .dark-theme nav {
      background-color: #1a1a1a !important;
      border-color: #444 !important;
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);