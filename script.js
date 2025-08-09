document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => observer.observe(r));

  fetch("servers/index.json")
    .then(res => res.json())
    .then(list => {
      const grid = document.getElementById("servers-grid");
      list.servers.forEach(file => {
        fetch(`servers/${file}`)
          .then(r => r.json())
          .then(server => {
            const card = document.createElement("div");
            card.className = "server-card reveal";
            card.innerHTML = `
              <div class="server-thumb"><img src="${server.image}" alt="${server.name}"></div>
              <div class="server-info">
                <h3>${server.name}</h3>
                <p>${server.description || "Work in progress"}</p>
                <div class="realm-code">${server.realmCode || "WIP"}</div>
              </div>
            `;
            grid.appendChild(card);
            observer.observe(card);
          });
      });
    });
});
