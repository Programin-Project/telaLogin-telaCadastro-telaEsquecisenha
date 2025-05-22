document.addEventListener("DOMContentLoaded", () => {
  // Sistema de fila para notificações
  const notificationQueue = [];
  let isNotificationActive = false;

  function showNotification(message) {
    // Adiciona a mensagem à fila
    notificationQueue.push(message);
    
    // Se não houver notificação ativa, processa a fila
    if (!isNotificationActive) {
      processNotificationQueue();
    }
  }

  function processNotificationQueue() {
    // Se a fila estiver vazia, não faz nada
    if (notificationQueue.length === 0) {
      isNotificationActive = false;
      return;
    }
    
    // Marca que há uma notificação ativa
    isNotificationActive = true;
    
    // Remove qualquer notificação existente
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });
    
    // Espera um pouco para garantir que a notificação anterior foi removida
    setTimeout(() => {
      // Pega a próxima mensagem da fila
      const message = notificationQueue.shift();
      
      // Cria e exibe a notificação
      const notification = document.createElement("div");
      notification.classList.add("notification");
      notification.textContent = message;
      document.body.appendChild(notification);
      
      // Pequeno atraso para garantir que a animação funcione
      setTimeout(() => notification.classList.add("show"), 10);
      
      // Remove a notificação após 1.5 segundos (reduzido de 3 segundos)
      setTimeout(() => {
        notification.classList.remove("show");
        
        // Após a animação de saída, remove o elemento e processa a próxima notificação
        setTimeout(() => {
          notification.remove();
          processNotificationQueue();
        }, 300);
      }, 1500); // Tempo reduzido de 3000ms para 1500ms
    }, 300);
  }

  // CÓDIGO ATUALIZADO - Animação de estrelas (formato de estrela) ao clicar no logo
  const logoButton = document.getElementById("logo-button");
  const starsContainer = document.getElementById("stars-container");
  const logoText = document.querySelector(".logo");
  
  function createStar(x, y) {
    const star = document.createElement("div");
    star.classList.add("star");
    
    // Posição inicial no centro do logo
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    // Direção aleatória para a estrela se mover
    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 70; // Aumentado para maior dispersão
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    // Rotação aleatória para a estrela
    const rotation = Math.random() * 360;
    
    // Definir variáveis CSS personalizadas para a animação
    star.style.setProperty('--tx', `${tx}px`);
    star.style.setProperty('--ty', `${ty}px`);
    star.style.setProperty('--rotation', `${rotation}deg`);
    
    // Tamanho aleatório para cada estrela
    const size = 6 + Math.random() * 8; // Estrelas um pouco maiores para serem mais visíveis
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Adicionar a estrela ao container
    starsContainer.appendChild(star);
    
    // Remover a estrela após a animação
    setTimeout(() => {
      star.remove();
    }, 800);
  }
  
  function createStarBurst() {
    // Obter as dimensões do texto do logo
    const logoRect = logoText.getBoundingClientRect();
    
    // Criar várias estrelas
    for (let i = 0; i < 30; i++) {
      // Posição aleatória dentro do logo
      const x = Math.random() * logoRect.width;
      const y = Math.random() * logoRect.height;
      
      // Pequeno atraso para cada estrela
      setTimeout(() => {
        createStar(x, y);
      }, i * 15);
    }
  }

  // CÓDIGO MODIFICADO - Animação de chuva de código com velocidades diferentes
  const container = document.getElementById("symbols-container");
  const caracteres = ["0", "1", "{", "}", "(", ")", "[", "]", ";", ".", "=", "<", ">", "+", "-", "*", "&", "|", "!"];
  
  // Variáveis para controlar a velocidade
  let speedMode = 0; // 0: normal, 1: médio, 2: rápido
  const speedClasses = ["speed-normal", "speed-medium", "speed-fast"];
  
  // Aplicar classe de velocidade inicial
  container.classList.add(speedClasses[speedMode]);
  
  // Intervalo para criar símbolos
  let symbolInterval;
  
  function createSymbol() {
    const symbol = document.createElement("div");
    symbol.classList.add("symbol");

    const char = caracteres[Math.floor(Math.random() * caracteres.length)];
    symbol.textContent = char;

    // Tamanho reduzido para um valor intermediário
    const size = Math.random() * 10 + 14;
    symbol.style.fontSize = `${size}px`;

    const left = Math.random() * 100;
    symbol.style.left = `${left}vw`;

    // Duração base da animação
    const baseDuration = Math.random() * 2.5 + 2.5;
    symbol.style.setProperty('--base-duration', `${baseDuration}s`);

    container.appendChild(symbol);

    // Verifica se o elemento passou da metade da tela e troca a cor
    const interval = setInterval(() => {
      const rect = symbol.getBoundingClientRect();
      const middle = window.innerHeight / 2;

      if (rect.top > middle) {
        symbol.classList.add("halfway");
        clearInterval(interval); // para de verificar após trocar a cor
      }
    }, 100); // verifica a cada 100ms

    // Remove o símbolo após a animação
    // O tempo depende da velocidade atual
    let duration;
    switch (speedMode) {
      case 0: duration = baseDuration; break;
      case 1: duration = baseDuration * 0.7; break;
      case 2: duration = baseDuration * 0.4; break;
    }
    
    setTimeout(() => {
      symbol.remove();
      clearInterval(interval); // limpar caso ainda ativo
    }, duration * 1000);
  }

  // Função para iniciar a criação de símbolos com frequência baseada na velocidade
  function startSymbolCreation() {
    // Limpar intervalo anterior se existir
    if (symbolInterval) {
      clearInterval(symbolInterval);
    }
    
    // Definir frequência baseada na velocidade
    let frequency;
    switch (speedMode) {
      case 0: frequency = 100; break; // Normal: 100ms
      case 1: frequency = 70; break;  // Médio: 70ms
      case 2: frequency = 40; break;  // Rápido: 40ms
    }
    
    symbolInterval = setInterval(createSymbol, frequency);
  }
  
  // Iniciar com velocidade normal
  startSymbolCreation();
  
  // Alternar velocidade ao clicar no logo
  logoButton.addEventListener("click", function(e) {
    // Evitar propagação para não acionar o efeito ripple
    e.stopPropagation();
    
    // Criar efeito de estrelas
    createStarBurst();
    
    // Alternar para a próxima velocidade
    speedMode = (speedMode + 1) % 3;
    
    // Remover todas as classes de velocidade
    speedClasses.forEach(cls => container.classList.remove(cls));
    
    // Adicionar a classe de velocidade atual
    container.classList.add(speedClasses[speedMode]);
    
    // Reiniciar a criação de símbolos com a nova velocidade
    startSymbolCreation();
    
    // Mostrar notificação com a velocidade atual
    const speedNames = ["normal", "média", "rápida"];
    showNotification(`Velocidade ${speedNames[speedMode]} ativada`);
  });
  
  // CÓDIGO MODIFICADO - Funcionalidade do switch de tema com efeito de onda
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.getElementById("body");
  const waveEffect = document.getElementById("wave-effect");

  // Verificar se há uma preferência de tema salva
  const savedTheme = localStorage.getItem("theme");

  // Função para acionar o efeito de onda
  function triggerWaveEffect() {
    // Remover classes anteriores para reiniciar a animação
    waveEffect.classList.remove("wave-animation");
    
    // Forçar um reflow para que a animação reinicie
    void waveEffect.offsetWidth;
    
    // Adicionar a classe de animação
    waveEffect.classList.add("wave-animation");
  }

  // Variável para controlar se o toggle está em processo de mudança
  let isToggling = false;

  // Função para alternar o tema com efeito de onda
  function toggleTheme(isDark) {
    // Se já estiver alternando, ignora
    if (isToggling) return;
    
    // Marca que está alternando
    isToggling = true;
    
    // Acionar o efeito de onda
    triggerWaveEffect();
    
    // Adicionar classe de transição
    body.classList.add("transitioning");
    
    // Alternar o tema após um pequeno atraso para sincronizar com a onda
    setTimeout(() => {
      if (isDark) {
        body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
      }
      
      // Remover classe de transição após a conclusão
      setTimeout(() => {
        body.classList.remove("transitioning");
        
        // Mostrar notificação após a transição
        showNotification(isDark ? "Tema escuro ativado" : "Tema claro ativado");
        
        // Marca que terminou de alternar
        isToggling = false;
      }, 500);
      
    }, 300);
  }

  // Se não houver preferência salva ou a preferência for "dark", ativar o tema escuro
  if (savedTheme === null || savedTheme === "dark") {
    body.classList.add("dark-theme");
    themeToggle.checked = true;
    
    // Se for a primeira visita, salvar a preferência como "dark"
    if (savedTheme === null) {
      localStorage.setItem("theme", "dark");
    }
  } else {
    // Se a preferência salva for "light", manter o tema claro
    body.classList.remove("dark-theme");
    themeToggle.checked = false;
  }

  // Acionar o efeito de onda na carga inicial da página
  setTimeout(() => {
    triggerWaveEffect();
  }, 500);

  // Alternar tema quando o switch for clicado
  themeToggle.addEventListener("change", function() {
    toggleTheme(this.checked);
  });

  // Expor funções para uso global
  window.showNotification = showNotification;
});