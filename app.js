const BASE_URL = window.location.hostname.includes('localhost')
? 'http://localhost:5000'
: 'http://localhost:5000'
//: 'https://seek-movie.herokuapp.com'

var colors = [
    '#purple', //roxo
    '#fc4a1a', //laranja
    '#685f37', //acre
    '#820c0f', //vinho
    'red', //vermelho
    '#18121e', //navyblue
    '#e37222', //laranja
    '#0e0b16', //preto
    '#15273d', //azul
    '#0375b4', //azul
    '#115300' //verde
]
var header = document.querySelector('.header')
var input = document.querySelector('.input')
var btnSearch = document.querySelector('.btn')
var cleaner = document.querySelector('.btn-limpar')
var btnMaker = document.querySelector('.button-maker')
var content = document.querySelector('.content') 

var titleSpan = document.querySelectorAll('.title span')
var contentSpan = document.querySelectorAll('.content span')
var title = document.querySelector('.title')
var cover = document.querySelector('.cover')
var description = document.querySelector('.description')

var masterpieces = ''
var page = 1
var count = 0
var search = '' 

var artist = ['vincent van gogh', 'rembrandt van rijn', 'johannes vermeer']

content.style.display = 'none'

btnSearch.addEventListener('click', getSetByMakerAndArt) //botão de pesquisa

cleaner.addEventListener('click', cleanField) //botão para limpar a pesquisa
changeColor()
changeLandingCover()

async function getSetByMakerAndArt(){ //acessa a API e retorna as obras relacionadas ao termo pesquisado
    
    search = input.value //pega o valor da pesquisa
    var response

    fetch(`${BASE_URL}/${search}/${page}`, {
        method: 'GET',
        params: {
            search,
            page
        }
      })
      .then(async (serverResponse) => {
        if (serverResponse) {
            response = await serverResponse.json();

            masterpieces = response

            for(let i = 0; i < masterpieces.artObjects.length; i++){
                var id = masterpieces.artObjects[i].id.split('-')
                if(id[1] === 'SK'){
                    if(masterpieces.artObjects[i].principalOrFirstMaker !== "anonymous"){
                        createSetButton(
                            masterpieces.artObjects[i].title, 
                            masterpieces.artObjects[i].principalOrFirstMaker, 
                            masterpieces.artObjects[i].objectNumber
                        )
                        count++
                    }
                } 
            }

            page++
            if(page <= Math.floor(masterpieces.count / 100 + 1)){
                getSetByMakerAndArt()
            } else {
                page = 1
                if(count === 0){ 
                    const message = 'Não há obra de arte com o termo pesquisado. Por favor, refaça sua pesquisa.'
                    showAlert(message, 'danger')
                    cleanField()
                }
            }
          } 
        });
}

function createSetButton(title, maker, objNumber){ //cria os botões com as obras encontradas de acordo com o termo pesquisado

    var button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.classList.add('btn-maker')
    button.innerHTML = `${title} - ${maker}`
    btnMaker.appendChild(button)

    button.addEventListener('click', function(){getSetByAPI(title, objNumber)})
}

async function getSetByAPI(title, objNumber){ //faz nova consulta a API retornando a obra selecionada

    var response

    fetch(`${BASE_URL}/${objNumber}`, {
        method: 'GET',
        params: {
            objNumber
        }
      })
      .then(async (serverResponse) => {
        if (serverResponse) {
            response = await serverResponse.json();

            masterpieces = response
        
            var level = masterpieces.levels.length - 2
            var size = 'z' + level.toString()
        
            for(let i = 0; i < masterpieces.levels.length; i++){
                if(masterpieces.levels[i].name === size){
                    showSet(title, masterpieces.levels[i])
                }
            }     
        }
    })
}

function showSet(title, set){ //estiliza a imagem a ser mostrada na tela
    content.innerHTML = ''
    content.style.display = 'block'
    btnMaker.style.display = 'none'

    var setWidth
    var setHeight

    if(set.width > 360){
        setWidth = '100%'
    } else {
        setWidth = set.width //mantem a proporção original da largura
    }

    if(set.height > 400){
        setHeight = 400
    } else {
        setHeight = set.height //mantem a proporção original da altura
    }

    var figure = document.createElement('figure')

    figure.classList.add('figure-style')

    var figureCaption = document.createElement('figcaption')

    figureCaption.classList.add('figure-caption-style')

    var img = document.createElement('img')

    img.setAttribute('src', set.tiles[0].url)
    img.setAttribute('title', title)
    img.setAttribute('width', setWidth)
    img.setAttribute('height', setHeight)

    figureCaption.innerHTML = title

    var buttonClose = document.createElement('button')

    buttonClose.classList.add('btn')
    buttonClose.classList.add('btn-danger')
    buttonClose.classList.add('btn-close')
    buttonClose.innerHTML = 'X'

    buttonClose.addEventListener('click', () => {
        content.style.display = 'none'
        btnMaker.style.display = 'block'
        btnMaker.style.display = 'flex'
    })

    figureCaption.appendChild(buttonClose)

    figure.appendChild(img)
    figure.appendChild(figureCaption)

    content.appendChild(figure)
    
}

function cleanField(){ //limpa o conteúdo
    input.value = ''
    content.innerHTML = ''
    btnMaker.innerHTML = ''
    content.style.display = 'none'
    count = 0
}

function changeColor(){ //muda as cores das letras do título
    for(let i = 0; i < titleSpan.length; i++){
        var color = Math.floor(Math.random() * colors.length)
        titleSpan[i].style.color = colors[color]
        colors.splice(color, 1)
    }
}

async function changeLandingCover(){ //muda a obra de arte da página principal
    var artistNumber = Math.floor(Math.random() * artist.length)
    var flag = true
    var chosenArtist = artist[artistNumber]
    var response

    fetch(`${BASE_URL}/${chosenArtist}/${flag}/${page}`, {
        method: 'GET',
        params: {
            chosenArtist,
            page
        }
      })
      .then(async (serverResponse) => {
        if (serverResponse) {
            response = await serverResponse.json();

            masterpieces = response

            console.log(masterpieces)

            var urlImage = masterpieces.artObjects[0].webImage.url
            var title = masterpieces.artObjects[0].longTitle

            cover.style.backgroundImage = `url("${urlImage}")`
            description.innerHTML = `${title}`
        }
    })
}


function showAlert(message, classType) {
    const div = document.createElement('div')

    div.className = `alert alert-${classType}`
    
    div.appendChild(document.createTextNode(message))

    title.style.display = 'none'

    header.appendChild(div)

    setTimeout(() => {
        title.style.display = 'block'
        document.querySelector('.alert').remove()
    }, 3000);    

}
