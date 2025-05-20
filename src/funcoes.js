document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("consultaForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const numero = document.getElementById("numero").value;
      const resultadoDiv = document.getElementById("resultado");
      resultadoDiv.textContent = "Consultando...";
      resultadoDiv.classList.remove("erro");
      try {
        const resp = await fetch("/bandeira", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ numero }),
        });
        const data = await resp.json();
        if (data.bandeira) {
          resultadoDiv.textContent = "Bandeira: " + data.bandeira;
        } else if (data.erro) {
          resultadoDiv.textContent = data.erro;
          resultadoDiv.classList.add("erro");
        } else {
          resultadoDiv.textContent = "Erro inesperado.";
          resultadoDiv.classList.add("erro");
        }
      } catch (err) {
        resultadoDiv.textContent = "Erro ao consultar a API.";
        resultadoDiv.classList.add("erro");
      }
    });

  // Garante que o input está disponível antes de adicionar o listener
  const inputNumero = document.getElementById("numero");
  if (inputNumero) {
    inputNumero.addEventListener("input", async function (e) {
      const numero = e.target.value;
      console.log("Número digitado:", numero);
      const bandeiraBox = document.getElementById("bandeiraBox");
      const bandeiraImg = document.getElementById("bandeiraImg");
      const bandeiraNome = document.getElementById("bandeiraNome");
      const resultadoDiv = document.getElementById("resultado");
      bandeiraBox.style.display = "none";
      resultadoDiv.textContent = "";
      // Consulta a cada número digitado
      if (numero.length < 1) return;
      try {
        // Sempre use caminho relativo para funcionar em qualquer ambiente servido por HTTP
        const resp = await fetch("/bandeira", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ numero }),
        });
        const data = await resp.json();
        // Mapas de logos oficiais das bandeiras
        const logos = {
          visa: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
          mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
          amex: 'https://logodix.com/logo/61140.jpg',
          elo: 'https://comocomprar.com.br/wp-content/uploads/2013/03/bandeira-elo.jpg',
          hipercard: 'https://iconape.com/wp-content/files/ns/183492/png/hipercard-logo.png',
          discover: 'https://freepnglogo.com/images/all_img/1713105072discover-logo-png.png'
        };
        if (data.bandeira && data.bandeira !== "Desconhecida") {
          const nome = data.bandeira.toLowerCase().replace(/\s/g, "");
          const bandeiraLogo = document.getElementById("bandeiraLogo");
          bandeiraLogo.src = logos[nome] || '';
          bandeiraLogo.alt = `Logo ${data.bandeira}`;
          bandeiraNome.textContent = data.bandeira;
          bandeiraBox.style.display = "block";
        } else {
          bandeiraBox.style.display = "none";
        }
      } catch (err) {
        bandeiraBox.style.display = "none";
      }

      // Atualiza o número do cartão no cartão demo
      const cartaoNumero = document.getElementById("cartaoNumero");
      let numeroFormatado = numero.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (!numeroFormatado) numeroFormatado = '•••• •••• •••• ••••';
      cartaoNumero.textContent = numeroFormatado;
    });
  }
});
