fetch("http://localhost:8080/Europa") //exibe os dados dos filmes puxados do filmes.json
  .then((response) => response.json()) // converte a resposta para json
  .then((data) => {
    //manipulando os dados
    const europaList = document.getElementById("europa-list");
    data.forEach((Europa) => {
      // iterando os dados dos continentes recebidos.
      const europaDiv = document.createElement("div");
      europaDiv.innerHTML = ` 
      <div class="container_paises">
      <img src = "${Europa.imagem}" alt = "${Europa.nome}">
      <div class="text_desc">
      <h2 class="nome_pais"> ${Europa.nome} </h2>
      <p> <strong> Data do Próximo Vôo:</strong> ${Europa.dia_da_viagem} <p/>
      <p> <strong> Ponto Turistico: </strong> ${Europa.ponto_turistico} <p/>
      <p> <strong> Temporada: </strong> ${Europa.temporada} <p/>
      <p> <strong> Moeda Oficial: </strong> ${Europa.moeda} <p/>
      <p> <strong> Por que Visitar: </strong> ${Europa.porque_visitar} <p/>
      <p> <strong> Avaliação do País: </strong> ${Europa.avaliacao} <p/>
      <p> <strong> Valor da viagem: </strong> ${Europa.valor_da_viagem} <p/>
      <button onclick="comprarPassagem('${Europa.nome}')">Comprar Passagem</button>
      </div>
      </div> `;
    europaList.appendChild(europaDiv);
    });
  })
  .catch((error) => console.error("Erro ao carregar os paises:", error));

  function comprarPassagem(nomeDoPais) {
    // Aqui você pode personalizar a mensagem de acordo com o país selecionado
    Swal.fire({
      icon: 'warning',
      title: 'Passagem Esgotada!',
      text: `Infelizmente as passagens para ${nomeDoPais} estão esgotadas no momento.`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendi'
    });
  }
  
  // barra de pesquisa

  function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // função para que consiga pesquisar sem especificar os acentos
}
function search_bar() {
    var input, filter, europaDiv, countryDiv, countryName, i, txtValue; //  input para armazenar o valor da barra de pesquisa, filter para armazenar o valor da pesquisa sem acentos, europaDiv para armazenar a div onde estão listados os países, countryDiv para armazenar as divs individuais de cada país, countryName para armazenar o nome do país atual sendo verificado, i para controle do loop e txtValue para armazenar o texto do país atual.
    input = removeAccents(document.getElementById('searchInput').value.toUpperCase());
    filter = input.toUpperCase(); // filtro para ser insensível a maiúsculas e minúsculas.
    europaDiv = document.getElementById('europa-list'); // pega a div em que os paises estao listados e coloca na variavel 'europaDiv'
    countryDiv = europaDiv.getElementsByClassName('container_paises'); // aqui estamos pegando todas as informções que estao dentro de container_paises

    for (i = 0; i < countryDiv.length; i++) { // ira verificar se o pais que foi digitado corresponde com algum, se sim, irá exibi-lo
        countryName = removeAccents(countryDiv[i].getElementsByClassName('nome_pais')[0].textContent || countryDiv[i].getElementsByClassName('nome_pais')[0].innerText); // será exibido definindo o estilo de exibição da div do país atual como vazio.
        if (countryName.toUpperCase().indexOf(filter) > -1) {
            countryDiv[i].style.display = "";
        } else {
            countryDiv[i].style.display = "none"; // ocultando a div do país atual. Isso fará com que o país não seja exibido na lista de países.
        }
    }
}