const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const statusMessage = document.getElementById('statusMessage');
const teamCard = document.getElementById('teamCard');

const teamLogo = document.getElementById('teamLogo');
const teamName = document.getElementById('teamName');
const teamCountry = document.getElementById('teamCountry');
const teamFounded = document.getElementById('teamFounded');
const teamStadium = document.getElementById('teamStadium');
const teamCapacity = document.getElementById('teamCapacity');
const teamCity = document.getElementById('teamCity');

async function buscarTime() {
    const termoBusca = searchInput.value.trim();

    if (!termoBusca) {
        statusMessage.textContent = "Por favor, digite o nome de um time.";
        statusMessage.classList.remove('hidden');
        teamCard.classList.add('hidden');
        return;
    }

    const url = `https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=${encodeURIComponent(termoBusca)}`;

    try {
        statusMessage.textContent = "Buscando informações...";
        statusMessage.classList.remove('hidden');
        teamCard.classList.add('hidden');
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        if (!data.teams || data.teams.length === 0) {
            statusMessage.textContent = "Time não encontrado. Tente outro nome!";
            statusMessage.classList.remove('hidden');
            return;
        }

        const time = data.teams[0];

        teamName.textContent = time.strTeam || "Não informado";
        teamCountry.textContent = time.strCountry || "Não informado";
        teamFounded.textContent = time.intFormedYear || "Não informado";
        teamStadium.textContent = time.strStadium || "Não informado";
        teamCity.textContent = time.strLocation || "Não informado";
        
        if (time.intStadiumCapacity) {
            teamCapacity.textContent = `${Number(time.intStadiumCapacity).toLocaleString('pt-BR')} espectadores`;
        } else {
            teamCapacity.textContent = "Não informado";
        }

        teamLogo.src = time.strTeamBadge || "https://via.placeholder.com/100?text=Sem+Foto";
        teamLogo.alt = `Escudo do ${time.strTeam}`;

        statusMessage.classList.add('hidden');
        teamCard.classList.remove('hidden');

    } catch (error) {
        statusMessage.textContent = "Erro de conexão. Tente novamente mais tarde.";
        statusMessage.classList.remove('hidden');
        teamCard.classList.add('hidden');
    }
}

searchButton.addEventListener('click', buscarTime);

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        buscarTime();
    }
});
