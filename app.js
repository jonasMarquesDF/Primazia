document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. EFEITO DE ROLAGEM NO CABEÇALHO (HEADER SCROLL)
    // ==========================================================================
    const header = document.querySelector('.header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Checagem inicial ao carregar

    // ==========================================================================
    // 2. MENU MOBILE INTERATIVO
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    const openMenu = () => {
        mobileMenuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; // Impede rolagem ao fundo
    };
    
    const closeMenu = () => {
        mobileMenuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    };
    
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ==========================================================================
    // 3. SINCRONIZAÇÃO DOS LINKS ATIVOS AO ROLAR (INTERSECTION OBSERVER)
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Aciona quando a seção está no meio da tela
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));

    // ==========================================================================
    // 4. FILTRAGEM DA GALERIA DO PORTFÓLIO
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona no clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });

    // ==========================================================================
    // 5. SISTEMA DE LIGHTBOX (VISUALIZAÇÃO DE IMAGENS EM TELA CHEIA)
    // ==========================================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h4').textContent;
            const desc = item.querySelector('p').textContent;
            
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = `<strong>${title}</strong> - ${desc}`;
            document.body.style.overflow = 'hidden';
        });
    });
    
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    };
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    // ==========================================================================
    // 6. MENU FLUTUANTE DUPLO DO WHATSAPP
    // ==========================================================================
    const waTrigger = document.getElementById('waTrigger');
    const waMenu = document.getElementById('waMenu');
    
    // Abre / fecha o menu flutuante ao clicar no gatilho
    waTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        waMenu.classList.toggle('open');
    });
    
    // Fecha o menu de WhatsApp se clicar fora dele
    document.addEventListener('click', (e) => {
        if (!waMenu.contains(e.target) && e.target !== waTrigger && !waTrigger.contains(e.target)) {
            waMenu.classList.remove('open');
        }
    });

    // ==========================================================================
    // 7. ENVIO DO FORMULÁRIO DE CONTATO DIRECIONADO PARA O WHATSAPP
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const ambientSelect = document.getElementById('ambient');
        const ambientText = ambientSelect.options[ambientSelect.selectedIndex].text;
        const message = document.getElementById('message').value;
        
        // Formata a mensagem para codificação de URL do WhatsApp
        const text = `Olá, Primazia Marcenaria! Gostaria de fazer um orçamento.%0A%0A` +
                     `*Nome:* ${encodeURIComponent(name)}%0A` +
                     `*Telefone:* ${encodeURIComponent(phone)}%0A` +
                     `*Ambiente de Interesse:* ${encodeURIComponent(ambientText)}%0A` +
                     `*Mensagem:* ${encodeURIComponent(message || 'Sem observações adicionais.')}`;
        
        // Envia para o número de vendas/orçamentos principal
        const waUrl = `https://wa.me/5561992337550?text=${text}`;
        
        // Abre em uma nova aba
        window.open(waUrl, '_blank');
        
        // Limpa o formulário
        contactForm.reset();
    });
});
