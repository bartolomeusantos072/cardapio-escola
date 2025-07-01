async function fetchVotosApi() {
  try {
    const resposta = await fetch('https://api-cantina-storage.vercel.app/votacao');

    if (!resposta.ok) throw new Error('Resultado não encontrado');

    const votos = await resposta.json();
    exibirResultadoVotos(votos);
  } catch (erro) {
    console.error(erro);
    document.querySelector('main').innerHTML = `<p>Erro: ${erro.message}</p>`;
  }
}

function exibirResultadoVotos(votos) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.textContent = 'Resultado da Votação de Hoje';
  main.appendChild(h2);

  if (votos.length === 0) {
    main.innerHTML += '<p>Nenhum voto registrado hoje.</p>';
    return;
  }

  // Agrupar votos por id_prato
  const contagem = {};

  votos.forEach((voto) => {
    const id = voto.id_prato;
    if (!contagem[id]) {
      contagem[id] = { votos_sim: 0, votos_nao: 0 };
    }

    if (voto.voto === true) {
      contagem[id].votos_sim++;
    } else {
      contagem[id].votos_nao++;
    }
  });

  // Mapeamento opcional de ID para nome do prato
  const nomesPratos = {
    101: 'Arroz com Feijão',
    102: 'Macarronada',
    103: 'Frango Assado',
    // Adicione mais se necessário
  };

  const ul = document.createElement('ul');

  for (const id in contagem) {
    const prato = contagem[id];
    const nome = nomesPratos[id] || `Prato ID ${id}`;

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${nome}</strong><br>
      Votos "Sim": ${prato.votos_sim}<br>
      Votos "Não": ${prato.votos_nao}
    `;
    ul.appendChild(li);
  }

  main.appendChild(ul);
}

// Inicia a busca ao carregar a página
fetchVotosApi();
