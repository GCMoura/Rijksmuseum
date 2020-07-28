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
var cleaner = document.querySelector('.btn-limpar')
//var btnMakersList = document.querySelector('.makers-list button')
var btnMaker = document.querySelector('.button-maker')
var content = document.querySelector('.content') 

var titleSpan = document.querySelectorAll('.title span')
var contentSpan = document.querySelectorAll('.content span')

var title = document.querySelector('.title')

var masterpieces = ''
const key = 'dMnRKstP'
var page = 1

var search = '' 

var title = []
var maker = []

btnSearch.addEventListener('click', getSetByMakerAndArt) //botão de pesquisa

cleaner.addEventListener('click', cleanField) //botão para limpar a pesquisa

//btnMakersList.addEventListener('click', makersList) //botão com a lista de pintores

//getMuseum()
changeColor()

// async function getMuseum() { //faz a consulta à API do museu
    
//     //const url = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&involvedMaker=${search}&ps=100` //pesquisa por nome do pintor
//     //const url = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&q=${search}&ps=100`  //pesquisa por termo de busca

//     const url = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&q=${search}&ps=100&p=${page}`

//     const res = await fetch(url)
   
//     masterpieces = await res.json()

//     btnSearch.disabled = false
//     btnMakersList.disabled = false
    
//     console.log(masterpieces)
//     console.log('total de obras: ', masterpieces.count)
//     console.log('pintor: ', masterpieces.artObjects[2].principalOrFirstMaker)
//     console.log('titulo: ', masterpieces.artObjects[2].title)
//     console.log('imagem: ', masterpieces.artObjects[2].webImage.url)
//     console.log('imagem: ', masterpieces.artObjects[2])



//     if(masterpieces.artObjects.length === 0){ //o retorno do fetch foi vazio
//         location.reload() //reload a página
//     }
// }

// function makersList(){ //cria a lista de botões com todos os pintores

//     var makersArray = masterpieces.facets[0].facets

//     for(let i = 0; i < makersArray.length; i++){
//         var button = document.createElement('button')
//         button.classList.add('btn-maker')
//         if(makersArray[i].key !== 'anonymous' && makersArray[i].key !== 'unknown') {
//             button.innerHTML = makersArray[i].key
//             btnMaker.appendChild(button)
//         }
//     }
//     var buttons = document.querySelectorAll('.btn-maker')

//     buttons.forEach(button => {
//         button.addEventListener('click', function(){getSets(button.firstChild.data)})
//     }) 
// }

async function getSetByMakerAndArt(){

    search = input.value //pega o valor da pesquisa

    const url = `https://www.rijksmuseum.nl/api/en/collection?key=${key}&q=${search}&ps=100&p=${page}`

    const res = await fetch(url)
   
    masterpieces = await res.json()
    
    console.log(masterpieces)

    var count = 1

    for(let i = 0; i < masterpieces.artObjects.length; i++){
        var id = masterpieces.artObjects[i].id.split('-')
        if(id[1] === 'SK' ){
            if(masterpieces.artObjects[i].principalOrFirstMaker !== "anonymous"){
                createSetButton(masterpieces.artObjects[i].title, masterpieces.artObjects[i].principalOrFirstMaker, masterpieces.artObjects[i].objectNumber)
                count++
            }
        }
    }

    page++
    if(page <= Math.floor(masterpieces.count / 100 + 1)){
        getSetByMakerAndArt()
    }
}

function createSetButton(title, maker, objNumber){
    var button = document.createElement('button')
    button.classList.add('btn-maker')
    button.innerHTML = `${title} - ${maker}`
    btnMaker.appendChild(button)

    button.addEventListener('click', function(){getSetByAPI(title, objNumber)})
}

async function getSetByAPI(title, objNumber){

    const url = `https://www.rijksmuseum.nl/api/en/collection/${objNumber}/tiles?key=${key}`

    const res = await fetch(url)
   
    masterpieces = await res.json()
    
    console.log(masterpieces.levels[4])
    showSet(title, masterpieces.levels[4])
}

// function getMaker(){ //faz a consulta pelo input, criando botões com o resultado
//     btnMaker.innerHTML = ''

//     var makers = [] //para verificar se existe mais de uma obra com o mesmo nome

//     search = input.value //pega o valor da pesquisa

//     const array = masterpieces.facets[0].facets //array com todos os pintores

//     for(let i = 0; i < array.length; i++){

//         var pintor = array[i].key.split(' ')

//         for(let j = 0; j < pintor.length; j++){
//             if (search.toLowerCase() === pintor[j].toLowerCase()){ //verifica se o nome pesquisado se refere a algum pintor
//                 makers.push(array[i].key) //adiciona o pintor no array
//             }
//         }   
//     }

//     //cria um botão para cada e chama a função do pintor selecionado
//     for(let i = 0; i < makers.length; i++){
//         var button = document.createElement('button')
//         button.classList.add('btn-maker')
//         button.innerHTML = makers[i]
//         btnMaker.appendChild(button)
//     }
//     var buttons = document.querySelectorAll('.btn-maker')

//     buttons.forEach(button => {
//         button.addEventListener('click', function(){getSets(button.firstChild.data)})
//     })
    
//     input.value = '' //limpa o campo de pesquisa
// }

function showSet(title, set){ //faz nova pesquisa à API, agora com o termo específico do pintor

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

    figure.appendChild(img)
    figure.appendChild(figureCaption)

    content.appendChild(figure)
    
}

function cleanField(){ //limpa o conteúdo
    input.value = ''
    content.innerHTML = ''
    btnMaker.innerHTML = ''
}

function changeColor(){ //muda as cores das letras do título
    for(let i = 0; i < titleSpan.length; i++){
        var color = Math.floor(Math.random() * colors.length)
        titleSpan[i].style.color = colors[color]
        colors.splice(color, 1)
    }
}
