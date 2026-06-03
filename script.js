const API_URL = "https://chargermap-backend.onrender.com/api/postos";

async function carregarPostos() {
  try {
    const response = await fetch(API_URL);
    const postos = await response.json();

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    postos.forEach((posto) => {
      tbody.innerHTML += `
        <tr>
          <td>${posto.nome}</td>
          <td>${posto.cidade}</td>
          <td>${posto.conector}</td>
          <td>${posto.potencia}</td>
          <td>${posto.disponibilidade}</td>
          <td>${posto.avaliacao || 0} ⭐</td>
          <td>
            <button class="edit-btn" onclick="deletarPosto('${posto._id}')">
              Excluir
            </button>
          </td>
        </tr>
      `;
    });

    atualizarCards(postos);
  } catch (error) {
    console.error(error);
  }
}

function atualizarCards(postos) {
  const totalPostos = postos.length;

  document.querySelector(".card h2").textContent = totalPostos;
}

async function criarPosto() {
  const nome = document.getElementById("nome").value;
  const cidade = document.getElementById("cidade").value;
  const conector = document.getElementById("conector").value;
  const potencia = document.getElementById("potencia").value;

  const novoPosto = {
    nome,
    cidade,
    conector,
    potencia,
    disponibilidade: "2 pontos",
    avaliacao: 4.5,
    endereco: "Não informado",
    latitude: 0,
    longitude: 0,
    imagem: ""
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(novoPosto)
    });

    closeModal();
    carregarPostos();
  } catch (error) {
    console.error(error);
  }
}

async function deletarPosto(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    carregarPostos();
  } catch (error) {
    console.error(error);
  }
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

carregarPostos();