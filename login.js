document.addEventListener("DOMContentLoaded", () => {
  // Código para o formulário de login
  const loginForm = document.getElementById("loginForm");
  
  if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.classList.add("loading");
      submitButton.innerHTML = '<span class="loading-spinner"></span> Entrando...';
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const remember = document.getElementById("remember").checked;
      
      setTimeout(() => {
        console.log("Tentativa de login:", { email, password, remember });
        submitButton.classList.remove("loading");
        submitButton.innerHTML = "Entrar";
        
        // Usar o sistema de fila para notificações
        window.showNotification("Login realizado com sucesso!");
      }, 1500);
    });
  }
  
  // NOVA FUNCIONALIDADE - Mostrar/ocultar senha
  const togglePasswordBtn = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password");
  
  if (togglePasswordBtn && passwordInput) {
    const eyeIcon = togglePasswordBtn.querySelector(".eye-icon");
    const eyeOffIcon = togglePasswordBtn.querySelector(".eye-off-icon");
    
    togglePasswordBtn.addEventListener("click", function() {
      // Alternar o tipo do input entre "password" e "text"
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.add("hidden");
        eyeOffIcon.classList.remove("hidden");
      } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("hidden");
        eyeOffIcon.classList.add("hidden");
      }
      
      // Manter o foco no campo de senha
      passwordInput.focus();
    });
  }
  
  // Redirecionamento para os serviços de autenticação
  const googleButton = document.querySelector(".space-y-3 button:nth-of-type(1)");
  const githubButton = document.querySelector(".space-y-3 button:nth-of-type(2)");
  const linkedinButton = document.querySelector(".space-y-3 button:nth-of-type(3)");
  const forgotPasswordLink = document.querySelector("a.text-programin-blue.hover\\:underline.link-animation");
  const createAccountLink = document.querySelector("#footer a.text-programin-blue.hover\\:underline.link-animation");

  // Redirecionamento para login do Google
  if (googleButton) {
    googleButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para o Google...");
      
      setTimeout(() => {
        window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
      }, 1000);
    });
  }

  // Redirecionamento para login do GitHub
  if (githubButton) {
    githubButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para o GitHub...");
      
      setTimeout(() => {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email";
      }, 1000);
    });
  }

  // Redirecionamento para login do LinkedIn
  if (linkedinButton) {
    linkedinButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para o LinkedIn...");
      
      setTimeout(() => {
        window.location.href = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_LINKEDIN_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress";
      }, 1000);
    });
  }

  // Redirecionamento para recuperação de senha
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para recuperação de senha...");
      
      setTimeout(() => {
        window.location.href = "recuperar-senha.html";
      }, 1000);
    });
  }

  // Redirecionamento para página de cadastro
  if (createAccountLink) {
    createAccountLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para página de cadastro...");
      
      setTimeout(() => {
        window.location.href = "cadastro.html";
      }, 1000);
    });
  }
});