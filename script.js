async function fetchPratosApi() {
    const url = `http://localhost:3000/pratos`;
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Cardápio não Encontrado');
        }
        const cardapio = await resposta.json();
        exibirResultado(cardapio);
    } catch (erro) {
        console.log(erro)
        const main = document.getElementsByTagName('main');
        main.innerHTML = `<p>Erro: ${erro.message}</p>`;
    }
}

/*
    bebida:"Suco de Laranja"
    dia:"2025-06-02T00:00:00.000Z"
id_prato:15
id_usuario:5
imagem:"https://www.gastronomia.com.br/wp-content/uploads/2024/01/comida-com-f-feijoada-falafel-fondue-e-muito-mais.jpg"
principal:"Lasanha de Carne"
sobremesa:"Pudim"
turno:"Noturno"
*/

async function exibirResultado(cardapios) {
    const main = document.querySelector('main');
    const h2= document.createElement('h2');
    h2.textContent = 'Cardápio do Dia';
    main.appendChild(h2);
    const hoje = new Date();
    //const hoje = '2025-06-02T05:28:01.124Z'
    const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado-letivo'];


    const prato = cardapios.find(t => (t.dia.slice(0, 10) == hoje.toISOString().slice(0, 10) ? t.turno : 'nao se aplica'));
    if (prato) {
        //const nomeDoDia = diasDaSemana[hoje.getDay()-2];
        const nomeDoDia = diasDaSemana[hoje.getDay()]
        const section = document.createElement('section');
        const h3 = document.createElement('h3');
        h3.textContent = `${prato.turno} - ${prato.principal}`;
        h2.appendChild(h3);

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
        console.log(`Hoje é ${nomeDoDia} e o cardápio é: ${pratosDoDia.principal}`);
  
        } else {
        main.textContent = 'Hoje não temos cardápio disponível.';
    }
}

// Atualiza ao carregar
fetchPratosApi();

// Atualiza a cada minuto
setInterval(exibirResultados, 60000);

