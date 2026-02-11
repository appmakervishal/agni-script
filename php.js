// php.js — Loader for <php> tags
const phpScript = document.createElement('script');
phpScript.src = 'https://unpkg.com/php-wasm@0.2.2/dist/php-wasm.js';

phpScript.onload = async () => {
    // 1. Initialize the PHP instance
    const php = await window.PHP.load();

    const phpTags = document.querySelectorAll("php");

    for (let tag of phpTags) {
        const code = tag.textContent.trim();

        // 2. Clear the original tag content to keep the UI clean
        tag.style.display = 'block';
        tag.style.marginBottom = '20px';
        tag.innerHTML = ''; 

        // 3. Create a Visual "Code Block"
        const pre = document.createElement('pre');
        pre.style = "background: #272822; color: #f8f8f2; padding: 15px; border-radius: 5px; margin-bottom: 0;";
        pre.textContent = `<?php\n${code}\n?>`;

        // 4. Create the "Result" Box
        const resultLabel = document.createElement('div');
        resultLabel.innerHTML = "<strong>Output:</strong>";
        resultLabel.style = "margin-top: 10px; font-family: sans-serif; font-size: 0.8em; color: #666;";

        const outputDiv = document.createElement('div');
        outputDiv.style = "background: #eef; padding: 15px; border-left: 5px solid #007bff; font-family: monospace; white-space: pre-wrap;";

        // Append elements to the tag
        tag.appendChild(pre);
        tag.appendChild(resultLabel);
        tag.appendChild(outputDiv);

        // 5. Run PHP and capture the output (await async)
        try {
            const output = await php.run(code);
            outputDiv.textContent = output; 
        } catch (err) {
            outputDiv.style.background = "#fee";
            outputDiv.style.borderLeftColor = "#f00";
            outputDiv.textContent = "Fatal Error: " + err.message;
        }
    }
};

document.head.appendChild(phpScript);
