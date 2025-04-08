document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Typing animation in hero section
    const typingText = document.querySelector('.typing-text');
    const words = ["Phishing Scams", "Identity Theft", "Online Fraud", "Romance Scams", "Cybercrime"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Change word
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }

    // Start typing animation
    setTimeout(type, 1500);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');

    function animateStats() {
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const increment = target / 50;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                    }
                    stat.textContent = Math.floor(current) + (stat.getAttribute('data-count') === '95' ? '%' : '+');
                }, 20);
            });

            // Remove event listener after animation
            window.removeEventListener('scroll', animateStats);
        }
    }

    window.addEventListener('scroll', animateStats);

    // Comic strip navigation
    const comicPanels = document.querySelectorAll('.comic-panel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const comicProgress = document.querySelector('.comic-progress');
    let currentPanel = 0;

    function showPanel(index) {
        comicPanels.forEach(panel => panel.classList.remove('active'));
        comicPanels[index].classList.add('active');
        
        // Update progress bar
        const progress = ((index + 1) / comicPanels.length) * 100;
        comicProgress.style.setProperty('--progress', progress + '%');
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === comicPanels.length - 1;
    }

    prevBtn.addEventListener('click', function() {
        if (currentPanel > 0) {
            currentPanel--;
            showPanel(currentPanel);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentPanel < comicPanels.length - 1) {
            currentPanel++;
            showPanel(currentPanel);
        }
    });

    // Initialize first panel
    showPanel(0);

    // Case study modal
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    const caseStudyModal = document.querySelector('.case-study-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.querySelector('.modal-body');

    // Case study data
    const caseStudies = {
        1: {
            title: "The Phishing Email Scam",
            content: `
                <h2>The Phishing Email Scam</h2>
                <div class="case-timeline">
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Initial Contact</h4>
                            <p>Sarah received an email that appeared to be from her bank, asking her to verify her account details due to "suspicious activity." The email looked legitimate, complete with the bank's logo and branding.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Fake Website</h4>
                            <p>She clicked the link which took her to a website that looked identical to her bank's login page. Without thinking, she entered her username and password.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>The Aftermath</h4>
                            <p>Within hours, the scammers had emptied her savings account and opened several credit cards in her name. Sarah felt violated and didn't know where to turn.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h4>Our Intervention</h4>
                            <p>Cybersafe Legal helped Sarah freeze her accounts, file police reports, and work with the bank to recover a portion of her funds. We also helped her implement stronger security measures.</p>
                        </div>
                    </div>
                </div>
                <div class="case-outcome">
                    <h3>Case Outcome</h3>
                    <ul>
                        <li><i class="fas fa-check-circle"></i> 65% of stolen funds recovered</li>
                        <li><i class="fas fa-check-circle"></i> Fraudulent credit cards closed</li>
                        <li><i class="fas fa-check-circle"></i> Credit monitoring established</li>
                        <li><i class="fas fa-check-circle"></i> Scammer's operation identified and reported</li>
                    </ul>
                </div>
                <div class="case-lessons">
                    <h3>Key Lessons</h3>
                    <div class="lesson-cards">
                        <div class="lesson-card">
                            <i class="fas fa-link"></i>
                            <p>Always check the URL before entering login credentials</p>
                        </div>
                        <div class="lesson-card">
                            <i class="fas fa-envelope"></i>
                            <p>Banks will never ask for sensitive information via email</p>
                        </div>
                        <div class="lesson-card">
                            <i class="fas fa-lock"></i>
                            <p>Use two-factor authentication for all financial accounts</p>
                        </div>
                    </div>
                </div>
            `,
            image: "assets/comic1-full.svg"
        },
        2: {
            title: "The Online Romance Scam",
            content: `
                <h2>The Online Romance Scam</h2>
                <div class="case-timeline">
                    <!-- Timeline content would go here -->
                </div>
            `,
            image: "assets/comic2-full.svg"
        },
        3: {
            title: "The Fake Tech Support Scam",
            content: `
                <h2>The Fake Tech Support Scam</h2>
                <div class="case-timeline">
                    <!-- Timeline content would go here -->
                </div>
            `,
            image: "assets/comic3-full.svg"
        }
    };

    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const caseId = this.getAttribute('data-case');
            const caseData = caseStudies[caseId];
            
            modalBody.innerHTML = `
                <div class="modal-comic">
                    <img src="${caseData.image}" alt="${caseData.title}">
                </div>
                <div class="modal-text">
                    ${caseData.content}
                </div>
            `;
            
            caseStudyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', function() {
        caseStudyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    caseStudyModal.addEventListener('click', function(e) {
        if (e.target === caseStudyModal) {
            caseStudyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Resource tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-tab') === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[index].classList.add('active');
    }

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .resource-card, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Tooltip hover effects for comic panels
    const panelTooltips = document.querySelectorAll('.panel-tooltip');
    panelTooltips.forEach(tooltip => {
        tooltip.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Emergency button pulse animation
    const emergencyBtns = document.querySelectorAll('.emergency-btn, .chat-btn, .case-btn');
    emergencyBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                    
                    // Show success message
                    alert('Thank you for your message! We will get back to you soon.');
                }, 2000);
            }, 1500);
        });
    }
});