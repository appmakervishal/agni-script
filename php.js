// php.js — Final Loader for <php> tags
async function runPHP() {
    // 1. Load the modern WASM module
    const { PHP } = await import('https://cdn.jsdelivr.net/npm/php-wasm/php-wasm.mjs');
    
    // 2. Initialize the PHP VM
    const php = await PHP.load();
    console.log("PHP-WASM Engine Ready ✅");

    const phpTags = document.querySelectorAll("php");

    for (let tag of phpTags) {
        const code = tag.textContent.trim();

        // Build UI: Code Block
        const pre = document.createElement('pre');
        pre.style = "background: #272822; color: #f8f8f2; padding: 15px; border-radius: 5px; margin-bottom: 0; font-size: 14px;";
        pre.textContent = `<?php\n${code}\n?>`;

        // Build UI: Output Container
        const resultLabel = document.createElement('div');
        resultLabel.innerHTML = "<strong>Output:</strong>";
        resultLabel.style = "margin-top: 10px; font-family: sans-serif; font-size: 0.8em; color: #666;";

        const outputDiv = document.createElement('div');
        outputDiv.style = "background: #eef; padding: 15px; border-left: 5px solid #007bff; font-family: monospace; white-space: pre-wrap; min-height: 1.5em;";

        // Clear original and inject UI
        tag.innerHTML = '';
        tag.style.display = 'block';
        tag.style.marginBottom = '30px';
        tag.appendChild(pre);
        tag.appendChild(resultLabel);
        tag.appendChild(outputDiv);

        // 3. Direct Execution
        try {
            // We ensure code has tags so the parser recognizes it
            const scriptToRun = code.includes('<?php') ? code : `<?php ${code} ?>`;
            const output = await php.run(scriptToRun);
            outputDiv.textContent = output || "(No output)";
        } catch (err) {
            outputDiv.style.background = "#fee";
            outputDiv.style.borderLeftColor = "#f00";
            outputDiv.textContent = "PHP Error: " + err.message;
        }
    }
}

// Start the process
runPHP();
