document.addEventListener("DOMContentLoaded", () => {
  // Código para o formulário de cadastro
  const cadastroForm = document.getElementById("cadastroForm");
  
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      // Validação básica
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      
      if (password !== confirmPassword) {
        window.showNotification("As senhas não coincidem!");
        return;
      }
      
      if (password.length < 8) {
        window.showNotification("A senha deve ter pelo menos 8 caracteres!");
        return;
      }
      
      // Verificar se contém pelo menos uma letra e um número
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      
      if (!hasLetter || !hasNumber) {
        window.showNotification("A senha deve conter letras e números!");
        return;
      }
      
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.classList.add("loading");
      submitButton.innerHTML = '<span class="loading-spinner"></span> Criando conta...';
      
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const terms = document.getElementById("terms").checked;
      
      setTimeout(() => {
        console.log("Tentativa de cadastro:", { nome, email, password, terms });
        submitButton.classList.remove("loading");
        submitButton.innerHTML = "Criar Conta";
        
        window.showNotification("Conta criada com sucesso! Redirecionando...");
        
        // Redirecionar para a página de login após o cadastro
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      }, 1500);
    });
  }
  
  // NOVA FUNCIONALIDADE - Mostrar/ocultar senha
  const togglePasswordBtn = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password");
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
  
  // NOVA FUNCIONALIDADE - Mostrar/ocultar confirmação de senha
  const toggleConfirmPasswordBtn = document.getElementById("toggle-confirm-password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const confirmEyeIcon = toggleConfirmPasswordBtn.querySelector(".eye-icon");
  const confirmEyeOffIcon = toggleConfirmPasswordBtn.querySelector(".eye-off-icon");
  
  toggleConfirmPasswordBtn.addEventListener("click", function() {
    // Alternar o tipo do input entre "password" e "text"
    if (confirmPasswordInput.type === "password") {
      confirmPasswordInput.type = "text";
      confirmEyeIcon.classList.add("hidden");
      confirmEyeOffIcon.classList.remove("hidden");
    } else {
      confirmPasswordInput.type = "password";
      confirmEyeIcon.classList.remove("hidden");
      confirmEyeOffIcon.classList.add("hidden");
    }
    
    // Manter o foco no campo de confirmação de senha
    confirmPasswordInput.focus();
  });
  
  // Redirecionamento para os serviços de autenticação
  const googleButton = document.querySelector(".space-y-3 button:nth-of-type(1)");
  const githubButton = document.querySelector(".space-y-3 button:nth-of-type(2)");
  const linkedinButton = document.querySelector(".space-y-3 button:nth-of-type(3)");

  // Redirecionamento para cadastro do Google
  if (googleButton) {
    googleButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para cadastro com Google...");
      
      setTimeout(() => {
        window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile";
      }, 1000);
    });
  }

  // Redirecionamento para cadastro do GitHub
  if (githubButton) {
    githubButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para cadastro com GitHub...");
      
      setTimeout(() => {
        window.location.href = "https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email";
      }, 1000);
    });
  }

  // Redirecionamento para cadastro do LinkedIn
  if (linkedinButton) {
    linkedinButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.showNotification("Redirecionando para cadastro com LinkedIn...");
      
      setTimeout(() => {
        window.location.href = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=YOUR_LINKEDIN_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress";
      }, 1000);
    });
  }
});