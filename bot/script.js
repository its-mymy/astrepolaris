const OWNER_WHATSAPP = "5592988467507";
const WHATSAPP_MESSAGE =
  "Olá! Conheci o Astre Polaris pelo site e gostaria de saber mais.";
const ownerLink = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const hasOwnerNumber = /^\d{12,13}$/.test(OWNER_WHATSAPP);
function createWhatsAppLink(message) {
  return `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

const ownerContact = document.getElementById("ownerContact");
if (ownerContact) {
  ownerContact.href = ownerLink;
  ownerContact.target = "_blank";
  ownerContact.rel = "noopener noreferrer";
}

document.querySelectorAll(".contact-plan").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (!hasOwnerNumber) return;

    const plan = link.dataset.plan || "Astre Polaris";

    const message =
      `Olá! Tenho interesse no ${plan}. Conheci o bot pelo site do Astre Polaris e gostaria de mais informações.`;

    window.open(
      createWhatsAppLink(message),
      "_blank",
      "noopener,noreferrer"
    );
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

const chatLauncher = document.getElementById("chatLauncher");
const chatWidget = document.getElementById("chatWidget");
const chatClose = document.getElementById("chatClose");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

function toggleChat(open) {
  if (!chatWidget || !chatLauncher) return;

  chatWidget.classList.toggle("open", open);
  chatWidget.setAttribute("aria-hidden", String(!open));
  chatLauncher.setAttribute("aria-expanded", String(open));

  if (open && chatInput) chatInput.focus();
}

if (chatLauncher && chatWidget) {
  chatLauncher.addEventListener("click", () => {
    toggleChat(!chatWidget.classList.contains("open"));
  });
}

if (chatClose) {
  chatClose.addEventListener("click", () => toggleChat(false));
}

function addMessage(text, type) {
  if (!chatMessages) return;
  const message = document.createElement("div");
  message.className =
    `chat-bubble ${type === "user" ? "user-message" : "bot-message"}`;

  message.textContent = text;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function addContactMessage() {
  if (!chatMessages) return;

  const message = document.createElement("div");
  message.className = "chat-bubble bot-message";

  const text = document.createElement("p");

  text.textContent =
    "Oiii! ✨ Claro! Entre em contato diretamente com a minha dona pelo WhatsApp. Ela poderá tirar suas dúvidas, explicar os planos e ajudar você a contratar o Astre! 💗";

  message.appendChild(text);

  const button = document.createElement("a");

  button.href = createWhatsAppLink(
    "Olá! Vim pelo site do Astre Polaris e gostaria de conversar com a responsável."
  );

  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.className = "astre-contact-link";
  button.textContent = "💬 Entre em contato com a dona";
  message.appendChild(button);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function wantsOwnerContact(question) {
  const q = question.toLocaleLowerCase("pt-BR");

  const keywords = [
    "dona",
    "responsável",
    "responsavel",
    "contato",
    "contratar",
    "contratação",
    "contratacao",
    "comprar",
    "whatsapp",
    "falar com alguém",
    "falar com alguem",
    "falar com a pessoa"
  ];

  return keywords.some((word) => q.includes(word));
}
function getAstreAnswer(question) {
  const q = question.toLocaleLowerCase("pt-BR");

  if (
    q.includes("preço") ||
    q.includes("preco") ||
    q.includes("plano") ||
    q.includes("valor") ||
    q.includes("quanto")
  ) {
    return "Temos dois planos! 💗 Com número próprio (você cuida da recarga): R$ 40 por mês. Com número fornecido pela responsável: R$ 50 por mês. Os dois incluem até 3 grupos. Grupos extras têm cobrança adicional.";
  }

  if (
    q.includes("comando") ||
    q.includes("faz") ||
    q.includes("funcionalidade") ||
    q.includes("recurso")
  ) {
    return "Tenho vários comandos! ✨ Amizade, ship, trisal, abraço, soco, jokenpo, personagem de anime, herói, país, tarot e perguntas de sim ou não (!r). Também tenho rank anti-spam, boas-vindas, mutar, advertências e controle de abertura e fechamento do chat.";
  }

  if (
    q.includes("teste") ||
    q.includes("experimentar") ||
    q.includes("grátis") ||
    q.includes("gratuito")
  ) {
    return "Você pode me testar gratuitamente por 1 hora! 🧪 Eu fico no seu grupo durante esse período para todos conhecerem os comandos e as funcionalidades. Se quiser combinar seu teste, posso te encaminhar para minha dona!";
  }

  if (
    q.includes("horário") ||
    q.includes("horario") ||
    q.includes("funciona") ||
    q.includes("24 horas") ||
    q.includes("24h")
  ) {
    return "Por enquanto, meu horário de funcionamento é das 08:00 à meia-noite (00:00). Ainda não fico online 24 horas por dia. 🌙";
  }

  if (q.includes("grupo") || q.includes("quantos")) {
    return "O pacote inicial inclui até 3 grupos. Quer adicionar mais? A dona pode informar o valor adicional. ✨";
  }

  if (
    q.includes("mutar") ||
    q.includes("advert") ||
    q.includes("ban")
  ) {
    return "Também ajudo na moderação! Tenho o comando !mutar e o !adv para advertências. Ao chegar a 5 advertências, o membro é banido automaticamente. Os recursos administrativos são para a equipe responsável do grupo.";
  }

  if (
    q.includes("atualiza") ||
    q.includes("novo comando") ||
    q.includes("personaliza")
  ) {
    return "O projeto pode receber atualizações, correções, melhorias e novos recursos! 🚀";
  }

  if (
    q.includes("olá") ||
    q.includes("ola") ||
    q.includes("oi") ||
    q.includes("e aí") ||
    q.includes("eai")
  ) {
    return "OIIII! ✨ Eu sou o Astre, um SP7 robótico movido a curiosidade e energia! Quer conhecer meus comandos, meus planos ou fazer um teste?";
  }

  return null;
}

function handleQuestion(question) {
  const trimmed = question.trim();

  if (!trimmed) return;

  addMessage(trimmed, "user");

  window.setTimeout(() => {
    if (wantsOwnerContact(trimmed)) {
      addContactMessage();
      return;
    }

    const answer = getAstreAnswer(trimmed);

    if (answer) {
      addMessage(answer, "bot");
    } else {
      addContactMessage();
    }
  }, 350);
}
if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    handleQuestion(chatInput.value);
    chatInput.value = "";
  });
}

document.querySelectorAll(".quick-questions button").forEach((button) => {
  button.addEventListener("click", () => {
    handleQuestion(button.dataset.question || button.textContent);
  });
});

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const starLayer = document.createElement("div");
starLayer.className = "flying-stars";
starLayer.setAttribute("aria-hidden", "true");

document.body.appendChild(starLayer);

const starSymbols = ["✦", "✧", "⋆", "·", "✴"];
const starColors = ["#ffb9df", "#d7a4ff", "#f4e5ff", "#e88bff"];

function createFlyingStars() {
  starLayer.innerHTML = "";

  const amount = window.innerWidth < 600 ? 12 : 22;

  for (let i = 0; i < amount; i++) {
    const star = document.createElement("span");
    star.className = "flying-star";
    star.textContent =
      starSymbols[Math.floor(Math.random() * starSymbols.length)];
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.fontSize = `${8 + Math.random() * 17}px`;
    star.style.color = starColors[Math.floor(Math.random() * starColors.length)];
    star.style.animationDuration = `${9 + Math.random() * 13}s`;
    star.style.animationDelay = `${-Math.random() * 20}s`;

    starLayer.appendChild(star);
  }
}

createFlyingStars();
let starResizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(starResizeTimeout);

  starResizeTimeout = setTimeout(() => {
    createFlyingStars();
  }, 250);
});
