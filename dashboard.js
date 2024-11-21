// Objeto para armazenar o status de carregamento de cada veículo
let vehicleChargingStatus = {};

// Função para adicionar veículo ao seletor
function addVehicleToSelector(vehicle) {
  const vehicleSelector = document.getElementById('vehicleSelector');
  const option = document.createElement('option');
  option.value = vehicle.name; // Use o nome do veículo como identificador
  option.textContent = `${vehicle.name} (${vehicle.model})`;
  vehicleSelector.appendChild(option);

  // Associa um valor de bateria ao veículo (exemplo estático: 20% a 100%)
  if (!vehicleChargingStatus[vehicle.name]) {
    vehicleChargingStatus[vehicle.name] = Math.floor(Math.random() * 81) + 20; // Bateria entre 20% e 100%
  }
}

// Função para atualizar o status de carregamento do veículo selecionado
function updateChargingDisplay() {
  const vehicleSelector = document.getElementById('vehicleSelector');
  const selectedVehicle = vehicleSelector.value;

  if (selectedVehicle) {
    const percentage = vehicleChargingStatus[selectedVehicle];
    updateChargingPercentage(percentage);
  }
}

// Função para atualizar o círculo de carregamento com a porcentagem
function updateChargingPercentage(percentage) {
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percentage / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  const percentageLabel = document.getElementById('percentageLabel');
  percentageLabel.textContent = `${percentage}%`;
}

// Função para registrar um veículo
function registerVehicle(event) {
  event.preventDefault();

  // Capturar valores do formulário
  const name = document.getElementById('vehicleName').value;
  const model = document.getElementById('vehicleModel').value;
  const year = document.getElementById('vehicleYear').value;

  if (name && model && year) {
    const vehicle = { name, model, year };

    // Adicionar veículo à tabela
    const tableBody = document.getElementById('vehicleTable').querySelector('tbody');
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = vehicle.name;
    row.insertCell(1).textContent = vehicle.model;
    row.insertCell(2).textContent = vehicle.year;

    // Adicionar veículo ao seletor
    addVehicleToSelector(vehicle);

    // Fechar modal
    closeModal();

    // Limpar formulário
    document.getElementById('vehicleForm').reset();
  } else {
    alert('Por favor, preencha todos os campos do formulário.');
  }
}

// Função para abrir o modal
function openModal() {
  document.getElementById('vehicleModal').style.display = 'block';
}

// Função para fechar o modal
function closeModal() {
  document.getElementById('vehicleModal').style.display = 'none';
}
// Função para calcular a economia de CO₂ com base na porcentagem de bateria
function calculateCO2Savings(percentage) {
    const co2PerFullCharge = 20; // Exemplo: 20kg de CO₂ economizados por carga completa
    return ((percentage / 100) * co2PerFullCharge).toFixed(2); // Economia proporcional
  }
  
  // Função para atualizar a tabela de economia de CO₂
  function updateCO2Table(vehicleName, percentage) {
    const co2TableBody = document.getElementById('co2Table').querySelector('tbody');
  
    // Verificar se o veículo já está na tabela
    let row = Array.from(co2TableBody.rows).find(
      (r) => r.cells[0].textContent === vehicleName
    );
  
    if (!row) {
      // Se o veículo ainda não estiver na tabela, adicione uma nova linha
      row = co2TableBody.insertRow();
      row.insertCell(0).textContent = vehicleName;
      row.insertCell(1).textContent = `${percentage}%`;
      row.insertCell(2).textContent = `${calculateCO2Savings(percentage)} kg`;
    } else {
      // Atualizar a linha existente
      row.cells[1].textContent = `${percentage}%`;
      row.cells[2].textContent = `${calculateCO2Savings(percentage)} kg`;
    }
  }
  
  // Atualizar a tabela de economia de CO₂ ao selecionar um veículo
  function updateChargingDisplay() {
    const vehicleSelector = document.getElementById('vehicleSelector');
    const selectedVehicle = vehicleSelector.value;
  
    if (selectedVehicle) {
      const percentage = vehicleChargingStatus[selectedVehicle];
      updateChargingPercentage(percentage);
      updateCO2Table(selectedVehicle, percentage);
    }
  }
  // Função para abrir o modal de pagamento
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const paymentSummary = document.getElementById('paymentSummary');
  
    // Gerar um resumo fictício
    const totalVehicles = Object.keys(vehicleChargingStatus).length;
    const totalEnergyConsumed = totalVehicles * 30; // Exemplo: 30 kWh por veículo
    const totalCost = totalEnergyConsumed * 0.50; // Exemplo: R$ 0,50 por kWh
  
    paymentSummary.innerHTML = `
      <p>Veículos Carregados: ${totalVehicles}</p>
      <p>Energia Consumida: ${totalEnergyConsumed} kWh</p>
      <p><strong>Total: R$ ${totalCost.toFixed(2)}</strong></p>
    `;
  
    modal.style.display = 'block';
  }
  
  // Função para fechar o modal de pagamento
  function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    resetPaymentProcess();
  }
  
  // Simular pagamento com QR Code
  function simulatePayment() {
    const qrCodeSection = document.getElementById('qrCodeSection');
    const paymentStatus = document.getElementById('paymentStatus');
    const generateQRButton = document.getElementById('generateQRButton');
  
    // Mostrar o QR Code
    qrCodeSection.style.display = 'block';
    generateQRButton.style.display = 'none';
  
    // Simular o pagamento após 5 segundos
    setTimeout(() => {
      qrCodeSection.style.display = 'none';
      paymentStatus.style.display = 'block';
    }, 5000);
  }
  
  // Resetar o processo de pagamento ao fechar o modal
  function resetPaymentProcess() {
    const qrCodeSection = document.getElementById('qrCodeSection');
    const paymentStatus = document.getElementById('paymentStatus');
    const generateQRButton = document.getElementById('generateQRButton');
  
    qrCodeSection.style.display = 'none';
    paymentStatus.style.display = 'none';
    generateQRButton.style.display = 'block';
  }
  let chatOpen = false;

// Alternar visibilidade do chat
function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  chatOpen = !chatOpen;
  chatWindow.style.display = chatOpen ? 'block' : 'none';
}

// Enviar mensagem no chat
function sendMessage() {
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const message = chatInput.value.trim();

  if (message) {
    // Adiciona a mensagem ao chat
    const userMessage = document.createElement('div');
    userMessage.textContent = `Você: ${message}`;
    userMessage.style.textAlign = 'right';
    userMessage.style.margin = '5px 0';

    chatMessages.appendChild(userMessage);

    // Resposta automática do chat
    setTimeout(() => {
      const botMessage = document.createElement('div');
      botMessage.textContent = 'Suporte: Obrigado por entrar em contato!';
      botMessage.style.textAlign = 'left';
      botMessage.style.margin = '5px 0';
      botMessage.style.color = '#555';

      chatMessages.appendChild(botMessage);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para a última mensagem
    }, 1000);

    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para a última mensagem
  }
}

  
