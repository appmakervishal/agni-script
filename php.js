// php.js — The "Works Everywhere" Loader
const phpScript = document.createElement('script');
// Using a version and path known to contain the full build
phpScript.src = 'https://unpkg.com/php-wasm@0.0.9/dist/php-wasm.js';

phpScript.onload = async () => {
    console.log("PHP-WASM Engine Loaded ✅");

    // 1. Initialize the VM
    // In this version, the class is usually available on the window
    const php = new ArrayBuffer(0); // Placeholder
    const instance = new window.PHP(); 

    const phpTags = document.querySelectorAll("php");

    for (let tag of phpTags) {
        const code = tag.textContent.trim();

        // 2. Build UI
        const pre = document.createElement('pre');
        pre.style = "background: #272822; color: #f8f8f2; padding: 15px; border-radius: 5px; margin-bottom: 0; font-size: 14px; overflow: auto;";
        pre.textContent = `<?php\n${code}\n?>`;

        const resultLabel = document.createElement('div');
        resultLabel.innerHTML = "<strong>Output:</strong>";
        resultLabel.style = "margin-top: 10px; font-family: sans-serif; font-size: 0.8em; color: #666;";

        const outputDiv = document.createElement('div');
        outputDiv.style = "background: #eef; padding: 15px; border-left: 5px solid #007bff; font-family: monospace; white-space: pre-wrap; min-height: 1.5em; margin-bottom: 20px;";

        // Clear and Inject
        tag.style.display = 'block';
        tag.innerHTML = '';
        tag.appendChild(pre);
        tag.appendChild(resultLabel);
        tag.appendChild(outputDiv);

        // 3. Execution Logic
        try {
            // Some versions of php-wasm use .run(), others use .exec()
            // We'll capture the output which usually comes back as a string
            const output = instance.run(`<?php ${code} ?>`);
            outputDiv.textContent = output || "(No output)";
        } catch (err) {
            outputDiv.style.background = "#fee";
            outputDiv.style.borderLeftColor = "#f00";
            outputDiv.textContent = "PHP Error: " + err.message;
        }
    }
};

document.head.appendChild(phpScript);
