const animalLinks = document.querySelectorAll("a[data-animal]");

function renderAnimal(selectedAnimal) {
  animalLinks.forEach((link) => {
    const animal = link.dataset.animal;
    const name = animal[0].toUpperCase() + animal.slice(1);
    const isSelected = animal === selectedAnimal;
    const mood = isSelected ? "happy" : "sad";
    const card = link.querySelector("div");

    card.className = mood;
    card.querySelector("h2").textContent = isSelected
      ? `${name} is best!`
      : `${name} is not best. ${name} is sad.`;
    card.querySelector("img").src = `/static/${mood}_${animal}.jpeg`;
    card.querySelector("img").alt = `${isSelected ? "Happy" : "Sad"} ${animal}`;
    if (isSelected) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderLocation() {
  // Read the URL on initial load, refresh, and history navigation.
  const match = window.location.pathname.match(/^\/spa\/(cat|dog|bear)$/);
  renderAnimal(match ? match[1] : null);
}

animalLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Preserve browser shortcuts such as Command/Ctrl-click for a new tab.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey
        || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    const path = new URL(link.href).pathname;
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    renderLocation();
  });
});

window.addEventListener("popstate", renderLocation);
renderLocation();
