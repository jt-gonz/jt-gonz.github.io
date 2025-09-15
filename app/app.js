const contentDiv = document.getElementById("content");
const menuItems = document.querySelectorAll("#menu li");

function loadContent(filepath, liClicked) {
    contentDiv.style.opacity = '0.3';
    contentDiv.style.transform = 'translateY(10px)';

    fetch(filepath)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;

            menuItems.forEach(li => li.classList.remove("active"));
            if (liClicked) liClicked.classList.add("active");

            setTimeout(() => {
                contentDiv.style.opacity = '1';
                contentDiv.style.transform = 'translateY(0)';
            }, 100);

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

    setupTypingEffect();
    setupMouseTracker();
    setupThemeToggle();
});


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
  const cursor = document.createElement('div');
  cursor.classList.add('cursor-follower');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

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
  
  applyThemeToElements(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.classList.remove(currentTheme + '-theme');
    document.body.classList.add(newTheme + '-theme');

    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
    
    applyThemeToElements(newTheme);
  });
}

function applyThemeToElements(theme) {
  const isDark = theme === 'dark';
  
  document.documentElement.style.setProperty('--transition-speed', '0.3s');
  
  document.querySelectorAll('input, textarea, select, button:not(.theme-toggle)').forEach(el => {
    if (isDark) {
      el.style.backgroundColor = el.tagName.toLowerCase() === 'button' ? '#333333' : '#2a2a2a';
      el.style.color = '#ffffff';
      el.style.borderColor = '#444444';
    } else {
      el.style.backgroundColor = '';
      el.style.color = '';
      el.style.borderColor = '';
    }
  });
  
  document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
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
    
    .dark-theme .theme-toggle {
      background: rgba(40, 40, 40, 0.9);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .dark-theme a:not(.project-link), 
    .dark-theme h1 span, 
    .dark-theme #menu li.active,
    .dark-theme #menu li:hover {
      color: #cc3333;
    }
    
    .dark-theme .project-link {
      color: #ff6666;
    }
    
    .dark-theme .project-link::after {
      background-color: #ff6666;
    }
  </style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);
