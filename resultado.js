    async function fetchVotosApi() {
  const url = `http://localhost:3000/votacao`;

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error('Resultado não encontrado');

    const votos = await resposta.json();
    exibirResultadoVotos(votos);

  } catch (erro) {
    console.log(erro);
    const main = document.querySelector('main');
    main.innerHTML = `<p>Erro: ${erro.message}</p>`;
  }
}

function exibirResultadoVotos(votos) {
  const main = document.querySelector('main');
  main.innerHTML = ''; // limpa conteúdo anterior

  const h2 = document.createElement('h2');
  h2.textContent = 'Resultado da Votação de Hoje';
  main.appendChild(h2);

  const pSim = document.createElement('p');
  pSim.textContent = `Votos "Sim": ${votos.sim}`;
  main.appendChild(pSim);

  const pNao = document.createElement('p');
  pNao.textContent = `Votos "Não": ${votos.nao}`;
  main.appendChild(pNao);
}

// Chama ao carregar a página
fetchVotosApi();
