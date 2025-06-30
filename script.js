async function fetchPratosApi() {
  const url = `https://api-cantina-storage.vercel.app/pratos`;
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error('Cardápio não Encontrado');
    }
    const cardapio = await resposta.json();
    exibirResultado(cardapio);
  } catch (erro) {
    console.log(erro);
    const main = document.querySelector('main');
    main.innerHTML = `<p>Erro: ${erro.message}</p>`;
  }
}

function exibirResultado(cardapios) {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const h2 = document.createElement('h2');
  h2.textContent = 'Cardápio do Dia';
  main.appendChild(h2);

  const hoje = new Date();
  const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado-letivo'];

  const prato = cardapios.find(t => t.dia.slice(0, 10) === hoje.toISOString().slice(0, 10));
  if (prato) {
    const nomeDoDia = diasDaSemana[hoje.getDay()];
    const section = document.createElement('section');

    const h3 = document.createElement('h3');
    h3.textContent = `${prato.turno} - ${prato.principal}`;
    main.appendChild(h3);

    const ul = document.createElement('ul');
    const itens = [
      `Prato Principal: ${prato.principal}`,
      `Sobremesa: ${prato.sobremesa}`,
      `Bebida: ${prato.bebida}`
    ];
    itens.forEach(texto => {
      const li = document.createElement('li');
      li.textContent = texto;
      ul.appendChild(li);
    });
    section.appendChild(ul);

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = prato.imagem;
    img.alt = `Imagem de ${prato.principal}`;
    figure.appendChild(img);
    section.appendChild(figure);

    main.appendChild(section);

    window.id_prato_atual = prato.id_prato;
  } else {
    main.textContent = 'Hoje não temos cardápio disponível.';
  }
}

async function getUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    if (!response.ok) throw new Error('Não foi possível obter o IP');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Erro ao buscar IP:', error);
    return null;
  }
}

const form = document.querySelector('footer form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const respostaSelecionada = document.querySelector('input[name="resposta"]:checked');
  if (!respostaSelecionada) {
    alert('Por favor, selecione uma opção.');
    return;
  }

  const id_prato = window.id_prato_atual;
  if (!id_prato) {
    alert('Cardápio ainda não foi carregado.');
    return;
  }

  const voto = respostaSelecionada.value === 'yes';

  const ip_usuario = await getUserIP();
  if (!ip_usuario) {
    alert('Não foi possível obter seu IP. Tente novamente.');
    return;
  }

  const votoObj = { id_prato, ip_usuario, voto };

  console.log('Enviando voto:', votoObj);

  try {
    const response = await fetch('https://api-cantina-storage.vercel.app/votacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(votoObj)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao enviar voto.');
    }

    const data = await response.json();
    alert(data.message || 'Voto registrado com sucesso!');
    window.location.href = 'resultado.html';

  } catch (error) {
    alert(`Erro: ${error.message}`);
  }
});

// Chama para carregar cardápio assim que a página abre
fetchPratosApi();
