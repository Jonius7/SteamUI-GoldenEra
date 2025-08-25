// ============================================================================
// REPOSITION MISPLACED NEW NOTE TOOLTIP
// ============================================================================
//

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