// ============================================================================
// DYNAMIC BOTTOM BAR TO TOP POSITION 
// CREDIT: Simple Dark by shdwmtr
// ============================================================================

//responsible for coordinating when the length of the title bar changes, so it will displace the bottom bars positioning respectively
new MutationObserver((mutations) => {
	mutations.forEach(function(mutation) {
		mutation.addedNodes.forEach(function(addedNode) {
			//looking for steamdesktop_OuterFrame_3mz8w which is the parent of titlebarcontrols_TitleBarControls_
			if (addedNode.classList && addedNode.classList.contains('_3mz8wQ6Q44B8P7pzPP4Iyw')) {
				const title_bar_controls = document.querySelector('._3cykd-VfN_xBxf3Qxriccm')
				const bottom_bar_controls = document.querySelector('._3vCzSrrXZzZjVJFZNg9SGu')
				const top_bar_container = document.querySelector("._3Z3ohQ8-1NKnCZkbS6fvy")
				//fires `changeOffset` before adding mutationobs
				changeOffset(bottom_bar_controls, title_bar_controls.offsetWidth)
				//titlebar observer
				new MutationObserver((mutationsList) => {
					for (const _ of mutationsList) {
						//every time the titlebar changes, update the offset of the bottombars positioning (they are exactly relative)
						changeOffset(bottom_bar_controls, title_bar_controls.offsetWidth)
					}
					//listen for mutations on the titlebar, but we dont listen for anything in specific, just changes
				}).observe(title_bar_controls, { attributes: true, childList: true, subtree: true, characterData: true });
				
				//Workaround to "refresh" the bottombars positioning without waiting the titlebar to change size by clicking the top empty space
				top_bar_container.addEventListener("click", () => {
					changeOffset(bottom_bar_controls, title_bar_controls.offsetWidth)
				})
			}
		});
	});
	//create an observer on the document body so you can read new DOM modifications. 
	//used to tell when titlebar contents have loaded
}).observe(document.body, { childList: true, subtree: true });

function changeOffset(bottom, offsetWidth) {
	bottom.style.setProperty('right', `${offsetWidth + 103}px`, 'important')
};


// ============================================================================
// BOTTOM TOP BAR BUTTONS TOOLTIPS
// ============================================================================

const bodyContainer = document.getElementsByClassName("QsvsRVwbsApgKt1MhM0fz")[0];

// Map of selectors to tooltip text
const tooltipMap = {
	'._1TdaAqMFadi0UTqilrkelR': 'Friends & Chat',
	'._2EQ7ghgqIdjKv9jsQC0Zq9': 'Manage Downloads',
	'._2foCkpRXhqq0UGVE50BWqj': 'Add a Game'
};

// Function to add tooltip event listeners
function addTooltipEvents(el, tooltipText) {
	if (el._tooltipInitialized) return; // Avoid adding twice
	el._tooltipInitialized = true;
	
	el.addEventListener('mouseenter', () => {
		const tooltipContainer = document.createElement('div');
		tooltipContainer.className = '_2_lmTz0tA4NOSle5WaO1PZ';
		bodyContainer.appendChild(tooltipContainer);
		
		const tooltipWrapper = document.createElement('div');
		tooltipWrapper.className = '_3vg1vYU7iTWqONciv9cuJN _1Ye_0niF2UqB8uQTbm8B6B';
		tooltipContainer.appendChild(tooltipWrapper);
		
		const tooltip = document.createElement('div');
		tooltip.className = '_2FxbHJzYoH024ko7zqcJOf';
		tooltip.textContent = tooltipText;
		tooltipWrapper.appendChild(tooltip);
		
		// Position tooltip below the div and horizontally centered
		const rect = el.getBoundingClientRect();
		
		tooltipWrapper.style.left = rect.left + rect.width / 2 + 'px'; // center relative to div
		tooltipWrapper.style.top = rect.bottom + 7 + 'px'; // 5px below div
		tooltipWrapper.style.transform = 'translateX(-50%)'; // center the tooltip horizontally
		
		el._tooltip = tooltipContainer;
	});
	
	el.addEventListener('mouseleave', () => {
		if (el._tooltip) {
			bodyContainer.removeChild(el._tooltip);
			el._tooltip = null;
		}
	});
}

// Attach tooltips to existing elements
for (const selector in tooltipMap) {
	document.querySelectorAll(selector).forEach(el => {
		addTooltipEvents(el, tooltipMap[selector]);
	});
}

// Set up MutationObserver to watch for new matching elements
const observer = new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
			mutation.addedNodes.forEach(node => {
				if (node.nodeType !== 1) return; // Only elements
				
				for (const selector in tooltipMap) {
					if (node.matches(selector)) {
						addTooltipEvents(node, tooltipMap[selector]);
					}
					
					// Also check descendants
					node.querySelectorAll(selector).forEach(child => {
						addTooltipEvents(child, tooltipMap[selector]);
					});
				}
			});
		}
	});
});

// Start observing bodyContainer for new child elements and subtree
observer.observe(bodyContainer, { childList: true, subtree: true });
