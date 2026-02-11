// lua.js — Loader for <lua> tags using Fengari

// 1️⃣ Dynamically load Fengari runtime
const fengariScript = document.createElement('script');
fengariScript.src = 'https://unpkg.com/fengari-web/dist/fengari-web.js';

fengariScript.onload = () => {
    console.log("Fengari Lua runtime loaded.");

    // 2️⃣ Scan all <lua> tags
    const luaTags = document.querySelectorAll("lua");

    luaTags.forEach(tag => {
        const code = tag.textContent;

        // Create a div to show output
        const outputDiv = document.createElement('div');
        outputDiv.style.margin = '4px 0';
        outputDiv.style.padding = '4px';
        outputDiv.style.backgroundColor = '#f0f0f0';
        outputDiv.style.borderRadius = '4px';
        tag.parentNode.insertBefore(outputDiv, tag.nextSibling);

        // Override print to write to output div
        const oldPrint = fengari.interop.print;
        fengari.interop.print = (text) => {
            outputDiv.innerHTML += text + "<br>";
        };

        // Execute Lua code
        fengari.load(code)();

        // Restore original print
        fengari.interop.print = oldPrint;
    });
};

document.head.appendChild(fengariScript);
