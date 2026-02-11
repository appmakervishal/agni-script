// php.js — Improved Loader for <php> tags
const phpScript = document.createElement('script');
phpScript.type = 'module';
// Using the modern entry point for php-wasm
phpScript.src = 'https://cdn.jsdelivr.net/npm/php-wasm/php-tags.mjs';

phpScript.onload = () => {
    console.log("PHP-WASM runtime loaded.");

    // Brief delay to ensure the WASM binary is initialized
    setTimeout(() => {
        const phpTags = document.querySelectorAll("php");

        phpTags.forEach((tag, index) => {
            const code = tag.textContent.trim();
            const uniqueId = `php-output-${index}`;

            // 1️⃣ Display PHP code in a <pre> block
            const pre = document.createElement('pre');
            pre.style = "background: #272822; color: #f8f8f2; padding: 15px; border-radius: 5px; margin-bottom: 0; white-space: pre-wrap; font-size: 14px;";
            pre.textContent = `<?php\n${code}\n?>`;

            // 2️⃣ Create output container
            const resultLabel = document.createElement('div');
            resultLabel.innerHTML = "<strong>Output:</strong>";
            resultLabel.style = "margin-top: 10px; font-family: sans-serif; font-size: 0.8em; color: #666;";

            const outputDiv = document.createElement('div');
            outputDiv.id = uniqueId; // Give it a unique ID for the engine to find
            outputDiv.style = "background: #eef; padding: 15px; border-left: 5px solid #007bff; font-family: monospace; white-space: pre-wrap; min-height: 20px;";

            // Clear original tag and append UI
            tag.innerHTML = '';
            tag.style.display = 'block';
            tag.style.marginBottom = '30px';
            tag.appendChild(pre);
            tag.appendChild(resultLabel);
            tag.appendChild(outputDiv);

            // 3️⃣ Inject the actual execution script
            const script = document.createElement('script');
            script.type = 'text/php';
            // Important: data-stdout needs a CSS selector string
            script.setAttribute('data-stdout', `#${uniqueId}`);
            script.textContent = code;
            
            tag.appendChild(script);
        });
    }, 200); 
};

document.head.appendChild(phpScript);
