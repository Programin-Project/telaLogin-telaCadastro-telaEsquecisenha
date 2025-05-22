document.addEventListener("DOMContentLoaded", () => {
  // Código para o formulário de recuperação de senha
  const recoverForm = document.getElementById("recoverForm");
  
  if (recoverForm) {
    recoverForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.classList.add("loading");
      submitButton.innerHTML = '<span class="loading-spinner"></span> Enviando...';
      
      const email = document.getElementById("email").value;
      
      setTimeout(() => {
        console.log("Tentativa de recuperação de senha para:", email);
        submitButton.classList.remove("loading");
        submitButton.innerHTML = "Enviar Link de Recuperação";
        
        // Usar o sistema de fila para notificações
        window.showNotification("Link de recuperação enviado para seu e-mail!");
      }, 1500);
    });
  }
  
  // NOVA FUNCIONALIDADE - Redirecionamento para página de cadastro
  const createAccountLinks = document.querySelectorAll('a[href="#"].text-programin-blue.hover\\:underline.link-animation:not([href="index.html"])');

  createAccountLinks.forEach(link => {
    if (link.textContent.includes("Crie uma conta")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.showNotification("Redirecionando para página de cadastro...");
        
        // Pequeno atraso para que a notificação seja exibida antes do redirecionamento
        setTimeout(() => {
          // Redirecionar para a página de cadastro
          window.location.href = "cadastro.html";
        }, 1000);
      });
    }
  });
});