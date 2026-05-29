const translations = {
    pt: {
        logo: 'Vacina HPV',
        nav_home: 'Início',
        nav_about: 'O que é HPV',
        nav_why: 'Por que vacinar',
        nav_myths: 'Mitos e Verdades',
        nav_how: 'Como tomar',
        nav_faq: 'FAQ',
        hero_title: 'Essa vacina previne câncer. Sério.',
        hero_subtitle: 'E você pode se vacinar de graça, agora.',
        hero_text: 'O HPV é um vírus tão comum que quase todo mundo pega em algum momento da vida. Mas existe uma vacina que impede isso — e ela é oferecida pelo SUS, sem custo nenhum.',
        hero_cta: 'Quero saber mais',
        about_title: 'HPV: o que é isso?',
        about_intro: 'HPV significa Papilomavírus Humano. É um vírus transmitido pelo contato íntimo com a pele — e é incrivelmente comum.',
        risk_1: 'Câncer de colo do útero',
        risk_2: 'Câncer de garganta',
        risk_3: 'Câncer de ânus',
        why_title: 'Por que se vacinar agora?',
        myths_title: 'Mitos vs. Verdades',
        myth_1_front: 'A vacina dói muito e os efeitos colaterais são sérios.',
        myth_1_back: 'Os efeitos colaterais são leves e passageiros. Passam em 1-2 dias.',
        cta_heading: 'Pronto para se vacinar?',
        cta_button: 'Encontrar posto de saúde',
        footer_last_review: 'Última revisão: Maio 2026'
    },
    en: {
        logo: 'HPV Vaccine',
        nav_home: 'Home',
        nav_about: 'What is HPV',
        nav_why: 'Why Vaccinate',
        nav_myths: 'Myths & Facts',
        nav_how: 'How to Get It',
        nav_faq: 'FAQ',
        hero_title: 'This vaccine prevents cancer. Seriously.',
        hero_subtitle: 'And you can get vaccinated for free, right now.',
        hero_text: 'HPV is such a common virus that almost everyone gets it at some point in their life. But there is a vaccine that prevents it — and it is offered by the Brazilian public health system (SUS), completely free.',
        hero_cta: 'Learn more',
        about_title: 'HPV: What is it?',
        about_intro: 'HPV stands for Human Papillomavirus. It is a virus transmitted through intimate skin-to-skin contact — and it is incredibly common.',
        risk_1: 'Cervical cancer',
        risk_2: 'Throat cancer',
        risk_3: 'Anal cancer',
        why_title: 'Why vaccinate now?',
        myths_title: 'Myths vs. Facts',
        myth_1_front: 'The vaccine hurts a lot and side effects are serious.',
        myth_1_back: 'Side effects are mild and temporary. They go away in 1-2 days.',
        cta_heading: 'Ready to get vaccinated?',
        cta_button: 'Find a health center',
        footer_last_review: 'Last review: May 2026'
    }
};

let currentLanguage = 'pt';

function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('language', lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    translatePage();
}

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = translations[currentLanguage][key];
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'BUTTON') {
                el.value = text;
                el.textContent = text;
            } else {
                el.textContent = text;
            }
        }
    });
}

function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'pt';
    switchLanguage(savedLanguage);
}

function flipCard(element) {
    const card = element.closest('.myth-card');
    card.classList.toggle('flipped');
}

function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('[data-stat]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
                const target = parseInt(entry.target.getAttribute('data-stat'));
                animateCounter(entry.target, 0, target, 1500);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(el => observer.observe(el));
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
        if (current === end && end > 50) {
            element.textContent = end + '%';
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    setupNavigation();
    animateStats();
});