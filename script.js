// Função para buscar detalhes a partir de um CEP inserido pelo usuário
function buscaCep() {
  cep = document.getElementById("cep").value
  result = document.getElementById("result")
  // Faz uma requisição para a API Viacep usando o valor do CEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => { return res.json() })
    .then((cep) => { result.innerHTML = mountList(cep) })
}

// Função lista de estados
function buscaUF() {
  // Faz uma requisição para a API do IBGE
  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then((res) => { return res.json() })
    .then((ufs) => {
      console.log('estados', ufs)
      list = "<option selected>Selecione o estado</option>"
      // Percorre os estados e cria uma lista de opções para seleção
      for (let uf of ufs) {
        list += `<option value="${uf.id}-${uf.sigla}">${uf.nome}</option>`
      }
      $("#ufs").html(list)
    })
}
buscaUF() // Chama a função buscaUF automaticamente ao carregar a página

// Função para lidar com a mudança de estados e buscar os municípios correspondentes
function mudaUF(e) {
  console.log(e.target.value)
  uf = e.target.value.split("-")[0]
  // Faz uma requisição para a API do IBGE para obter os municípios do estado selecionado
  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
    .then((res) => { return res.json() })
    .then((cidades) => { console.log(cidades) })
}

// Função para limpar o resultado exibido na página
function limparResultado() {
  result = document.getElementById("result")
  result.innerHTML = ""
}

// Função para buscar detalhes a partir de um nome de rua inserido pelo usuário
function buscaRua() {
  rua = document.getElementById("rua").value
  result = document.getElementById("result")
  // Faz uma requisição para a API Viacep usando o estado e o nome da rua
  fetch(`https://viacep.com.br/ws/PE/Recife/${rua}/json/`)
    .then((res) => { return res.json() })
    .then((ceps) => { result.innerHTML = mountListRuas(ceps) })
}

// Função auxiliar para formatar os detalhes do CEP em uma lista
function mountList(cep) {
  list = ""
  // Cria uma lista de detalhes do CEP formatados em HTML
  list = `
      <div class="card" style="width: 100%;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${cep.logradouro}</li>
          <li class="list-group-item">${cep.localidade}</li>
          <li class="list-group-item">${cep.bairro}</li>
          <li class="list-group-item">${cep.uf}</li>
        </ul>
      </div>
    `
  return list // Retorna a lista formatada
}

// Função auxiliar para formatar os detalhes de ruas em uma lista
function mountListRuas(ceps) {
  list = []
  // Percorre os detalhes das ruas e os formata em uma lista de cards
  for (let cep of ceps) {
    list.push(`
      <div class="card" style="width: 100%;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${cep.logradouro}</li>
          <li class="list-group-item">${cep.localidade}</li>
          <li class="list-group-item">${cep.bairro}</li>
          <li class="list-group-item">${cep.uf}</li>
        </ul>
      </div><br>
    `)
  }

  return list.toString().replaceAll(",", "") // Retorna a lista formatada como uma string
}

