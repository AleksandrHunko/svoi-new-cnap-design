export function initNav() {
    const container = document.querySelector('.nav-desktop-top');
    if (!container) return;

    const items = container.querySelectorAll('a');

    function updateNav() {
        const screenWidth = window.innerWidth;

        if (screenWidth < 768) {
            items.forEach(item => item.style.display = 'none');
            return;
        }

        items.forEach(item => {
            item.style.display = 'block'; // reset first
            const itemRight = item.offsetLeft + item.offsetWidth;
            if (itemRight > screenWidth - 250) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
    }

    window.addEventListener('resize', updateNav);
    updateNav();
}


export function initMenuToggle() {
    const menuToggle = document.querySelector("#menuToggle");
    if (!menuToggle) return;
    const checkbox = menuToggle.querySelector("input");
    const menu = document.querySelector(".mobile-menu");

    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            menu.classList.remove("opacity-0", "pointer-events-none");
            menu.classList.add("opacity-100", "pointer-events-auto");
            document.querySelector('.nav-desktop-top').querySelectorAll('a').forEach(item => item.style.display = 'none');
        } else {
            menu.classList.add("opacity-0", "pointer-events-none");
            menu.classList.remove("opacity-100", "pointer-events-auto");
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) return
            document.querySelector('.nav-desktop-top').querySelectorAll('a').forEach(item => {
                item.style.display = 'block'; // reset first
                const itemRight = item.offsetLeft + item.offsetWidth;
                if (itemRight > screenWidth - 250) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'block';
                }
            });
        }
    });
}

export function initAccessibilityDialog() {
    const dialog = document.querySelector("#accessibility-dialog");
    if (!dialog) return;

    if (document.cookie.split('; ').find(row => row.startsWith('enable-contrast'))) {
        document.querySelector('body').classList.add('color-style-contrast')
    }

    const zoomSteps = [90, 100, 110, 125, 150];
    let currentZoomIndex = 1;

    if (document.cookie.split('; ').find(row => row.startsWith('zoom'))) {
        const zoomCookie = document.cookie.split('; ').find(row => row.startsWith('zoom'))
        currentZoomIndex = parseInt(zoomCookie.split("=")[1]) || 1
        document.querySelector("body").classList.add(`zoom-${zoomSteps[currentZoomIndex]}`)
        dialog.querySelector("#scale-value").innerHTML = zoomSteps[currentZoomIndex] / 100 + 'x'
    }

    document.querySelector('#accessibility-button-open')?.addEventListener('click', () => {
        dialog.showModal();
    });
    document.querySelector('#accessibility-button-close')?.addEventListener('click', () => {
        dialog.close();
    });

    dialog.querySelector('.color-enable').addEventListener('click', () => {
        document.querySelector("body").classList.remove("color-style-contrast")
        document.cookie = "enable-contrast=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    })
    dialog.querySelector('.color-disable').addEventListener('click', () => {
        document.querySelector("body").classList.add("color-style-contrast")
        document.cookie = "enable-contrast=true; path=/;";
    })

    dialog.querySelector('.scale-up').addEventListener('click', () => {
        document.querySelector("body").classList.remove(`zoom-${zoomSteps[currentZoomIndex]}`)
        currentZoomIndex = Math.min(currentZoomIndex + 1, zoomSteps.length - 1)
        document.querySelector("body").classList.add(`zoom-${zoomSteps[currentZoomIndex]}`)
        document.cookie = `zoom=${currentZoomIndex}; path=/;`;
        dialog.querySelector("#scale-value").innerHTML = zoomSteps[currentZoomIndex] / 100 + 'x'
    })

    dialog.querySelector('.scale-down').addEventListener('click', () => {
        document.querySelector("body").classList.remove(`zoom-${zoomSteps[currentZoomIndex]}`)
        currentZoomIndex = Math.max(currentZoomIndex - 1, 0)
        document.querySelector("body").classList.add(`zoom-${zoomSteps[currentZoomIndex]}`)
        document.cookie = `zoom=${currentZoomIndex}; path=/;`;
        dialog.querySelector("#scale-value").innerHTML = zoomSteps[currentZoomIndex] / 100 + 'x'
    })
}

export function initSearchDialog() {
    const dialog = document.querySelector("#search-dialog");
    if (!dialog) return
    document.querySelector('#search-button-open')?.addEventListener('click', () => {
        let search_opened = dialog.open ? true : false
        if (!search_opened) {
            dialog.show();
            return
        }
        dialog.close()
    });

    document.querySelector('#search-button-close')?.addEventListener('click', () => {
        dialog.close()
    });
}
