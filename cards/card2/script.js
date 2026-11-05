
document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);

  const profileCard = $("profileCard");
  const profilePhoto = $("profilePhoto");
  const photoPlaceholder = $("photoPlaceholder");
  const photoFrame = $("photoFrame");

  // ==========================================
  // FOTO
  // ==========================================

  $("photoInput").addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Escolha um arquivo de imagem.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      profilePhoto.src = reader.result;
      profilePhoto.style.display = "block";
      photoPlaceholder.style.display = "none";
    };

    reader.readAsDataURL(file);
  });

  // ==========================================
  // MOLDURA DA FOTO
  // ==========================================

  function atualizarCorMolduraFoto(color) {
    photoFrame.style.setProperty("--photo-frame-color", color);
  }

  $("photoFrameSelect").addEventListener("change", (event) => {
    photoFrame.className = "photo-frame";
    photoFrame.classList.add(event.target.value);

    // Mantém a cor selecionada ao trocar o modelo
    atualizarCorMolduraFoto($("photoFrameColor").value);
  });

  // ==========================================
  // COR DA MOLDURA DA FOTO
  // ==========================================

  $("photoFrameColor").addEventListener("input", (event) => {
    atualizarCorMolduraFoto(event.target.value);
  });

  // ==========================================
  // MOLDURA DO CARD
  // ==========================================

  $("cardFrameSelect").addEventListener("change", (event) => {
    profileCard.className = "profile-card";
    profileCard.classList.add(event.target.value);

    profileCard.style.borderColor = $("cardFrameColor").value;
  });

  // ==========================================
  // COR DA MOLDURA EXTERNA
  // ==========================================

  $("cardFrameColor").addEventListener("input", (event) => {
    profileCard.style.borderColor = event.target.value;
  });

  // ==========================================
  // APELIDO
  // ==========================================

  $("nicknameInput").addEventListener("input", (event) => {
    $("cardNickname").textContent =
      event.target.value || "Seu apelido";
  });

  $("showNickname").addEventListener("change", (event) => {
    $("cardNickname").style.display =
      event.target.checked ? "block" : "none";
  });

  // ==========================================
  // COR FAVORITA
  // ==========================================

  $("favoriteColorInput").addEventListener("input", (event) => {
    $("cardColor").textContent =
      event.target.value || "Sua cor favorita";
  });

  // ==========================================
  // MBTI
  // ==========================================

  $("mbtiInput").addEventListener("change", (event) => {
    $("cardMbti").textContent =
      event.target.value || "XXXX";
  });

  // ==========================================
  // SUBTIPO
  // ==========================================

  $("subtypeInput").addEventListener("input", (event) => {
    $("cardSubtype").textContent =
      event.target.value || "Seu subtipo";
  });

  // ==========================================
  // TEMPERAMENTO
  // ==========================================

  $("temperamentInput").addEventListener("input", (event) => {
    $("cardTemperament").textContent =
      event.target.value || "Seu temperamento";
  });

  // ==========================================
  // FRASE PERSONALIZADA
  // ==========================================

  $("phraseInput").addEventListener("input", (event) => {
    $("cardPhrase").textContent =
      event.target.value || "Sua frase aparecerá aqui...";
  });

  // ==========================================
  // FONTE GLOBAL
  // ==========================================

  $("fontSelect").addEventListener("change", (event) => {
    profileCard.style.fontFamily = event.target.value;
  });

  // ==========================================
  // COR DE FUNDO
  // ==========================================

  $("backgroundColor").addEventListener("input", (event) => {
    profileCard.style.backgroundColor = event.target.value;
  });

  // ==========================================
  // COR GLOBAL DOS TEXTOS
  // ==========================================

  $("textColor").addEventListener("input", (event) => {
    profileCard.style.setProperty(
      "--card-text",
      event.target.value
    );
  });

  // ==========================================
  // FILTRO DA FOTO
  // ==========================================

  $("photoFilter").addEventListener("change", (event) => {
    profilePhoto.style.filter = event.target.value;
  });

  // ==========================================
  // ESTRELAS
  // ==========================================

  $("showStars").addEventListener("change", (event) => {
    $("profileCard").querySelector(".card-stars").style.display =
      event.target.checked ? "block" : "none";
  });

  // ==========================================
  // LOGO ASTRE POLARIS
  // ==========================================

  $("showLogo").addEventListener("change", (event) => {
    $("profileCard").querySelector(".card-logo").style.display =
      event.target.checked ? "block" : "none";
  });

  // ==========================================
  // DOWNLOAD PNG
  // ==========================================

  $("downloadButton").addEventListener("click", async () => {
    if (typeof html2canvas === "undefined") {
      alert(
        "Não foi possível carregar a ferramenta de exportação. Verifique sua conexão."
      );
      return;
    }

    const button = $("downloadButton");

    button.disabled = true;
    button.textContent = "Preparando seu card...";

    try {
      const canvas = await html2canvas(profileCard, {
        scale: 3,
        useCORS: true,
        backgroundColor: null
      });

      const link = document.createElement("a");

      link.download = "astre-polaris-card-02.png";
      link.href = canvas.toDataURL("image/png");

      link.click();

    } catch (error) {
      console.error(error);

      alert(
        "Não foi possível exportar o card. Tente novamente."
      );

    } finally {
      button.disabled = false;
      button.textContent = "↓ Baixar meu Card 02";
    }
  });

  // ==========================================
  // RESTAURAR CONFIGURAÇÕES
  // ==========================================

  $("resetButton").addEventListener("click", () => {

    // FOTO
    $("photoInput").value = "";

    profilePhoto.removeAttribute("src");
    profilePhoto.style.display = "none";
    profilePhoto.style.filter = "none";

    photoPlaceholder.style.display = "flex";

    // APELIDO
    $("nicknameInput").value = "";
    $("showNickname").checked = true;

    $("cardNickname").textContent = "Seu apelido";
    $("cardNickname").style.display = "block";

    // COR FAVORITA
    $("favoriteColorInput").value = "";
    $("cardColor").textContent = "Sua cor favorita";

    // MBTI
    $("mbtiInput").value = "";
    $("cardMbti").textContent = "XXXX";

    // SUBTIPO
    $("subtypeInput").value = "";
    $("cardSubtype").textContent = "Seu subtipo";

    // TEMPERAMENTO
    $("temperamentInput").value = "";
    $("cardTemperament").textContent = "Seu temperamento";

    // FRASE
    $("phraseInput").value = "";
    $("cardPhrase").textContent =
      "Sua frase aparecerá aqui...";

    // FONTE
    $("fontSelect").value = "'DM Sans', sans-serif";
    profileCard.style.fontFamily = $("fontSelect").value;

    // FUNDO
    $("backgroundColor").value = "#c6e5f5";
    profileCard.style.backgroundColor = "#c6e5f5";

    // COR DOS TEXTOS
    $("textColor").value = "#172d75";

    profileCard.style.setProperty(
      "--card-text",
      "#172d75"
    );

    // MOLDURA DO CARD
    $("cardFrameSelect").value = "card-frame-classic";

    profileCard.className =
      "profile-card card-frame-classic";

    $("cardFrameColor").value = "#5579c9";
    profileCard.style.borderColor = "#5579c9";

    // MOLDURA DA FOTO
    $("photoFrameSelect").value = "frame-classic";

    photoFrame.className = "photo-frame frame-classic";

    $("photoFrameColor").value = "#3554a7";

    atualizarCorMolduraFoto("#3554a7");

    // FILTRO
    $("photoFilter").value = "none";

    // ESTRELAS
    $("showStars").checked = true;

    $("profileCard").querySelector(".card-stars").style.display =
      "block";

    // LOGO
    $("showLogo").checked = true;

    $("profileCard").querySelector(".card-logo").style.display =
      "block";
  });

});
