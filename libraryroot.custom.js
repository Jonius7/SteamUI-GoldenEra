// ============================================================================
// LEFT SIDEBAR TOGGLE FUNCTIONALITY
// CREDIT: Steam 2.0 modular by Br1Rol2
// ============================================================================

/**
* Storage key for sidebar visibility state
*/
const SIDEBAR_VISIBILITY_KEY = "steam_sidebar_visibility";

/**
* Adds a toggle button to the sidebar panel
* @param {HTMLElement} panel - The sidebar panel element
*/
function addSidebarToggleButton(panel, container) {
    // Prevent adding multiple buttons
    if (container.querySelector(".toggle-panel-button")) return;
    
    const toggleButton = document.createElement("button");
    toggleButton.innerText = "⮜"; // Arrow indicating panel can be collapsed
    toggleButton.classList.add("toggle-panel-button");
    
    // Position the button outside the panel
    toggleButton.style.cssText = `
    position: absolute;
    left: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    padding: 5px 10px;
    background: rgb(51 51 51 / 57%);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 1000;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
  `;
    
    // Load saved state
    const isVisible = loadSidebarVisibility();
    let isOpen = isVisible;
    
    // Set initial state
    if (!isOpen) {
        panel.style.display = "none";
        toggleButton.innerText = "⮞";
        toggleButton.style.right = "-33px";
    }
    
    toggleButton.addEventListener("click", () => {
        if (isOpen) {
            // Hide panel
            panel.style.display = "none";
            toggleButton.innerText = "⮞";
            toggleButton.style.right = "-33px";
        } else {
            // Show panel
            panel.style.display = "flex";
            toggleButton.innerText = "⮜";
            toggleButton.style.right = "-33px";
        }
        
        isOpen = !isOpen;
        saveSidebarVisibility(isOpen);
    });
    
    container.appendChild(toggleButton);
}

/**
* Loads the saved sidebar visibility state
* @returns {boolean} True if the sidebar should be visible
*/
function loadSidebarVisibility() {
    const saved = localStorage.getItem(SIDEBAR_VISIBILITY_KEY);
    return saved !== "false"; // Default to visible if no saved state
}

/**
* Saves the sidebar visibility state
* @param {boolean} isVisible - Whether the sidebar should be visible
*/
function saveSidebarVisibility(isVisible) {
    localStorage.setItem(SIDEBAR_VISIBILITY_KEY, isVisible.toString());
}

/**
* Observes the DOM for the sidebar panel and the right panel and adds toggle functionality
*/
function observeSidebarPanel() {
    const observer = new MutationObserver(() => {
        const sidebar = document.querySelector("._9sPoVBFyE_vE87mnZJ5aB");
        const rightPanel = document.querySelector("._3BFcmjAaMyP6GTPwc0VyWi");
        if (sidebar) {
            addSidebarToggleButton(sidebar, rightPanel);
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}

// Initialize sidebar toggle functionality
observeSidebarPanel();