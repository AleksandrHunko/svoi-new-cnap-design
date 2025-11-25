
export function initAccordionMenu() {
    const accordions = document.querySelectorAll(".accordion-menu")
    if (!accordions) return

    // change accordion height on resize
    window.addEventListener("resize", () => {
        for (let i = 0; i < accordions.length; i++) {
            const openButton = accordions[i].querySelector(".click-open");
            if (openButton && openButton.classList.contains("open")) {
                accordions[i].style.maxHeight = accordions[i].scrollHeight + "px";
            }
        }
    });


    for (let i = 0; i < accordions.length; i++) {
        const accordion = accordions[i];

        // add valid height to each accordion for open/collapse animation to work
        accordion.style.maxHeight = accordion.scrollHeight + "px";

        const openButton = accordion.querySelector(".click-open");
        if (!openButton) continue;

        openButton.addEventListener("click", () => {
            if (window.innerWidth >= 768 && openButton.classList.contains("accordion-mobile-only")) return;

            const isOpen = openButton.classList.contains("open");
            if (isOpen) {
                openButton.classList.remove("open");
                const accordionStyle = getComputedStyle(accordion);
                const paddingTop = parseFloat(accordionStyle.paddingTop);
                const paddingBottom = parseFloat(accordionStyle.paddingBottom);
                accordion.style.maxHeight = (openButton.offsetHeight + paddingTop + paddingBottom) + "px"
                accordion.style.overflowY = "hidden";
            } else {
                openButton.classList.add("open");
                accordion.style.maxHeight = accordion.scrollHeight + "px";
                setTimeout(() => accordion.style.overflowY = "visible", 300);
            }
        });
    }
}