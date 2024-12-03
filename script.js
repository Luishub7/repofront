const loginButton = document.getElementById('loginButton');
const spinner = document.getElementById('spinner');

loginButton.addEventListener('click', async () => {
  // Muestra el spinner
  spinner.style.display = 'block';

  // Simula un proceso (como conectar al servidor)
  await new Promise(resolve => setTimeout(resolve, 3000)); // Simula un retraso de 3 segundos

  // Oculta el spinner después del proceso
  spinner.style.display = 'none';

  // Aquí agregas lo que ocurre después (redireccionar, mostrar un mensaje, etc.)
  alert('Inicio de sesión exitoso');
});
