// 1️⃣ Dynamically load PyScript CSS
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://pyscript.net/releases/2026.1.1/core.css';
document.head.appendChild(link);

// 2️⃣ Dynamically load PyScript JS runtime
const script = document.createElement('script');
script.type = 'module';
script.src = 'https://pyscript.net/releases/2026.1.1/core.js';

script.onload = () => {
    console.log("PyScript runtime loaded! <py-script> tags can now run.");
};

document.head.appendChild(script);
