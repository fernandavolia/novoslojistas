function handleSubmit(event) {
    event.preventDefault();
    
    // Simular envio do formulário
    const form = event.target;
    const formData = new FormData(form);
    
    // Validar campos obrigatórios
    const requiredFields = ['nomeLoja', 'cnpj', 'cidade', 'uf', 'telefone'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!formData.get(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Em um ambiente real, você mostraria uma mensagem de erro de validação
        console.error("Por favor, preencha todos os campos obrigatórios.");
        return;
    }
    
    // Mostrar mensagem de sucesso
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('hidden');
        
        // Limpar formulário
        form.reset();
        
        // Scroll para a mensagem
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

function toggleFaq(button) {
    const content = button.nextElementSibling;
    const arrowContainer = button.querySelector('.faq-icon-arrow');
    
    // Define o atributo aria-expanded para acessibilidade
    const isExpanded = button.getAttribute('aria-expanded') === 'true' || false;

    if (content.classList.contains('hidden')) {
        // Expandir
        content.classList.remove('hidden');
        arrowContainer.style.transform = 'rotate(180deg)';
        button.setAttribute('aria-expanded', 'true');
    } else {
        // Recolher
        content.classList.add('hidden');
        arrowContainer.style.transform = 'rotate(0deg)';
        button.setAttribute('aria-expanded', 'false');
    }
}

// Smooth scroll para links de navegação
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

// Formatação automática do CNPJ
const cnpjInput = document.getElementById('cnpj');
if (cnpjInput) {
    cnpjInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
        e.target.value = value;
    });
}

// Formatação automática do telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        // Adiciona o nono dígito opcional e formata
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 6) {
             value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
             value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
        } else {
            value = value.replace(/^(\d*)/, '($1');
        }
        e.target.value = value.slice(0, 15); // Limita o tamanho
    });
}