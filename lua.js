// lua.js — Loader for <lua> tags, displays code + output

// 1️⃣ Load Fengari runtime
const fengariScript = document.createElement('script');
fengariScript.src = 'https://unpkg.com/fengari-web/dist/fengari-web.js';

fengariScript.onload = () => {
    console.log("Fengari Lua runtime loaded.");

    // 2️⃣ Process all <lua> tags
    const luaTags = document.querySelectorAll("lua");

    luaTags.forEach(tag => {
        const code = tag.textContent.trim();

        // Display the Lua code itself
        const codeBlock = document.createElement('pre');
        codeBlock.textContent = code;
        codeBlock.style.backgroundColor = '#f9f9f9';
        codeBlock.style.padding = '6px';
        codeBlock.style.border = '1px solid #ccc';
        codeBlock.style.borderRadius = '4px';
        codeBlock.style.whiteSpace = 'pre-wrap';
        tag.parentNode.insertBefore(codeBlock, tag);

        // Create output div
        const outputDiv = document.createElement('div');
        outputDiv.style.margin = '4px 0';
        outputDiv.style.padding = '4px';
        outputDiv.style.backgroundColor = '#eef';
        outputDiv.style.borderRadius = '4px';
        tag.parentNode.insertBefore(outputDiv, tag.nextSibling);

        // Override print to write to output div
        const oldPrint = fengari.interop.print;
        fengari.interop.print = (text) => {
            outputDiv.innerHTML += text + "<br>";
        };

        // Execute Lua code
        try {
            fengari.load(code)();
        } catch (err) {
            outputDiv.innerHTML = "Error: " + err.message;
        }

        // Restore original print
        fengari.interop.print = oldPrint;
    });
};

document.head.appendChild(fengariScript);
