function showTab(tab) {
    const tabs = document.querySelectorAll('.form');
    tabs.forEach(t => t.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
  
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[onclick="showTab('${tab}')"]`).classList.add('active');
  }
  
  function redirectToDashboard(event) {
    event.preventDefault();
    window.location.href = 'dashboard.html';
  }
  
  