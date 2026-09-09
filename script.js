const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
}

function createStars() {
    const amount = Math.min(
        320,
        Math.floor((window.innerWidth * window.innerHeight) / 5000)
    );

    stars = [];

    for (let i = 0; i < amount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.8 + 0.2,
            speed: Math.random() * 0.25 + 0.05,
            alpha: Math.random() * 0.7 + 0.2,
            color: Math.random() > 0.85
                ? "#a98aff"
                : Math.random() > 0.7
                    ? "#63dfff"
                    : "#ffffff"
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const star of stars) {

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = -5;
            star.x = Math.random() * canvas.width;
        }

        const parallaxX = mouseX * star.size * 0.01;
        const parallaxY = mouseY * star.size * 0.01;

        ctx.beginPath();
        ctx.arc(
            star.x + parallaxX,
            star.y + parallaxY,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.fill();
    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(drawStars);
}

window.addEventListener("mousemove", event => {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;

    document.documentElement.style.setProperty(
        "--mouse-x",
        `${mouseX}px`
    );

    document.documentElement.style.setProperty(
        "--mouse-y",
        `${mouseY}px`
    );
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
drawStars();