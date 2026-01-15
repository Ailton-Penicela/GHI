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

// ==========================================
// Theme Toggle Logic
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

// Check Local Storage
if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            if (icon) icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ==========================================
// Language Switcher Logic
// ==========================================
const translations = {
    pt: {
        nav: {
            home: "Início",
            about: "Sobre Nós",
            values: "Valores",
            services: "O Que Fazemos",
            stories: "Histórias",
            help: "Ajude-nos"
        },
        hero: {
            title: "Reavivando a Esperança para Moçambique",
            subtitle: "Capacitando comunidades marginalizadas em Moçambique através de assistência humanitária, advocacia e desenvolvimento sustentável.",
            donate: "Doar Agora",
            learn_more: "Saiba Mais"
        },
        about: {
            title: "Sobre Nós",
            subtitle: "A Grace Hope Initiative (GHI) é uma organização sem fins lucrativos sediada em África, criada para reacender a esperança nas comunidades carenciadas e empobrecidas.",
            who_we_are: "Quem Somos",
            p1: "Trabalhamos para criar e proporcionar oportunidades onde jovens africanos marginalizados e mulheres vulneráveis possam ousar ACREDITAR NA ESPERANÇA e tornar os seus SONHOS REALIDADE.",
            p2: "Através de parcerias com organizações internacionais, comunidades locais, instituições governamentais e filantropos, buscamos garantir que ninguém fique para trás na construção de um futuro mais justo e próspero.",
            mission: "Nossa Missão",
            mission_desc: "Capacitar e valorizar todas as crianças, jovens, mulheres e comunidades carenciadas em Moçambique que são vítimas de pobreza, desigualdade, discriminação e abuso, garantindo o seu acesso a uma vida digna, direitos humanos básicos e oportunidades para prosperar.",
            vision: "Nossa Visão",
            vision_desc: "Trazer ESPERANÇA às pessoas mais marginalizadas, particularmente crianças, jovens raparigas e mulheres em Moçambique, proporcionando assistência significativa e apoio para criar impacto sustentável nas suas comunidades."
        },
        values: {
            title: "Nossos Valores",
            subtitle: "Estes são os pilares que guiam todas as nossas ações e decisões",
            inspiration: "Inspiração",
            inspiration_desc: "Inspiramos confiança nos marginalizados e esperança nos menos privilegiados para acreditar num futuro brilhante.",
            commitment: "Compromisso",
            commitment_desc: "Colocamos a nossa missão no centro dos projetos e atividades da nossa organização.",
            loyalty: "Lealdade",
            loyalty_desc: "A qualidade é o motor do nosso desempenho. Buscamos a excelência em tudo o que fazemos.",
            excellence: "Excelência",
            excellence_desc: "Mantemos os mais altos padrões ao servir comunidades vulneráveis."
        },
        services: {
            title: "O Que Fazemos",
            subtitle: "Trabalhamos com parceiros em seis áreas essenciais para o progresso e desenvolvimento",
            intro: "Trabalhamos em parceria com comunidades, governos e organizações para criar impacto real e duradouro",
            service1_title: "Ajuda Humanitária e Socorro",
            service1_desc: "Prestamos auxílio a pessoas afetadas por desastres naturais, fome, deslocação forçada e outras crises.",
            service2_title: "Advocacia pelos Sem Voz",
            service2_desc: "Aumentamos a consciencialização, educamos e informamos o público sobre questões sociais pertinentes.",
            service3_title: "Desenvolvimento Sustentável",
            service3_desc: "Investigamos, desenvolvemos e implementamos projetos que abordam os ODS das Nações Unidas.",
            areas_title: "Nossas Áreas de Atuação",
            areas_desc: "Trabalhamos em seis áreas essenciais para o progresso e desenvolvimento das comunidades",
            education: "Educação",
            education_desc: "Garantimos acesso à educação de qualidade para crianças em áreas remotas, fornecendo material escolar e apoio pedagógico.",
            empowerment: "Empoderamento",
            empowerment_desc: "Capacitamos jovens e mulheres com habilidades profissionais e empreendedorismo para alcançar independência financeira.",
            food_security: "Segurança Alimentar",
            food_security_desc: "Implementamos projetos de agricultura sustentável e distribuição de alimentos para combater a fome e a desnutrição.",
            healthcare: "Saúde",
            healthcare_desc: "Promovemos o acesso a cuidados de saúde básicos, campanhas de vacinação e educação sobre higiene e prevenção de doenças.",
            gender_equality: "Igualdade de Gênero",
            gender_equality_desc: "Lutamos contra a violência baseada no gênero e promovemos a igualdade de oportunidades para homens e mulheres.",
            wash: "WASH",
            wash_desc: "Trabalhamos para garantir o acesso a água potável, saneamento básico e práticas de higiene adequadas."
        },
        gallery: {
            title: "Nossas Atividades em Ação",
            subtitle: "Veja o impacto real que estamos a criar nas comunidades",
            humanitarian: "Ajuda Humanitária",
            volunteer: "Voluntariado",
            education: "Educação",
            empowerment: "Empoderamento",
            health: "Saúde",
            emergency: "Emergências",
            children: "Crianças"
        },
        testimonials: {
            title: "Testemunhos de Impacto",
            subtitle: "Ouça as histórias de quem foi transformado pela Grace Hope Initiative",
            t1: "\"A Grace Hope Initiative mudou a vida da minha família. Quando perdemos tudo na enchente, eles estavam lá para nos ajudar. Hoje, meus filhos estão na escola graças ao apoio deles.\"",
            mother: "Mãe de 3 filhos, Maputo",
            t2: "\"Participei no programa de empoderamento de mulheres e aprendi competências que me permitiram iniciar o meu próprio negócio. Agora sou independente e posso sustentar a minha família.\"",
            entrepreneur: "Empreendedora, Inhambane",
            t3: "\"Como voluntário, vi de perto o trabalho extraordinário que a GHI faz. A dedicação da equipa é inspiradora. Estou orgulhoso de fazer parte desta missão.\"",
            volunteer: "Voluntário, Sofala"
        },
        stories: {
            title: "Histórias de Sucesso",
            subtitle: "Conheça as transformações reais que a Grace Hope Initiative tornou possível",
            result_label: "Resultado:",
            story1: {
                title: "De Menino de Rua a Estudante",
                desc: "Quando conhecemos o João, ele tinha apenas 8 anos e vivia nas ruas de Maputo. Através do nosso programa de educação, resgatámo-lo e matriculámo-lo na escola.",
                result: "Hoje, o João está na 5ª classe com notas excelentes e sonha ser professor."
            },
            story2: {
                title: "Do Desemprego à Independência",
                desc: "A Fátima era mãe solteira sem qualificações. Participou no nosso treino de competências e aprendeu corte e costura e gestão de negócios.",
                result: "A Fátima é agora proprietária do seu atelier de costura e emprega 5 pessoas."
            },
            story3: {
                title: "Nutrindo o Futuro",
                desc: "Centenas de crianças em bairros periféricos sofriam de malnutrição. Implementámos um programa diário de alimentação escolar.",
                result: "Melhoria de 90% nos índices de saúde e frequência escolar."
            },
            story4: {
                title: "Água Limpa, Vida Nova",
                desc: "A comunidade de Chokwe caminhava km por água. Construímos poços acessíveis para todos.",
                result: "Doenças reduzidas drasticamente e mais tempo para a escola."
            },
            story5: {
                title: "Saúde ao Alcance de Todos",
                desc: "Clínicas móveis levam cuidados básicos a quem mais precisa em áreas remotas.",
                result: "Milhares de consultas realizadas e vidas salvas."
            },
            today: "Hoje:"
        },
        projects: {
            title: "Nossos Projetos",
            subtitle: "Conheça algumas das iniciativas que estão a transformar vidas em Moçambique e não só",
            school_title: "Reconstrução de Escola",
            school_desc: "Reabilitação completa de uma escola primária em Sofala, beneficiando 500 alunos.",
            water_title: "Água para Todos",
            water_desc: "Instalação de bombas de água potável em 3 comunidades rurais de Gaza.",
            christmas_title: "Festa de Natal",
            christmas_desc: "Programa de alcance comunitário em Maputo que doou alimentos e presentes a 50 crianças carenciadas.",
            dec_2021: "Dezembro 2021",
            food_title: "Alimentar as Crianças",
            food_desc: "Apoiámos 12 famílias vulneráveis durante 10 meses na pandemia de COVID-19 com necessidades básicas.",
            covid_tag: "Pandemia COVID-19",
            home_school_title: "Iniciativa Escola em Casa",
            home_school_desc: "Proporcionámos apoio educacional a mais de 25 crianças sem recursos para ensino à distância.",
            pandemic_edu_tag: "Educação Pandémica",
            danilo_title: "Salvar Danilo Santos",
            danilo_desc: "Mobilizámos fundos de doadores para apoiar a família Santos e acompanhar o tratamento médico.",
            medical_action_tag: "Ação Médica",
            community_title: "Companheiros da Comunidade",
            community_desc: "Campanha colaborativa para erradicar a situação de sem-abrigo e a fome em Moçambique.",
            since_2023: "Desde 2023"
        },
        help: {
            title: "Contactos e Ajuda",
            phone: "Telefone / WhatsApp",
            email: "Email Geral",
            donation_contact: "Contacto para Doações",
            message_title: "Envie-nos uma Mensagem",
            message_subtitle: "Juntos, podemos reacender a esperança e transformar vidas"
        },
        sdgs: {
            title: "Objetivos de Desenvolvimento Sustentável",
            subtitle: "A Grace Hope Initiative está comprometida em contribuir para a realização dos seguintes ODS da ONU:",
            poverty: "Erradicação da Pobreza",
            hunger: "Fome Zero",
            health: "Boa Saúde",
            education: "Educação de Qualidade",
            gender: "Igualdade de Gênero",
            water: "Água e Saneamento",
            economic: "Crescimento Económico",
            inequality: "Redução das Desigualdades"
        },
        forms: {
            volunteer_action: "Seja Voluntário",
            volunteer_desc: "Junte-se à nossa equipa no terreno.",
            donate_action: "Faça uma Doação",
            donate_desc: "Apoie financeiramente os nossos projetos.",
            contact_action: "Fale Connosco",
            contact_desc: "Dúvidas ou parcerias? Envie uma mensagem.",
            volunteer_title: "Ficha de Inscrição de Voluntário",
            contact_title: "Entre em Contacto",
            name_label: "Nome Completo",
            name_placeholder: "Seu nome",
            message_label: "Mensagem",
            message_placeholder: "Como podemos ajudar?",
            motivation_label: "Por que quer ser voluntário?",
            motivation_placeholder: "Conte-nos um pouco sobre si...",
            area_label: "Área de Interesse",
            area_education: "Educação",
            area_health: "Saúde",
            area_events: "Organização de Eventos",
            area_logistics: "Logística",
            area_other: "Outro",
            submit_volunteer: "Enviar Inscrição",
            submit_volunteer: "Enviar Inscrição",
            submit_message: "Enviar Mensagem",
            email_label: "Email",
            phone_label: "Telefone / WhatsApp",
            email_placeholder: "seu@email.com"
        },
        footer: {
            subscribe: "Subscreva a Nossa Newsletter",
            subscribe_desc: "Fique a par das nossas últimas notícias e atualizações.",
            subscribe_btn: "Subscrever",
            email_placeholder: "O seu email",
            quick_links: "Links Rápidos",
            contact_us: "Contacte-nos",
            email_label: "Email:",
            phone_label: "Telefone:",
            address: "Maputo, Moçambique",
            slogan: "Reacendendo a esperança para Moçambique",
            quote: "\"Juntos, podemos reacender a esperança e transformar vidas.\"",
            slogan: "Reacendendo a esperança para Moçambique",
            quote: "\"Juntos, podemos reacender a esperança e transformar vidas.\"",
            rights: "&copy; 2026 Grace Hope Initiative. Todos os direitos reservados.",
            back_to_top: "Voltar ao topo"
        },
        modal: {
            title: "Faça a sua Doação",
            subtitle: "Escolha o método de pagamento preferido para apoiar a nossa causa.",
            mpesa_name: "Nome: Grace Hope Initiative",
            international: "Doações Internacionais",
            proof: "Por favor, envie o comprovativo para"
        }
    },
    en: {
        nav: {
            home: "Home",
            about: "About Us",
            values: "Values",
            services: "What We Do",
            stories: "Stories",
            help: "Get Involved"
        },
        hero: {
            title: "Reviving Hope for Mozambique",
            subtitle: "Empowering marginalized communities in Mozambique through humanitarian assistance, advocacy, and sustainable development.",
            donate: "Donate Now",
            learn_more: "Learn More"
        },
        about: {
            title: "About Us",
            subtitle: "Grace Hope Initiative (GHI) is a non-profit organization based in Africa, created to rekindle hope in needy and impoverished communities.",
            who_we_are: "Who We Are",
            p1: "We work to create and provide opportunities where marginalized African youth and vulnerable women can dare to BELIEVE IN HOPE and make their DREAMS A REALITY.",
            p2: "Through partnerships with international organizations, local communities, government institutions, and philanthropists, we seek to ensure that no one is left behind in building a fairer and more prosperous future.",
            mission: "Our Mission",
            mission_desc: "To empower and value all needy children, youth, women, and communities in Mozambique who are victims of poverty, inequality, discrimination, and abuse, ensuring their access to a dignified life, basic human rights, and opportunities to thrive.",
            vision: "Our Vision",
            vision_desc: "To bring HOPE to the most marginalized people, particularly children, young girls, and women in Mozambique, by providing meaningful assistance and support to create sustainable impact in their communities."
        },
        values: {
            title: "Our Values",
            subtitle: "These are the pillars that guide all our actions and decisions",
            inspiration: "Inspiration",
            inspiration_desc: "We inspire confidence in the marginalized and hope in the underprivileged to believe in a bright future.",
            commitment: "Commitment",
            commitment_desc: "We place our mission at the center of our organization's projects and activities.",
            loyalty: "Loyalty",
            loyalty_desc: "Quality is the engine of our performance. We strive for excellence in everything we do.",
            excellence: "Excellence",
            excellence_desc: "We maintain the highest standards when serving vulnerable communities."
        },
        services: {
            title: "What We Do",
            subtitle: "We work with partners in six essential areas for progress and development",
            intro: "We work in partnership with communities, governments and organizations to create real and lasting impact",
            service1_title: "Humanitarian Aid & Relief",
            service1_desc: "We provide aid to people affected by natural disasters, hunger, displacement, and other crises.",
            service2_title: "Advocacy for the Voiceless",
            service2_desc: "We raise awareness, educate, and inform the public about pertinent social issues.",
            service3_title: "Sustainable Development",
            service3_desc: "We research, develop, and implement projects addressing the UN SDGs.",
            areas_title: "Our Areas of Action",
            areas_desc: "We work in six essential areas for the progress and development of communities",
            education: "Education",
            education_desc: "We ensure access to quality education for children in remote areas by providing school supplies and pedagogical support.",
            empowerment: "Empowerment",
            empowerment_desc: "We empower youth and women with professional skills and entrepreneurship training to achieve financial independence.",
            food_security: "Food Security",
            food_security_desc: "We implement sustainable agriculture projects and food distribution to combat hunger and malnutrition.",
            healthcare: "Healthcare",
            healthcare_desc: "We promote access to basic healthcare, vaccination campaigns, and education on hygiene and disease prevention.",
            gender_equality: "Gender Equality",
            gender_equality_desc: "We fight against gender-based violence and promote equal opportunities for men and women.",
            wash: "WASH",
            wash_desc: "We work to ensure access to clean water, basic sanitation, and proper hygiene practices."
        },
        gallery: {
            title: "Our Activities in Action",
            subtitle: "See the real impact we are creating in communities",
            humanitarian: "Humanitarian Aid",
            volunteer: "Volunteering",
            education: "Education",
            empowerment: "Empowerment",
            health: "Heath",
            emergency: "Emergencies",
            children: "Children"
        },
        testimonials: {
            title: "Impact Testimonials",
            subtitle: "Hear the stories of those transformed by the Grace Hope Initiative",
            t1: "\"Grace Hope Initiative changed my family's life. When we lost everything in the flood, they were there to help us. Today, my children are in school thanks to their support.\"",
            mother: "Mother of 3, Maputo",
            t2: "\"I participated in the women's empowerment program and learned skills that allowed me to start my own business. Now I am independent and can support my family.\"",
            entrepreneur: "Entrepreneur, Inhambane",
            t3: "\"As a volunteer, I saw firsthand the extraordinary work GHI does. The team's dedication is inspiring. I am proud to be part of this mission.\"",
            volunteer: "Volunteer, Sofala"
        },
        stories: {
            title: "Success Stories",
            subtitle: "Discover the real transformations that Grace Hope Initiative has made possible",
            result_label: "Result:",
            story1: {
                title: "From Street Child to Student",
                desc: "When we met João, he was only 8 years old and living on the streets of Maputo. Through our education program, we rescued him and enrolled him in school.",
                result: "Today, João is in 5th grade with excellent grades and dreams of becoming a teacher."
            },
            story2: {
                title: "From Unemployment to Independence",
                desc: "Fátima was a single mother with no professional qualifications. She participated in our skills training program and learned tailoring and business management.",
                result: "Fátima now owns her own sewing shop and employs 5 people."
            },
            story3: {
                title: "Nurturing the Future",
                desc: "Hundreds of children in peripheral neighborhoods suffered from malnutrition. We implemented a daily school feeding program.",
                result: "90% improvement in health indices and school attendance."
            },
            story4: {
                title: "Clean Water, New Life",
                desc: "The Chokwe community walked km for water. We built accessible wells for everyone.",
                result: "Diseases drastically reduced and more time for school."
            },
            story5: {
                title: "Health Within Reach",
                desc: "Mobile clinics bring basic care to those who need it most in remote areas.",
                result: "Thousands of consultations performed and lives saved."
            },
            today: "Today:"
        },
        projects: {
            title: "Our Projects",
            subtitle: "Discover some of the initiatives that are transforming lives in Mozambique and beyond",
            school_title: "School Reconstruction",
            school_desc: "Complete rehabilitation of a primary school in Sofala, benefiting 500 students.",
            water_title: "Water for All",
            water_desc: "Installation of drinking water pumps in 3 rural communities in Gaza.",
            christmas_title: "Christmas Party",
            christmas_desc: "Community outreach program in Maputo that donated food and gifts to 50 needy children.",
            dec_2021: "December 2021",
            food_title: "Feeding the Children",
            food_desc: "Supported 12 vulnerable families for 10 months during the COVID-19 pandemic with basic needs.",
            covid_tag: "COVID-19 Pandemic",
            home_school_title: "Home School Initiative",
            home_school_desc: "Provided educational support to over 25 children without resources for distance learning.",
            pandemic_edu_tag: "Pandemic Education",
            danilo_title: "Saving Danilo Santos",
            danilo_desc: "Mobilized donor funds to support the Santos family and monitor medical treatment.",
            medical_action_tag: "Medical Action",
            community_title: "Community Companions",
            community_desc: "Collaborative campaign to eradicate homelessness and hunger in Mozambique.",
            since_2023: "Since 2023"
        },
        help: {
            title: "Contacts & Help",
            phone: "Phone / WhatsApp",
            email: "General Email",
            donation_contact: "Donation Contact",
            message_title: "Send Us a Message",
            message_subtitle: "Together, we can rekindle hope and transform lives"
        },
        sdgs: {
            title: "Sustainable Development Goals",
            subtitle: "Grace Hope Initiative is committed to contributing to the following UN SDGs:",
            poverty: "No Poverty",
            hunger: "Zero Hunger",
            health: "Good Health",
            education: "Quality Education",
            gender: "Gender Equality",
            water: "Clean Water and Sanitation",
            economic: "Economic Growth",
            inequality: "Reduced Inequalities"
        },
        forms: {
            volunteer_action: "Be a Volunteer",
            volunteer_desc: "Join our team on the ground.",
            donate_action: "Make a Donation",
            donate_desc: "Financially support our projects.",
            contact_action: "Contact Us",
            contact_desc: "Questions or partnerships? Send a message.",
            volunteer_title: "Volunteer Registration Form",
            contact_title: "Get in Touch",
            name_label: "Full Name",
            name_placeholder: "Your name",
            message_label: "Message",
            message_placeholder: "How can we help?",
            motivation_label: "Why do you want to volunteer?",
            motivation_placeholder: "Tell us a bit about yourself...",
            area_label: "Area of Interest",
            area_education: "Education",
            area_health: "Health",
            area_events: "Event Planning",
            area_logistics: "Logistics",
            area_other: "Other",
            submit_volunteer: "Submit Application",
            submit_volunteer: "Submit Application",
            submit_message: "Send Message",
            email_label: "Email",
            phone_label: "Phone / WhatsApp",
            email_placeholder: "your@email.com"
        },
        footer: {
            subscribe: "Subscribe to Our Newsletter",
            subscribe_desc: "Stay up to date with our latest news and updates.",
            subscribe_btn: "Subscribe",
            email_placeholder: "Your email",
            quick_links: "Quick Links",
            contact_us: "Contact Us",
            email_label: "Email:",
            phone_label: "Phone:",
            address: "Maputo, Mozambique",
            slogan: "Rekindling hope for Mozambique",
            quote: "\"Together, we can rekindle hope and transform lives.\"",
            quote: "\"Together, we can rekindle hope and transform lives.\"",
            rights: "&copy; 2026 Grace Hope Initiative. All rights reserved.",
            back_to_top: "Back to Top"
        },
        modal: {
            title: "Make a Donation",
            subtitle: "Choose your preferred payment method to support our cause.",
            mpesa_name: "Name: Grace Hope Initiative",
            international: "International Donations",
            proof: "Please send proof of payment to"
        }
    }
};

const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'en';

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    langToggle.innerText = lang === 'pt' ? 'EN' : 'PT';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');

        let translation = translations[lang];
        keys.forEach(k => {
            if (translation) translation = translation[k];
        });

        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.innerText = translation;
            }
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const keys = key.split('.');

        let translation = translations[lang];
        keys.forEach(k => {
            if (translation) translation = translation[k];
        });

        if (translation) {
            element.title = translation;
        }
    });
}

if (langToggle) {
    updateLanguage(currentLang);
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        updateLanguage(newLang);
    });
}
