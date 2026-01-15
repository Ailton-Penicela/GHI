// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize EmailJS
emailjs.init("dtyoo34bFnFExdoT3");

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'linear-gradient(135deg, #1e4a22 0%, #2c5f2d 100%)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2c5f2d 0%, #3d7a3d 100%)';
    }
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Donation Modal Logic
const modal = document.getElementById('donateModal');
const closeModalBtn = document.querySelector('.close-modal');

function openDonateModal() {
    if (modal) modal.style.display = 'flex';
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Copiado!',
            text: 'Número copiado para a área de transferência',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
            background: '#fff',
            iconColor: '#2c5f2d'
        });
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Form Submission with SweetAlert2 & EmailJS
function handleFormSubmit(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;

        btn.innerText = 'Enviando...';
        btn.disabled = true;

        emailjs.sendForm('GHI_kt5hm42', 'GHI_zqz7pdm', form)
            .then(() => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Mensagem enviada com sucesso! Entraremos em contacto brevemente.',
                    icon: 'success',
                    confirmButtonColor: '#2c5f2d',
                    confirmButtonText: 'Fechar'
                });
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, (error) => {
                console.error('EmailJS Error:', error);
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao enviar. Por favor, tente novamente.',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Fechar'
                });
                btn.innerText = originalText;
                btn.disabled = false;
            });
    });
}

// Initialize Forms
handleFormSubmit('volunteerForm');
handleFormSubmit('contactForm');
