
/* ==========================================================================

   VIP Executive Interactive & Dynamic Motion - JavaScript (script.js)

   ========================================================================== */



document.addEventListener("DOMContentLoaded", () => {



    // ----------------------------------------------------------------------

    // 1. Custom VIP Glow Cursor (هالة الماوس الضوئية التفاعلية)

    // ----------------------------------------------------------------------

    const createCustomCursor = () => {

        const cursorGlow = document.createElement("div");

        cursorGlow.classList.add("vip-cursor-glow");

        document.body.appendChild(cursorGlow);



        Object.assign(cursorGlow.style, {

            position: "fixed",

            width: "120px",

            height: "120px",

            background: "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)",

            borderRadius: "50%",

            pointerEvents: "none",

            transform: "translate(-50%, -50%)",

            transition: "opacity 0.3s ease",

            zIndex: "9999",

            mixBlendMode: "screen",

            opacity: "0"

        });



        let mouseX = 0, mouseY = 0;

        let cursorX = 0, cursorY = 0;



        window.addEventListener("mousemove", (e) => {

            mouseX = e.clientX;

            mouseY = e.clientY;

            cursorGlow.style.opacity = "1";

        });



        // حركة سلسة باستخدام requestAnimationFrame

        const renderCursor = () => {

            cursorX += (mouseX - cursorX) * 0.2;

            cursorY += (mouseY - cursorY) * 0.2;

            cursorGlow.style.left = `${cursorX}px`;

            cursorGlow.style.top = `${cursorY}px`;

            requestAnimationFrame(renderCursor);

        };

        renderCursor();



        document.addEventListener("mouseleave", () => {

            cursorGlow.style.opacity = "0";

        });

    };



    createCustomCursor();





    // ----------------------------------------------------------------------

    // 2. Mobile Menu Toggle (القائمة الجانبية للهواتف)

    // ----------------------------------------------------------------------

    const menuToggle = document.querySelector(".menu-toggle, .mobile-nav-toggle");

    const navMenu = document.querySelector(".nav-menu, nav");



    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            navMenu.classList.toggle("active");

        });



        // إغلاق القائمة عند النقر على أي رابط

        document.querySelectorAll(".nav-link").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");

            });

        });

    }





    // ----------------------------------------------------------------------

    // 3. Smart Glass Header & Active Link Highlight (الهيدر الذكي لتحديد القسم)

    // ----------------------------------------------------------------------

    const header = document.getElementById("main-header");

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-link");



    const handleScroll = () => {

        // Blur Header Effect

        if (header) {

            if (window.scrollY > 50) {

                header.style.background = "rgba(5, 8, 17, 0.9)";

                header.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 229, 255, 0.15)";

            } else {

                header.style.background = "rgba(5, 8, 17, 0.75)";

                header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";

            }

        }



        // Active Navigation Highlight

        let currentSectionId = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 150;

            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {

                currentSectionId = section.getAttribute("id");

            }

        });



        navLinks.forEach((link) => {

            link.classList.remove("active-nav");

            if (link.getAttribute("href") === `#${currentSectionId}`) {

                link.classList.add("active-nav");

                link.style.color = "var(--accent-cyan, #00e5ff)";

                link.style.textShadow = "0 0 12px rgba(0, 229, 255, 0.8)";

            } else {

                link.style.color = "var(--text-secondary, #a0aec0)";

                link.style.textShadow = "none";

            }

        });

    };



    window.addEventListener("scroll", handleScroll);





    // ----------------------------------------------------------------------

    // 4. Smooth Scroll for Anchor Links (التمرير السلس للروابط)

    // ----------------------------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                e.preventDefault();

                targetElement.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });





    // ----------------------------------------------------------------------

    // 5. 3D Tilt & Radial Spotlight Parallax Effect (تأثير الإمالة والضوء 3D)

    // ----------------------------------------------------------------------

    const tiltCards = document.querySelectorAll(".service-card, .portfolio-item, .contact-card-wrapper, .stat-card");



    tiltCards.forEach((card) => {

        card.style.transition = "transform 0.2s ease-out, box-shadow 0.3s ease";



        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

           

            const centerX = rect.width / 2;

            const centerY = rect.height / 2;



            const rotateX = ((y - centerY) / centerY) * -7;

            const rotateY = ((x - centerX) / centerX) * 7;



            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

           

            // إضافة ضوء موجه داخل الكارت Dynamic Radial Gradient Hover

            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 229, 255, 0.08), rgba(15, 23, 42, 0.8))`;

        });



        card.addEventListener("mouseleave", () => {

            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";

            card.style.background = ""; // إعادة الخلفية الأصلية المسجلة في CSS

        });

    });





    // ----------------------------------------------------------------------

    // 6. Portfolio Smooth Filtering System (نظام فلترة معارض الأعمال السلس)

    // ----------------------------------------------------------------------

    const filterButtons = document.querySelectorAll(".filter-btn");

    const portfolioItems = document.querySelectorAll(".portfolio-item");



    if (filterButtons.length > 0 && portfolioItems.length > 0) {

        filterButtons.forEach((btn) => {

            btn.addEventListener("click", () => {

                filterButtons.forEach((b) => b.classList.remove("active"));

                btn.classList.add("active");



                const filterValue = btn.getAttribute("data-filter");



                portfolioItems.forEach((item) => {

                    const category = item.getAttribute("data-category");



                    if (filterValue === "all" || category === filterValue) {

                        item.style.display = "block";

                        setTimeout(() => {

                            item.style.opacity = "1";

                            item.style.transform = "scale(1)";

                        }, 50);

                    } else {

                        item.style.opacity = "0";

                        item.style.transform = "scale(0.85)";

                        setTimeout(() => {

                            item.style.display = "none";

                        }, 350);

                    }

                });

            });

        });



        portfolioItems.forEach((item) => {

            item.style.transition = "opacity 0.4s ease, transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease";

        });

    }





    // ----------------------------------------------------------------------

    // 7. Animated Number Counter (العداد الرقمي التفاعلي)

    // ----------------------------------------------------------------------

    const statNumbers = document.querySelectorAll(".stat-number");

    let hasAnimatedStats = false;



    const animateStats = () => {

        const heroSection = document.querySelector(".hero-section, .stats-section");

        if (!heroSection || statNumbers.length === 0) return;



        const sectionPos = heroSection.getBoundingClientRect().top;

        const screenPos = window.innerHeight;



        if (sectionPos < screenPos && !hasAnimatedStats) {

            hasAnimatedStats = true;



            statNumbers.forEach((stat) => {

                const targetText = stat.innerText.trim();

                const targetNumber = parseInt(targetText.replace(/\D/g, ""), 10);

                if (isNaN(targetNumber)) return;



                const prefix = targetText.startsWith("+") ? "+" : "";

                const suffix = targetText.endsWith("%") ? "%" : targetText.endsWith("+") ? "+" : "";



                let current = 0;

                const increment = Math.max(1, Math.ceil(targetNumber / 40));

                const duration = 1500;

                const stepTime = Math.abs(Math.floor(duration / (targetNumber / increment)));



                const timer = setInterval(() => {

                    current += increment;

                    if (current >= targetNumber) {

                        stat.innerText = `${prefix}${targetNumber}${suffix}`;

                        clearInterval(timer);

                    } else {

                        stat.innerText = `${prefix}${current}${suffix}`;

                    }

                }, stepTime);

            });

        }

    };



    window.addEventListener("scroll", animateStats);

    animateStats();





    // ----------------------------------------------------------------------

    // 8. Scroll Reveal Observer (أنيميشن الظهور التدريجي)

    // ----------------------------------------------------------------------

    const revealElements = document.querySelectorAll(".service-card, .portfolio-item, .timeline-item, .section-header, .about-content, .contact-card-wrapper");



    if (revealElements.length > 0) {

        revealElements.forEach((el) => {

            el.style.opacity = "0";

            el.style.transform = "translateY(35px)";

            el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";

        });



        const revealOnScroll = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(entry.target);

                    }

                });

            },

            { threshold: 0.15 }

        );



        revealElements.forEach((el) => revealOnScroll.observe(el));

    }





    // ----------------------------------------------------------------------

    // 9. Back to Top Button (زر العودة للأعلى)

    // ----------------------------------------------------------------------

    const createBackToTop = () => {

        const btn = document.createElement("button");

        btn.innerHTML = "&#8593;";

        btn.id = "back-to-top";

        document.body.appendChild(btn);



        Object.assign(btn.style, {

            position: "fixed",

            bottom: "30px",

            right: "30px",

            width: "45px",

            height: "45px",

            borderRadius: "50%",

            background: "linear-gradient(135deg, #00e5ff 0%, #0077ff 100%)",

            color: "#050811",

            border: "none",

            fontSize: "20px",

            fontWeight: "bold",

            cursor: "pointer",

            boxShadow: "0 5px 15px rgba(0, 229, 255, 0.4)",

            opacity: "0",

            visibility: "hidden",

            transition: "opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease",

            zIndex: "999"

        });



        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                btn.style.opacity = "1";

                btn.style.visibility = "visible";

            } else {

                btn.style.opacity = "0";

                btn.style.visibility = "hidden";

            }

        });



        btn.addEventListener("click", () => {

            window.scrollTo({ top: 0, behavior: "smooth" });

        });

    };



    createBackToTop();





    // ----------------------------------------------------------------------

    // 10. Interactive Form Submission Alert (نموذج التواصل)

    // ----------------------------------------------------------------------

    const contactForm = document.getElementById("main-contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {

            e.preventDefault();



            const submitBtn = contactForm.querySelector(".btn-submit-form, button[type='submit']");

            if (!submitBtn) return;



            const originalText = submitBtn.innerText;



            submitBtn.innerText = "جاري إرسال الطلب...";

            submitBtn.style.opacity = "0.75";

            submitBtn.disabled = true;



            setTimeout(() => {

                submitBtn.innerText = "✓ تم الإرسال بنجاح!";

                submitBtn.style.background = "linear-gradient(135deg, #10B981 0%, #059669 100%)";

                submitBtn.style.color = "#FFFFFF";



                alert("شكرًا لتواصلك! تم استلام رسالتك وسيتم الرد عليك في أقرب وقت.");



                contactForm.reset();



                setTimeout(() => {

                    submitBtn.innerText = originalText;

                    submitBtn.style.background = "var(--accent-gradient, linear-gradient(135deg, #00e5ff, #0077ff))";

                    submitBtn.style.color = "#050811";

                    submitBtn.style.opacity = "1";

                    submitBtn.disabled = false;

                }, 3000);

            }, 1500);

        });

    }
    