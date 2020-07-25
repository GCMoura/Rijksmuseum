var colors = [
    '#fff', //branco
    '#fc4a1a', //laranja
    '#f7b733', //amarelo
    '#ffce00', //amarelo
    'red', //vermelho
    '#18121e', //navyblue
    '#e37222', //laranja
    '#0e0b16', //preto
    'pink', //rosa
    '#015249', //verde
    '#3cc47c' //verde
]
var input = document.querySelector('.input')
var btnSearch = document.querySelector('.btn')
var limpar = document.querySelector('.btn-limpar')
var btnMakersList = document.querySelector('.makers-list button')
var btnMaker = document.querySelector('.button-maker')
var content = document.querySelector('.content') 

var titleSpan = document.querySelectorAll('.title span')
var contentSpan = document.querySelectorAll('.content span')

var title = document.querySelector('.title')

var masterpieces = ''
const key = 'dMnRKstP'

var search = input.value

btnSearch.addEventListener('click', getMaker) //botão de pesquisa

limpar.addEventListener('click', cleanField) //botão para limpar a pesquisa

btnMakersList.addEventListener('click', makersList) //botão com a lista de pintores

getMuseum()
changeColor()

async function getMuseum() { //faz a consulta à API do museu
    
    const url = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&involvedMaker=${search}` 

    const res = await fetch(url)
   
    masterpieces = await res.json()

    btnSearch.disabled = false
    btnMakersList.disabled = false

    if(masterpieces.artObjects.length === 0){ //o retorno do fetch foi vazio
        location.reload() //reload a página
    }

    console.log(masterpieces)
}

function makersList(){ //cria a lista de botões com todos os pintores

    var makersArray = masterpieces.facets[0].facets

    for(let i = 0; i < makersArray.length; i++){
        var button = document.createElement('button')
        button.classList.add('btn-maker')
        if(makersArray[i].key !== 'anonymous' && makersArray[i].key !== 'unknown') {
            button.innerHTML = makersArray[i].key
            btnMaker.appendChild(button)
            title.style.display = 'block'
        }
    }
    var buttons = document.querySelectorAll('.btn-maker')

    buttons.forEach(button => {
        button.addEventListener('click', function(){getSets(button.firstChild.data)})
    }) 
}

function getMaker(){ //faz a consulta pelo input, criando botões com o resultado
    btnMaker.innerHTML = ''

    var makers = [] //para verificar se existe mais de um pintor com o mesmo nome

    search = input.value //pega o valor da pesquisa

    const array = masterpieces.facets[0].facets //array com todos os pintores

    for(let i = 0; i < array.length; i++){

        var pintor = array[i].key.split(' ')

        for(let j = 0; j < pintor.length; j++){
            if (search.toLowerCase() === pintor[j].toLowerCase()){ //verifica se o nome pesquisado se refere a algum pintor
                makers.push(array[i].key) //adiciona o pintor no array
            }
        }   
    }

    //cria um botão para cada e chama a função do pintor selecionado
    for(let i = 0; i < makers.length; i++){
        var button = document.createElement('button')
        button.classList.add('btn-maker')
        button.innerHTML = makers[i]
        btnMaker.appendChild(button)
    }
    var buttons = document.querySelectorAll('.btn-maker')

    buttons.forEach(button => {
        button.addEventListener('click', function(){getSets(button.firstChild.data)})
    })
    
    input.value = '' //limpa o campo de pesquisa
}

async function getSets(maker){ //faz nova pesquisa à API, agora com o termo específico do pintor

    btnMaker.innerHTML = ''
    
    const urlMaker = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&involvedMaker=${maker}`

    const res = await fetch(urlMaker)

    masterpieces = await res.json()

    console.log(masterpieces)
    
    var url = []
    var width = []
    var height = []

    var setWidth
    var setHeight

    for(let i = 0; i < masterpieces.artObjects.length; i++){
        if(masterpieces.artObjects[i].hasImage === true){
            console.log(masterpieces.artObjects[i].webImage.url)
            url.push(masterpieces.artObjects[i].webImage.url) //colocando em um array as obras de arte do artista
            width.push(masterpieces.artObjects[i].webImage.width) // as larguras
            height.push(masterpieces.artObjects[i].webImage.height) // as alturas
        }
    }

    for(let i = 0; i < url.length; i++){ //percorre o array de obras de arte para criar uma imagem com cada uma

        if(width[i] / 5 > 360){
            setWidth = '100%'
        } else {
            setWidth = width[i] / 5 //mantem a proporção original da largura
        }

        if(height[i] / 5 > 400){
            setHeight = 400
        } else {
            setHeight = height[i] / 5 //mantem a proporção original da altura
        }

        var figure = document.createElement('figure')

        figure.classList.add('figure-style')

        var figureCaption = document.createElement('figcaption')

        figureCaption.classList.add('figure-caption-style')

        var img = document.createElement('img')

        img.setAttribute('src', url[i])
        img.setAttribute('title', masterpieces.artObjects[i].title)
        img.setAttribute('width', setWidth)
        img.setAttribute('height', setHeight)

        figureCaption.innerHTML = masterpieces.artObjects[i].title

        figure.appendChild(img)
        figure.appendChild(figureCaption)

        content.appendChild(figure)
    }
}

function cleanField(){ //limpa o conteúdo
    btnSearch.disabled = true
    btnMakersList.disabled = true
    content.innerHTML = ''
    btnMaker.innerHTML = ''
    getMuseum()
}

function changeColor(){ //muda as cores das letras do título
    for(let i = 0; i < titleSpan.length; i++){
        var color = Math.floor(Math.random() * colors.length)
        titleSpan[i].style.color = colors[color]
        colors.splice(color, 1)
    }
}
