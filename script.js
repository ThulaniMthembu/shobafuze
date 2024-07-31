document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("nav-container");
    const hamburger = document.getElementById("hamburger");
    const linksContainer = document.getElementById("links-container");
    const links = document.querySelectorAll("#links-container a");
    const hamburgerIcon = '<i class="bx bx-menu bx-md"></i>';
    const closeIcon = '<i class="bx bx-x bx-md"></i>';
    const galleryImages = document.querySelectorAll(".gallery-images");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementsByClassName("close")[0];
    const serviceBtn = document.getElementById("service-btn");
    const servicesModal = document.getElementById("services-modal");
    const modalClose = document.getElementById("modal-close");
    const form = document.getElementById("booking-form");
    const submissionModal = document.getElementById("submission-modal");
    const submissionMessage = document.getElementById("submission-message");
    const submissionModalClose = document.getElementById("submission-modal-close");

    // Function to handle scrolling
    function handleScroll() {
        if (window.scrollY > 0) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleScroll);

    // Function to toggle menu
    function toggleMenu() {
        hamburger.classList.toggle("active");

        if (linksContainer.classList.contains("show")) {
            linksContainer.classList.remove("show");
            linksContainer.classList.add("hide");
            setTimeout(() => {
                linksContainer.classList.remove("hide");
                linksContainer.style.display = 'none';
            }, 500);
        } else {
            linksContainer.style.display = 'block';
            setTimeout(() => {
                linksContainer.classList.remove("hide");
                linksContainer.classList.add("show");
            }, 10);
        }

        hamburger.innerHTML = (hamburger.innerHTML === hamburgerIcon) ? closeIcon : hamburgerIcon;
    }

    hamburger.addEventListener("click", toggleMenu);

    links.forEach(link => {
        link.addEventListener("click", function () {
            if (linksContainer.classList.contains("show")) {
                toggleMenu();
            }
        });
    });

    // Helper function to show modal
    function showModal(modal) {
        modal.style.display = "block";
    }

    // Helper function to hide modal
    function hideModal(modal) {
        modal.style.display = "none";
    }

    // Open modal on button click
    serviceBtn.addEventListener("click", function (event) {
        event.preventDefault();
        showModal(servicesModal);
    });

    // Close modal when clicking on <span> (x)
    modalClose.onclick = function () {
        hideModal(servicesModal);
    };

    // Close modals and hamburger menu when clicking outside
    window.onclick = function (event) {
        if (event.target === servicesModal) {
            hideModal(servicesModal);
        }

        if (event.target === submissionModal) {
            hideModal(submissionModal);
        }

        if (!event.target.closest('#nav-container')) {
            if (linksContainer.classList.contains('show')) {
                toggleMenu();
            }
        }
    };

    // Ensure the navbar links are displayed correctly on window resize
    function handleResize() {
        if (window.innerWidth >= 781) {
            linksContainer.style.display = 'block';
            linksContainer.classList.remove('hide', 'show');
            hamburger.innerHTML = hamburgerIcon;
            hamburger.classList.remove('active');
        } else {
            if (!linksContainer.classList.contains('show')) {
                linksContainer.style.display = 'none';
            }
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on page load

    // Gallery images lightbox
    galleryImages.forEach(image => {
        image.addEventListener("click", function () {
            showModal(lightbox);
            lightboxImg.src = this.src;
        });
    });

    closeBtn.onclick = function () {
        hideModal(lightbox);
    };

    lightbox.onclick = function (event) {
        if (event.target !== lightboxImg) {
            hideModal(lightbox);
        }
    };

    // Form submission handling code
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                submissionMessage.innerHTML = "Submitted successfully! <br> Thank you for your submission! We will get back to you as soon as possible.";
                showModal(submissionModal);
                form.reset();
            } else {
                const responseData = await response.json();
                if (responseData.errors) {
                    submissionMessage.innerHTML = responseData.errors.map(error => error.message).join(", ");
                } else {
                    submissionMessage.innerHTML = "Oops! There was a problem submitting your form.";
                }
                showModal(submissionModal);
            }
        } catch (error) {
            submissionMessage.innerHTML = "Oops! There was a problem submitting your form.";
            showModal(submissionModal);
        }
    }

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    // Close submission modal
    submissionModalClose.onclick = function () {
        hideModal(submissionModal);
    };

    // Close submission modal when clicking outside of it
    window.onclick = function (event) {
        if (event.target === submissionModal) {
            hideModal(submissionModal);
        }

        if (event.target === servicesModal) {
            hideModal(servicesModal);
        }
    };
});
