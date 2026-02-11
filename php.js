// php.js — Loader for <php> tags using Sean Morris's php-wasm
async function initPHP() {
    // 1. Import the Web Runtime
    const { PhpWeb } = await import('https://cdn.jsdelivr.net/npm/php-wasm/PhpWeb.mjs');
    const php = new PhpWeb();

    const phpTags = document.querySelectorAll("php");

    for (let tag of phpTags) {
        const code = tag.textContent.trim();

        // 2. Build UI
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

        // 3. Capture Output
        // The Sean Morris build uses event listeners for STDOUT
        php.addEventListener('output', (event) => {
            outputDiv.textContent += event.detail;
        });

        // 4. Run the code once the WASM is ready
        php.addEventListener('ready', () => {
            // Ensure code is wrapped in PHP tags
            const cleanCode = code.includes('<?php') ? code : `<?php ${code} ?>`;
            php.run(cleanCode);
        }, { once: true });
    }
}

initPHP();
