    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

    // Close navigation when clicking outside
    document.addEventListener('click', function(event) {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
    navMenu.classList.remove('active');
}
});

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });

            // Update active link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');

            // Close mobile navigation
            navMenu.classList.remove('active');
        }
    });
});

    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
    document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + sectionId) {
    link.classList.add('active');
}
});
}
});
});

    // Language toggle
    const languageBtns = document.querySelectorAll('.language-btn');

    languageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');

        // Update active button
        languageBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Toggle language elements
        document.querySelectorAll('.lang-en, .lang-mk').forEach(el => {
            el.style.display = 'none';
        });

        document.querySelectorAll('.lang-' + lang).forEach(el => {
            el.style.display = '';
        });
    });
});

    // Animate skill bars on scroll
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-percentage');

    function animateSkills() {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
    skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
    bar.style.width = width;
}, 300);
});

    window.removeEventListener('scroll', animateSkills);
}
}

    window.addEventListener('scroll', animateSkills);

    // Form submission (for demo purposes)
    const contactForm = document.querySelector('.contact-form form');

    contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // In a real implementation, you would send the form data to a server
    contactForm.reset();
});

    // Role text animation
    const roles = ["Computer Engineering Student", "Backend Developer", "Software Engineer", "Web Programmer"];
    const rolesMk = ["Студент по Компјутерско Инженерство", "Бекенд Девелопер", "Софтверски Инженер", "Веб Програмер"];
    const roleText = document.getElementById('role-text');
    const roleTextMk = document.getElementById('role-text-mk');
    let currentRoleIndex = 0;
    let typingTimeout; // To hold the timeout for typing
    let eraseTimeout; // To hold the timeout for erasing

    function typeWriter(text, element, i = 0) {
    if (i < text.length) {
    element.innerHTML += text.charAt(i);
    i++;
    typingTimeout = setTimeout(() => typeWriter(text, element, i), 100);
} else {
    eraseTimeout = setTimeout(() => eraseText(element), 1000);
}
}

    function eraseText(element) {
    const text = element.innerHTML;
    if (text.length > 0) {
    element.innerHTML = text.substring(0, text.length - 1);
    eraseTimeout = setTimeout(() => eraseText(element), 50);
} else {
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    setTimeout(animateRole, 800);
}
}

    function animateRole() {
    // Clear any existing content
    roleText.innerHTML = '';
    roleTextMk.innerHTML = '';

    // Clear any ongoing animations
    clearTimeout(typingTimeout);
    clearTimeout(eraseTimeout);

    // Determine which language is active
    const isEnglish = document.querySelector('.language-btn[data-lang="en"]').classList.contains('active');

    if (isEnglish) {
    typeWriter(roles[currentRoleIndex], roleText);
} else {
    typeWriter(rolesMk[currentRoleIndex], roleTextMk);
}
}

    // Start the animation
    setTimeout(animateRole, 1000);

    // Update animation when language changes
    languageBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');

        // Clear any ongoing animations
        clearTimeout(typingTimeout);
        clearTimeout(eraseTimeout);

        // Reset text content
        roleText.innerHTML = '';
        roleTextMk.innerHTML = '';

        // Start new animation in the correct language with a slight delay
        setTimeout(() => {
            if (lang === 'en') {
                typeWriter(roles[currentRoleIndex], roleText);
            } else {
                typeWriter(rolesMk[currentRoleIndex], roleTextMk);
            }
        }, 300);
    });
});

    // Timeline Animation
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.getAttribute('data-animate');
                    entry.target.classList.add('animate');

                    if (animationType === 'slide-right') {
                        entry.target.style.transform = 'translateX(0) translateY(0)';
                    } else if (animationType === 'slide-left') {
                        entry.target.style.transform = 'translateX(0) translateY(0)';
                    }
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach((item, index) => {
            const animationType = item.getAttribute('data-animate');

            if (animationType === 'slide-right') {
                item.style.transform = 'translateX(-50px) translateY(50px)';
            } else if (animationType === 'slide-left') {
                item.style.transform = 'translateX(50px) translateY(50px)';
            }

            timelineObserver.observe(item);
        });
    }

    // Initialize timeline animation when DOM is loaded
    document.addEventListener('DOMContentLoaded', initTimelineAnimation);

    // Add staggered animation to subject items
    function animateSubjectItems() {
        const subjectItems = document.querySelectorAll('.subject-item');

        subjectItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Trigger subject items animation when timeline is visible
    const gradesSection = document.querySelector('#grades');
    if (gradesSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateSubjectItems, 500);
                }
            });
        }, { threshold: 0.3 });

        sectionObserver.observe(gradesSection);
    }
