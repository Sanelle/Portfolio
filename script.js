  // Preloader Animation
        document.addEventListener('DOMContentLoaded', function() {
            const loaderProgress = document.getElementById('loader-progress');
            const loaderFill = document.getElementById('loader-fill');
            const preloader = document.querySelector('.preloader');
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 5) + 1;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(() => {
                        preloader.classList.add('fade-out');
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 500);
                    }, 500);
                }
                loaderProgress.textContent = progress + '%';
                loaderFill.style.width = progress + '%';
            }, 50);
            
            // Initialize particles.js
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#6c63ff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#6c63ff",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
            
            // Header Scroll Effect
            const header = document.querySelector('.header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Mobile Menu Toggle
            const hamburger = document.querySelector('.hamburger');
            const navList = document.querySelector('.nav-list');
            
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navList.classList.toggle('active');
            });
            
            // Smooth Scrolling for Navigation Links
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
                        
                        // Close mobile menu if open
                        hamburger.classList.remove('active');
                        navList.classList.remove('active');
                    }
                });
            });
            
            // Active Link Highlighting
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            window.addEventListener('scroll', function() {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (pageYOffset >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
            
            // Counter Animation
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            function animateCounters() {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-count');
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(animateCounters, 1);
                    } else {
                        counter.innerText = target;
                    }
                });
            }
            
            // Skill Bar Animation
            const skillBars = document.querySelectorAll('.skill-progress');
            
            function animateSkillBars() {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }
            
            // Intersection Observer for Animations
            const observerOptions = {
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.classList.contains('stat-number')) {
                            animateCounters();
                        }
                        if (entry.target.classList.contains('skill-progress')) {
                            animateSkillBars();
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            counters.forEach(counter => {
                observer.observe(counter);
            });
            
            skillBars.forEach(bar => {
                observer.observe(bar);
            });
            
            // Back to Top Button
            const backToTop = document.querySelector('.back-to-top');
            
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            });
            
            // Testimonial Slider
            const testimonialSlides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.dot');
            const prevBtn = document.querySelector('.slider-prev');
            const nextBtn = document.querySelector('.slider-next');
            let currentSlide = 0;
            
            function showSlide(n) {
                testimonialSlides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
                
                testimonialSlides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            function nextSlide() {
                showSlide(currentSlide + 1);
            }
            
            function prevSlide() {
                showSlide(currentSlide - 1);
            }
            
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Auto slide change
            setInterval(nextSlide, 5000);
            
            // Portfolio Filter
            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // Modal Handling
            const modal = document.getElementById('service-modal');
            const confirmationModal = document.getElementById('confirmation-modal');
            const modalBtns = document.querySelectorAll('[data-service-trigger], #main-cta, #hero-cta, #services-cta, #portfolio-cta');
            const closeModal = document.querySelector('.modal-close');
            const closeConfirmation = document.getElementById('confirmation-close');
            const modalOverlay = document.querySelector('.modal-overlay');
            const selectedServiceInput = document.getElementById('selected-service');
            const serviceNameSelect = document.getElementById('service-name');
            
            modalBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const service = this.getAttribute('data-service-trigger');
                    if (service) {
                        selectedServiceInput.value = service;
                        
                        // Set the dropdown to match the selected service
                        const options = serviceNameSelect.options;
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].text.toLowerCase().includes(service.replace('-', ' '))) {
                                serviceNameSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                    
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });
            });
            
            closeModal.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            closeConfirmation.addEventListener('click', function() {
                confirmationModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            modalOverlay.addEventListener('click', function() {
                modal.classList.remove('active');
                confirmationModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
            
            // Form Submission
            const serviceForm = document.getElementById('service-form');
            
            serviceForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show the confirmation modal
                
                modal.classList.remove('active');
                confirmationModal.classList.add('active');
                
                // Reset form
                this.reset();
            });
            
            // Main Contact Form
            const mainContactForm = document.getElementById('main-contact-form');
            
            mainContactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show an alert
                
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
            
            // Newsletter Form
            const newsletterForm = document.querySelector('.newsletter-form');
            
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show an alert
                
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            });
            
            // Game-like hover effects on service cards
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceCards.forEach(card => {
                card.addEventListener('mousemove', function(e) {
                    const x = e.clientX - this.getBoundingClientRect().left;
                    const y = e.clientY - this.getBoundingClientRect().top;
                    
                    const centerX = this.offsetWidth / 2;
                    const centerY = this.offsetHeight / 2;
                    
                    const angleX = (y - centerY) / 10;
                    const angleY = (centerX - x) / 10;
                    
                    this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
                });
            });
        });
