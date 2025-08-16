      let isLoading = true;
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');
        const progressBar = document.getElementById('progressBar');
        const navbar = document.getElementById('navbar');
        const loading = document.getElementById('loading');
        const mascaraFormulario = document.getElementById('mascaraFormulario');
        const formulario = document.getElementById('formulario');

        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                loading.classList.add('hidden');
                isLoading = false;
                
                // Animar elementos na entrada
                setTimeout(() => {
                    document.querySelectorAll('.fade-in').forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, index * 200);
                    });
                }, 500);
            }, 1500);
        });

        // Cursor personalizado
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 768 && !isLoading) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursor.style.opacity = '1';

                setTimeout(() => {
                    cursorDot.style.left = e.clientX + 'px';
                    cursorDot.style.top = e.clientY + 'px';
                    cursorDot.style.opacity = '1';
                }, 100);
            }
        });

        // Progress Bar
        window.addEventListener('scroll', () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            progressBar.style.transform = `scaleX(${scroll})`;

            // Navbar scroll effect
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active menu link
        const updateActiveMenu = () => {
            const sections = document.querySelectorAll('section[id], main[id]');
            const menuLinks = document.querySelectorAll('.menu-link');
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveMenu);

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Modal functions
        function mostrarFormulario() {
            mascaraFormulario.classList.add('ativo');
            formulario.classList.add('ativo');
            document.body.style.overflow = 'hidden';
        }

        function esconderFormulario() {
            mascaraFormulario.classList.remove('ativo');
            formulario.classList.remove('ativo');
            document.body.style.overflow = 'auto';
        }

        // Form submission
        function enviarMensagem(event) {
            event.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            const telefone = '5537991830685';

            const texto = `Olá! Me chamo ${nome}. ${mensagem}${email ? ` Meu email: ${email}` : ''}`;
            const msgFormatada = encodeURIComponent(texto);
            const url = `https://wa.me/${telefone}?text=${msgFormatada}`;
            
            // Animação do botão
            const botao = event.target.querySelector('.botao-form');
            const textoOriginal = botao.innerHTML;
            
            botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botao.disabled = true;
            
            setTimeout(() => {
                window.open(url, '_blank');
                
                botao.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                botao.style.background = '#10b981';
                
                setTimeout(() => {
                    botao.innerHTML = textoOriginal;
                    botao.disabled = false;
                    botao.style.background = '';
                    event.target.reset();
                    esconderFormulario();
                }, 2000);
            }, 1000);
        }

        // Intersection Observer para animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        });

        // Stats counter animation
        const animateStats = () => {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = stat.textContent;
                const isNumber = !isNaN(target.replace(/[^0-9]/g, ''));
                
                if (isNumber) {
                    const finalNumber = parseInt(target.replace(/[^0-9]/g, ''));
                    const duration = 2000;
                    const increment = finalNumber / (duration / 16);
                    let current = 0;
                    
                    const updateNumber = () => {
                        current += increment;
                        if (current >= finalNumber) {
                            stat.textContent = target;
                        } else {
                            const suffix = target.replace(/[0-9]/g, '');
                            stat.textContent = Math.floor(current) + suffix;
                            requestAnimationFrame(updateNumber);
                        }
                    };
                    
                    updateNumber();
                }
            });
        };

        // Observer para stats
        const statsSection = document.querySelector('.sobre-stats');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animateStats();
                    statsObserver.disconnect();
                }
            });
            
            statsObserver.observe(statsSection);
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // ESC para fechar modal
            if (e.key === 'Escape') {
                esconderFormulario();
            }
            
            // Ctrl/Cmd + K para abrir contato
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                mostrarFormulario();
            }
        });

        // Easter eggs
        let clickCount = 0;
        document.querySelector('.foto-perfil').addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === 5) {
                // Mudar cores do tema
                const colors = ['#4f46e5', '#7c3aed', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                document.documentElement.style.setProperty('--primaria', randomColor);
                
                // Confetes
                createConfetti();
                clickCount = 0;
            }
        });

        function createConfetti() {
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        width: 8px;
                        height: 8px;
                        background: hsl(${Math.random() * 360}, 70%, 60%);
                        border-radius: 50%;
                        left: ${Math.random() * 100}vw;
                        top: -10px;
                        z-index: 9999;
                        pointer-events: none;
                    `;
                    
                    document.body.appendChild(confetti);
                    
                    confetti.animate([
                        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                        { transform: `translateY(100vh) rotate(720deg)`, opacity: 0 }
                    ], {
                        duration: Math.random() * 2000 + 1000,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }).addEventListener('finish', () => confetti.remove());
                }, i * 10);
            }
        }

        // Performance optimization
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        };

        // Apply throttle to scroll events
        window.addEventListener('scroll', throttle(() => {
            updateActiveMenu();
        }, 100));

        console.log('🚀 Portfólio carregado com sucesso!');
        console.log('💡 Dicas: Pressione Ctrl+K para abrir contato rápido, clique 5x na foto para surpresa!');