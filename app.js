const menuItems = document.querySelectorAll(".menu a");
const portfolioItems = document.querySelectorAll(".portfolio-ul li");
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    toggleColor(menuItems, item);
  });
});
portfolioItems.forEach(item => {
  item.addEventListener("click", () => {
    toggleColorLi(portfolioItems, item);
  });
});
function toggleColorLi(elements, selectedElement) {
  elements.forEach(element => {
    if (element === selectedElement) {
      element.classList.add("portfolio-li");
    } else {
      element.classList.remove("portfolio-li");
    }
  });
}
function toggleColor(elements, selectedElement) {
  elements.forEach(element => {
    if (element === selectedElement) {
      element.classList.add("yellow");
    } else {
      element.classList.remove("yellow");
    }
  });
}
function changeLanguage(selectElement) {
  const language = selectElement.value;
  if (language === 'az') {
    window.location.href = './indexaz.html';
  }
  else if (language === 'ru') {
    window.location.href = './indexru.html';
  } else if (language === 'en') {
    window.location.href = './index.html';
  }
}
//////    Scrol hadisesi
const scrollUpButton = document.getElementById("scrollUp");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollUpButton.style.display = "block";
  } else {
    scrollUpButton.style.display = "none";
  }
});
scrollUpButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
//header
const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const menuLink = document.querySelector(`.menu a[href="#${id}"]`);
      if (entry.isIntersecting) {
        menuItems.forEach((link) => link.classList.remove("yellow"));
        menuLink.classList.add("yellow");
      }
    });
  },
  {
    root: null,
    threshold: 0.6,
  }
);
sections.forEach((section) => observer.observe(section));
//about me display block
const aboutme = document.querySelector(".aboutme");
const aboutmeText = document.querySelector(".aboutme-text")
aboutme.addEventListener("click", () => {
  aboutmeText.classList.toggle("dis-none");
})
/////
// İstifadəçi adını localStorage-dan almaq ucun
const userName = localStorage.getItem('userName');
const welcomeDiv = document.getElementById('welcomeMessage');
const signout = document.getElementById("signout");
const signin = document.querySelector('.signin');
const signoutDiv = document.querySelector(".signout-div");
const logout = document.querySelector(".logout");
welcomeDiv.innerHTML = `<h1 style="color: #A6A001";>${userName}</h1>`;
signoutDiv.style.display = "none"
if (userName) {
  signin.style.display = "none";
  signoutDiv.style.display = 'flex';
  logout.style.display = 'flex';
} else {
  const signin = document.querySelector('.signin');
}
logout.addEventListener("click", () => {
localStorage.removeItem('userName');
location.reload();
  signin.style.display = "flex";
  signout.style.display = "none";
  welcomeDiv.style.display = "none";
})

////
// Burger menyuya klik funksiyası əlavə edirik
document.querySelector('.burger').addEventListener('click', function () {
  const menu = document.querySelector('.header-ul ul');
  menu.classList.toggle('active')
});
