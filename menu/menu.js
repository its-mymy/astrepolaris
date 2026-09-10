fetch("menu/index.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("menu").innerHTML = html;

        const menuButton = document.getElementById("menuButton");
        const menuPanel = document.getElementById("menuPanel");
        const closeButton = document.getElementById("closeButton");

        function openMenu() {
            menuPanel.classList.add("active");
            menuButton.classList.add("hidden");
        }

        function closeMenu() {
            menuPanel.classList.remove("active");

            setTimeout(() => {
                menuButton.classList.remove("hidden");
            }, 250);
        }

        menuButton.addEventListener("click", openMenu);
        closeButton.addEventListener("click", closeMenu);

        menuPanel.addEventListener("click", event => {
            if (event.target === menuPanel) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    })
    .catch(error => {
        console.error("Erro ao carregar o menu:", error);
    });