// ============================================================================
// REPOSITION MISPLACED NEW NOTE TOOLTIP
// ============================================================================
//


/*
// Select the container to observe
const container = document.querySelector('._1UJDmU3N-pkv7oTJ_Zf9nK');

// Function to run when a tooltip appears
function onTooltipAppear(tooltip) {
    console.log('Tooltip appeared:', tooltip);
    const children = tooltip.children;
    for (const child of children) {
        const rect = child.getBoundingClientRect();
        child.style.top = `138px`;
        child.style.left = `55px`;
    }
}

// Create a MutationObserver
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.matches('._2_lmTz0tA4NOSle5WaO1PZ')) {
                onTooltipAppear(node);
            }
        });
    }
});

// Start observing the container for child additions
observer.observe(container, { childList: true, subtree: true });
*/


/* ----- */


// Select the container to observe
const container = document.querySelector('._1UJDmU3N-pkv7oTJ_Zf9nK');

// Function to run when a tooltip appears
function onTooltipAppear(button, tooltip, top, left) {
    console.log('Tooltip appeared for button:', button);

    const rect = button.getBoundingClientRect();

    const child = tooltip.firstElementChild;
    if (child) {
        child.style.top = `${rect.bottom + top}px`; // 8px below the button
        child.style.left = `${rect.left + left}px`;      // align with button
        console.log('top ' + child.style.top + ' left ' + child.style.left);
    }
}

// Create a MutationObserver
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.matches('._2_lmTz0tA4NOSle5WaO1PZ')) {
                // Find the active button(s)
                const addButton = document.querySelector('._3Sjbkvk647UKKVLX6J7gsW');
                const deleteButton = document.querySelector('._1fu6xumTI1nCY5wc6FG_N2');

                if (addButton && addButton.matches(':hover')) {
                    onTooltipAppear(addButton, node, -32, 45);
                } else if (deleteButton && deleteButton.matches(':hover')) {
                    onTooltipAppear(deleteButton, node, -36, -96);
                }
            }
        });
    }
});

// Start observing the container for child additions
observer.observe(container, { childList: true, subtree: true });
