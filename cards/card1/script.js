
/* =========================================
   ASTRE POLARIS | CARD 01
   Editor de personalização
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS PRINCIPAIS
    const card = document.getElementById("cardCanvas");
    const photoUpload = document.getElementById("photoUpload");
    const pngUpload = document.getElementById("pngUpload");
    const photoCount = document.getElementById("photoCount");

    const nicknameInput = document.getElementById("nicknameInput");
    const nicknameText = document.getElementById("nicknameText");
    const showNickname = document.getElementById("showNickname");
    const nicknameFont = document.getElementById("nicknameFont");

    const backgroundColor = document.getElementById("backgroundColor");
    const colorValue = document.getElementById("colorValue");

    const photoFilter = document.getElementById("photoFilter");
    const frameStyle = document.getElementById("frameStyle");

    const decorationCorner = document.getElementById("decorationCorner");
    const decorationLayer = document.getElementById("decorationLayer");
    const decorationList = document.getElementById("decorationList");

    const showStars = document.getElementById("showStars");
    const showGlow = document.getElementById("showGlow");

    const downloadButton = document.getElementById("downloadCard");
    const resetButton = document.getElementById("resetCard");

    // ESTADO DO EDITOR
    let selectedSlot = null;
    let decorations = [];
    let decorationId = 0;

    const slots = [...document.querySelectorAll(".photo-slot")];

    const originalPhotoText = "Nenhuma fotografia selecionada.";

    const filters = {
        none: "none",
        blue: "sepia(0.2) hue-rotate(175deg) saturate(0.9)",
        purple: "sepia(0.2) hue-rotate(225deg) saturate(1.3)",
        pink: "sepia(0.25) hue-rotate(285deg) saturate(1.4)",
        yellow: "sepia(0.65) saturate(1.5)",
        green: "sepia(0.3) hue-rotate(65deg) saturate(1.2)",
        red: "sepia(0.4) saturate(1.8)",
        grayscale: "grayscale(1)",
        vintage: "sepia(0.55) contrast(0.9) saturate(0.8)"
    };

    const symbols = {
        star: "✦",
        sparkle: "✧",
        moon: "☾",
        planet: "♄",
        dot: "⋆"
    };


    // =====================================
    // 1. FOTOGRAFIAS
    // =====================================

    function getSlotImage(slot) {
        return slot.querySelector("img");
    }

    function updatePhotoCount() {
        const count = slots.filter(slot => getSlotImage(slot)).length;

        photoCount.textContent = count === 0
            ? originalPhotoText
            : `${count} de 9 fotografias adicionadas.`;
    }

    function insertPhoto(file, slot) {

        if (!file || !file.type.startsWith("image/")) return;

        const reader = new FileReader();

        reader.onload = event => {

            let image = getSlotImage(slot);

            if (!image) {
                image = document.createElement("img");
                image.alt = "Fotografia personalizada";

                slot.innerHTML = "";
                slot.appendChild(image);
            }

            image.src = event.target.result;
            image.style.setProperty(
                "--photo-filter",
                filters[photoFilter.value]
            );

            updatePhotoCount();
        };

        reader.readAsDataURL(file);
    }

    // Clicar em uma moldura permite escolher onde colocar a foto.
    slots.forEach(slot => {

        slot.addEventListener("click", () => {
            selectedSlot = slot;
            photoUpload.click();
        });

    });

    photoUpload.addEventListener("change", event => {

        const files = [...event.target.files];

        if (!files.length) return;

        let startIndex = selectedSlot
            ? slots.indexOf(selectedSlot)
            : 0;

        if (startIndex < 0) startIndex = 0;

        files.forEach((file, index) => {

            const slotIndex = startIndex + index;

            if (slotIndex >= slots.length) return;

            insertPhoto(file, slots[slotIndex]);

        });

        selectedSlot = null;
        photoUpload.value = "";

    });


    // =====================================
    // 2. APELIDO
    // =====================================

    function updateNickname() {

        const visible = showNickname.checked;

        nicknameText.textContent = nicknameInput.value.trim();

        document.getElementById("nicknameArea").style.display =
            visible ? "flex" : "none";

        nicknameText.style.fontFamily =
            `"${nicknameFont.value}", cursive`;

    }

    nicknameInput.addEventListener("input", updateNickname);
    showNickname.addEventListener("change", updateNickname);
    nicknameFont.addEventListener("change", updateNickname);

    updateNickname();


    // =====================================
    // 3. COR DE FUNDO
    // =====================================

    function updateBackground(color) {

        backgroundColor.value = color;
        card.style.backgroundColor = color;
        colorValue.textContent = color.toUpperCase();

        document.querySelectorAll(".color-option").forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.color.toLowerCase() === color.toLowerCase()
            );

        });

    }

    backgroundColor.addEventListener("input", () => {
        updateBackground(backgroundColor.value);
    });

    document.querySelectorAll(".color-option").forEach(button => {

        button.addEventListener("click", () => {
            updateBackground(button.dataset.color);
        });

    });

    updateBackground("#173c70");


    // =====================================
    // 4. FILTROS
    // =====================================

    function applyFilter() {

        const filter = filters[photoFilter.value] || "none";

        slots.forEach(slot => {

            const image = getSlotImage(slot);

            if (image) {
                image.style.filter = filter;
            }

        });

    }

    photoFilter.addEventListener("change", applyFilter);


    // =====================================
    // 5. MOLDURAS
    // =====================================

    function applyFrame() {

        const selectedFrame = `frame-${frameStyle.value}`;

        slots.forEach(slot => {

            slot.classList.remove(
                "frame-stamp",
                "frame-classic",
                "frame-rounded",
                "frame-square",
                "frame-polaroid",
                "frame-celestial"
            );

            slot.classList.add(selectedFrame);

        });

    }

    frameStyle.addEventListener("change", applyFrame);

    applyFrame();


    // =====================================
    // 6. DECORAÇÕES
    // =====================================

    function renderDecorations() {

        decorationLayer
            .querySelectorAll(".custom-decoration, .symbol-decoration")
            .forEach(item => item.remove());

        decorations.forEach((item, index) => {

            const element = item.type === "png"
                ? document.createElement("img")
                : document.createElement("span");

            if (item.type === "png") {

                element.src = item.content;
                element.alt = "Decoração personalizada";

            } else {

                element.textContent = item.content;
                element.classList.add("symbol-decoration");

            }

            element.classList.add("custom-decoration", item.corner);

            // Pequenos deslocamentos para não sobrepor todos os itens.
            const offsets = [0, 9, -9, 18, -18];

            const offset = offsets[index % offsets.length];

            const positions = {
                "top-left": [8, 8],
                "top-right": [8, 92],
                "bottom-left": [92, 8],
                "bottom-right": [92, 92]
            };

            const [top, left] = positions[item.corner];

            element.style.top = `calc(${top}% + ${offset}px)`;
            element.style.left = `calc(${left}% + ${offset}px)`;

            if (item.type !== "png") {
                element.style.fontSize = "clamp(20px, 4vw, 34px)";
                element.style.color = "#f4f7ff";
                element.style.width = "auto";
                element.style.textShadow =
                    "0 0 12px rgba(210,230,255,0.9)";
            }

            decorationLayer.appendChild(element);

        });

        updateDecorationList();

    }


    // Adicionar símbolos prontos.
    document.querySelectorAll(".decoration-option").forEach(button => {

        button.addEventListener("click", () => {

            const symbol = symbols[button.dataset.decoration];

            if (!symbol) return;

            decorations.push({
                id: ++decorationId,
                type: "symbol",
                content: symbol,
                corner: decorationCorner.value
            });

            renderDecorations();

        });

    });


    // Adicionar PNG personalizado.
    pngUpload.addEventListener("change", event => {

        const files = [...event.target.files];

        files.forEach(file => {

            if (!file.type.startsWith("image/")) return;

            const reader = new FileReader();

            reader.onload = result => {

                decorations.push({
                    id: ++decorationId,
                    type: "png",
                    content: result.target.result,
                    corner: decorationCorner.value
                });

                renderDecorations();

            };

            reader.readAsDataURL(file);

        });

        pngUpload.value = "";

    });


    // Mostrar lista de decorações.
    function updateDecorationList() {

        decorationList.innerHTML = "";

        if (decorations.length === 0) {

            decorationList.textContent =
                "Nenhuma decoração adicionada.";

            return;

        }

        decorations.forEach(item => {

            const row = document.createElement("div");
            row.className = "decoration-item";

            const description = document.createElement("span");

            description.textContent =
                `${item.type === "png" ? "Imagem PNG" : item.content} · ${item.corner}`;

            const removeButton = document.createElement("button");

            removeButton.type = "button";
            removeButton.textContent = "Remover";

            removeButton.addEventListener("click", () => {

                decorations = decorations.filter(
                    decoration => decoration.id !== item.id
                );

                renderDecorations();

            });

            row.append(description, removeButton);
            decorationList.appendChild(row);

        });

    }


    // =====================================
    // 7. ESTRELAS E BRILHOS
    // =====================================

    showStars.addEventListener("change", () => {

        decorationLayer.querySelectorAll(".card-star").forEach(star => {

            star.style.display = showStars.checked ? "block" : "none";

        });

    });

    showGlow.addEventListener("change", () => {

        decorationLayer.classList.toggle(
            "glow-active",
            showGlow.checked
        );

    });

    showGlow.dispatchEvent(new Event("change"));


    // =====================================
    // 8. EXPORTAR PARA PNG
    // =====================================

    downloadButton.addEventListener("click", async () => {

        if (typeof html2canvas === "undefined") {

            alert("Não foi possível carregar o exportador. Verifique sua conexão.");
            return;

        }

        downloadButton.disabled = true;
        downloadButton.textContent = "Preparando seu universo...";

        try {

            await document.fonts.ready;

            const canvas = await html2canvas(card, {

                scale: 3,
                useCORS: true,
                allowTaint: false,
                backgroundColor: backgroundColor.value,
                logging: false,

                onclone: clonedDocument => {

                    const clonedCard = clonedDocument.getElementById("cardCanvas");

                    clonedCard.style.boxShadow = "none";

                }

            });

            const link = document.createElement("a");

            link.download = "astre-polaris-card-01.png";
            link.href = canvas.toDataURL("image/png");

            link.click();

        } catch (error) {

            console.error("Erro ao exportar:", error);

            alert("Não foi possível salvar o card. Tente novamente.");

        } finally {

            downloadButton.disabled = false;
            downloadButton.textContent = "✦ Salvar meu card em PNG";

        }

    });


    // =====================================
    // 9. RESTAURAR CARD
    // =====================================

    resetButton.addEventListener("click", () => {

        const confirmation = confirm(
            "Deseja realmente apagar todas as personalizações do card?"
        );

        if (!confirmation) return;

        // Limpar fotografias.
        slots.forEach(slot => {

            slot.innerHTML = `
                <div class="empty-photo">
                    <span>✧</span>
                    <p>Adicionar foto</p>
                </div>
            `;

        });

        updatePhotoCount();

        // Limpar apelido.
        nicknameInput.value = "";
        showNickname.checked = false;
        nicknameFont.value = "Caveat";
        updateNickname();

        // Restaurar cor.
        updateBackground("#173c70");

        // Restaurar filtros.
        photoFilter.value = "none";
        applyFilter();

        // Restaurar molduras.
        frameStyle.value = "stamp";
        applyFrame();

        // Limpar decorações.
        decorations = [];
        decorationId = 0;
        renderDecorations();

        // Restaurar estrelas e brilhos.
        showStars.checked = true;
        showGlow.checked = true;

        showStars.dispatchEvent(new Event("change"));
        showGlow.dispatchEvent(new Event("change"));

        // Limpar arquivos selecionados.
        photoUpload.value = "";
        pngUpload.value = "";

        selectedSlot = null;

    });


    // =====================================
    // 10. INICIALIZAÇÃO
    // =====================================

    updatePhotoCount();
    updateNickname();
    applyFrame();
    renderDecorations();

    console.log("✦ Astre Polaris | Card 01 iniciado!");

});
