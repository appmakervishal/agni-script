// php.js — Loader for <php> tags using Sean Morris php-wasm
async function initPHP() {
    // Import the Web Runtime
    const { PhpWeb } = await import('https://cdn.jsdelivr.net/npm/php-wasm/PhpWeb.mjs');

    const phpTags = document.querySelectorAll("php");

    phpTags.forEach(tag => {
        const php = new PhpWeb(); // New instance per block for isolation
        const code = tag.textContent.trim();

        // Build UI
        const pre = document.createElement('pre');
        pre.style = "background: #272822; color: #f8f8f2; padding: 15px; border-radius: 5px; margin-bottom: 0; font-size: 14px;";
        pre.textContent = `<?php\n${code}\n?>`;

        const resultLabel = document.createElement('div');
        resultLabel.innerHTML = "<strong>Output:</strong>";
        resultLabel.style = "margin-top: 10px; font-family: sans-serif; font-size: 0.8em; color: #666;";

        const outputDiv = document.createElement('div');
        outputDiv.style = "background: #eef; padding: 15px; border-left: 5px solid #007bff; font-family: monospace; white-space: pre-wrap; min-height: 1.5em; margin-bottom: 20px;";

        tag.innerHTML = '';
        tag.style.display = 'block';
        tag.appendChild(pre);
        tag.appendChild(resultLabel);
        tag.appendChild(outputDiv);

        // Capture Output
        php.addEventListener('output', (event) => {
            outputDiv.textContent += event.detail;
        });

        // Run code when WASM is ready
        php.addEventListener('ready', () => {
            const cleanCode = code.includes('<?php') ? code : `<?php ${code} ?>`;
            php.run(cleanCode);
        }, { once: true });
    });
}

initPHP();
