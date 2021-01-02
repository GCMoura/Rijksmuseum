const key = require('./config/config')

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

var masterpieces = ''
var page = 1
var count = 0
var search = '' 

var images = ['first', 'second', 'third']
var position = 0

var carousel = document.querySelector('.carousel')
var viewWidth = carousel.offsetWidth
var arrowRight = document.querySelector('#arrow-right')
var arrowLeft = document.querySelector('#arrow-left')

arrowLeft.addEventListener('click', carouselLeft)
arrowRight.addEventListener('click', carouselRight)

content.style.display = 'none'

btnSearch.addEventListener('click', getSetByMakerAndArt) //botão de pesquisa

cleaner.addEventListener('click', cleanField) //botão para limpar a pesquisa
changeColor()

async function getSetByMakerAndArt(){ //acessa a API e retorna as obras relacionadas ao termo pesquisado

    search = input.value //pega o valor da pesquisa

    const url = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&q=${search}&ps=100&p=${page}`

    const res = await fetch(url)

    if(res.status !== 200){
        const message = 'O servidor não respondeu. Por favor, refaça sua pesquisa.'
        showAlert(message, 'danger')
    }
   
    masterpieces = await res.json()

    if(!masterpieces){
        const message = 'O servidor não respondeu. Por favor, refaça sua pesquisa.'
        showAlert(message, 'danger')
    }
    
    for(let i = 0; i < masterpieces.artObjects.length; i++){
        var id = masterpieces.artObjects[i].id.split('-')
        if(id[1] === 'SK'){
            if(masterpieces.artObjects[i].principalOrFirstMaker !== "anonymous"){
                createSetButton(
                    masterpieces.artObjects[i].title, 
                    masterpieces.artObjects[i].principalOrFirstMaker, 
                    masterpieces.artObjects[i].objectNumber
                )
                carousel.style.opacity = 0
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
            showAlert(message, 'success')
            cleanField()
        }
    }
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

    const url = `https://www.rijksmuseum.nl/api/en/collection/${objNumber}/tiles?key=${key}`

    const res = await fetch(url)
   
    masterpieces = await res.json()

    if(!masterpieces){
        const message = 'O servidor não respondeu. Por favor, refaça sua pesquisa.'
        showAlert(message, 'danger')
    }
    
    var level = masterpieces.levels.length - 2
    var size = 'z' + level.toString()

    for(let i = 0; i < masterpieces.levels.length; i++){
        if(masterpieces.levels[i].name === size){
            showSet(title, masterpieces.levels[i])
        }
    }     
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
    carousel.style.opacity = 1
    count = 0
}

function changeColor(){ //muda as cores das letras do título
    for(let i = 0; i < titleSpan.length; i++){
        var color = Math.floor(Math.random() * colors.length)
        titleSpan[i].style.color = colors[color]
        colors.splice(color, 1)
    }
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
    
    if(classType === 'danger'){
        window.location.reload()
    }
}

function carouselLeft(){
    if(position === 0){
        document.querySelector(`#${images[position]}`).style.transform = `translateX(-${viewWidth}px)` //first
        document.querySelector(`#${images[position+1]}`).style.transform = `translateX(-${viewWidth}px)` //second
        position = 1
    } else if(position === 1){
        document.querySelector(`#${images[position]}`).style.transform = `translateX(-${viewWidth*2}px)` //second
        document.querySelector(`#${images[position+1]}`).style.transform = `translateX(-${viewWidth*2}px)` //third
        position = 2
    } else if(position === 2){
        document.querySelector(`#${images[position]}`).style.transform = `translateX(-${viewWidth*3}px)` //third
        document.querySelector(`#${images[0]}`).style.transform = `translateX(0px)` //first
        position = 0
    }
}
function carouselRight(){
    if(position === 0){
        document.querySelector(`#${images[position]}`).style.transform = `translateX(${viewWidth}px)` //first
        document.querySelector(`#${images[position+1]}`).style.transform = `translateX(-${viewWidth}px)` //second
        position = 1
    } else if(position === 1){
        document.querySelector(`#${images[position]}`).style.transform = `translateX(${viewWidth*2}px)` //second
        document.querySelector(`#${images[position+1]}`).style.transform = `translateX(-${viewWidth*2}px)` //third
        position = 2
    } else if(position === 2){
        document.querySelector(`#${images[position]}`).style.transform = `translateX(${viewWidth*3}px)` //third
        document.querySelector(`#${images[0]}`).style.transform = `translateX(0px)` //first
        position = 0
    }
}