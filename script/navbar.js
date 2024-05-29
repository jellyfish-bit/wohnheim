const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animation-fadein');
      return;
    }

    entry.target.classList.remove('animation-fadein');

  });
});
const elementHeader = document.getElementById("header");
const elementMenuButton = document.getElementById("menu-toggle");


let prevScrollpos = window.scrollY;
let prevScrollposSmooth = window.scrollY + 50;
let linkScroll = false;
let linkScollTime = setTimeout(() => {
  linkScroll = false;
}, 1000);

// Visual
for (element of document.getElementsByClassName("fadein")) {
  observer.observe(element);
}

// Interaction
setTimeout(() => {
  window.onscroll = () => {
    const currentScrollPos = window.scrollY;

    if (prevScrollpos >= currentScrollPos) {

      showHeader();
      document.getElementById("menu-list").classList.remove("header-hide");

      prevScrollposSmooth = currentScrollPos + 100;

    } else if (prevScrollposSmooth < currentScrollPos) {
      hideHeader();
      document.getElementById("menu-list").classList.add("header-hide");

      prevScrollposSmooth = currentScrollPos;
      closeDropDownMenu(false);
    } else {
      closeDropDownMenu(false);
    }
    prevScrollpos = currentScrollPos;
  }
  document.addEventListener("mousemove", mousemoveHeader);
}, 4000)

document.addEventListener("click", (event) => {
  shouldHideNavMenu(event.target)
});
document.addEventListener("touchend", (event) => {
  shouldHideNavMenu(event.target);
});

function shouldHideNavMenu(pTarget) {
  if (!window.matchMedia("(max-width: 700px)")) {
    return;
  }
  if (!pTarget.matches('#menu-toggle') && !pTarget.matches('.menu-button') &&
    !pTarget.matches('.nav-link')
    && !pTarget.matches('.menu-button-container')) {
    closeDropDownMenu(false);
  }
}
function mousemoveHeader(pEvent) {
  if (document.getElementById("menu-toggle").checked) {
    if (window.matchMedia("(max-width: 55rem)")) {
      return;
    }
  }
  if (pEvent.clientY < elementHeader.clientHeight * 2) {
    if (pEvent.clientY < elementHeader.clientHeight) {
      showHeader();
    } else if (pEvent.movementY > 0) {
      hideHeader();
    }
  }
}

function closeDropDownMenu(pForce) {
  if (linkScroll && !pForce) {
    return;
  }
  document.getElementById("menu-toggle").checked = false;
}

function showHeader() {
  elementHeader.classList.remove("header-hide");
  elementHeader.classList.add("header-show");
}
function hideHeader() {
  if (linkScroll) {
    return;
  }
  elementHeader.classList.remove("header-show");
  elementHeader.classList.add("header-hide");
}

function toggleLinkScroll() {
  linkScroll = true;
  clearTimeout(linkScollTime);

  linkScollTime = setTimeout(() => {
    linkScroll = false;
  }, 1000);
}


