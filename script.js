import cardapio from './dados.js';

function atualizarCardapio() {
    const main = document.querySelector('main');
    main.innerHTML = '<h2>Cardápio do dia</h2>'; // Limpa o conteúdo anterior.

    const diasDaSemana = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado-letivo'];
    const hoje = new Date().getDay();
    const diaAtual = diasDaSemana[hoje];

    const menuDoDia = cardapio.find(dia => dia.dia === diaAtual);

    if (menuDoDia) {
        const section = document.createElement('section');

        const h3 = document.createElement('h3');
        h3.textContent = menuDoDia.dia;
        main.appendChild(h3);

        const ul = document.createElement('ul');
        menuDoDia.cardapio.split(', ').forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        section.appendChild(ul);

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = menuDoDia.img;
        img.alt = menuDoDia.alt;
        figure.appendChild(img);
        section.appendChild(figure);

        main.appendChild(section);
    } else {
        main.textContent = 'Hoje não temos cardápio disponível.';
    }
}

// Atualiza o cardápio na inicialização
atualizarCardapio();

// Verifica a mudança de dia a cada minuto (60000ms)
setInterval(atualizarCardapio, 60000);
