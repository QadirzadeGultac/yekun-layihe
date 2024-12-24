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
welcomeDiv.innerHTML = `<h1 style="color: #A6A001";>${userName}</h1>`;
signoutDiv.style.display = "none"
if (userName) {
  signin.style.display = "none";
  signoutDiv.style.display = 'flex';
} else {
  const signin = document.querySelector('.signin');
}
const signoutButton = document.querySelector("#signout button");
signoutButton.addEventListener("click", () => {
localStorage.removeItem('userName');
window.location.href = './index.html';
  signin.style.display = "flex";
  signout.style.display = "none";
  welcomeDiv.style.display = "none";
})

////////////////////
welcomeDiv.addEventListener('click', function () {
  const signoutDiv = document.getElementById('signout');
  if (signoutDiv.classList.contains('hidden')) {
      signoutDiv.classList.remove('hidden');
      signoutDiv.classList.add('active');
  } else {
      signoutDiv.classList.add('hidden');
      signoutDiv.classList.remove('active');
  }
});
