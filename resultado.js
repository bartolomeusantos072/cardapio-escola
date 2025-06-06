async function fetchVotosApi() {
  try {
    const resposta = await fetch('http://localhost:3000/votacao');

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

  const ul = document.createElement('ul');

  votos.forEach((prato) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${prato.principal}</strong><br>
      Votos "Sim": ${prato.votos_sim || 0}<br>
      Votos "Não": ${prato.votos_nao || 0}
    `;
    ul.appendChild(li);
  });

  main.appendChild(ul);
}

// Inicia a busca ao carregar a página
fetchVotosApi();
