const contentDiv = document.getElementById("content");
const menuItems = document.querySelectorAll("#menu li");

function loadContent(filepath, liClicked) {
    fetch(filepath)
        .then(response => response.text())
        .then(data => {
            document.getElementById("content").innerHTML = data;

            menuItems.forEach(li => li.classList.remove("active"));
            if (liClicked) liClicked.classList.add("active");
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
});

// Language switcher animation
document.addEventListener('DOMContentLoaded', () => {
  const navUl = document.querySelector('.nav-ul');
  const langLinks = document.querySelectorAll('.nav-li a');

  navUl.classList.add('en');

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

// WORK
function flipCard(card) {
    card.classList.toggle('flipped');
}

function handleLinkClick(event) {
  event.stopPropagation(); // Prevent card flip

  document.querySelectorAll('.project-link').forEach(link => {
    link.classList.remove('active');
  });

  event.target.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
  const projectLinks = document.querySelectorAll('.project-link');

  projectLinks.forEach(link => {
    link.addEventListener('click', handleLinkClick);
  });
});
