var content = document.querySelector('.content')

var input = document.querySelector('.input')
var btn = document.querySelector('.btn')
var limpar = document.querySelector('.btn-limpar')
var masterpieces = ''

const key = 'dMnRKstP'

var search = input.value

btn.addEventListener('click', getMaker)

limpar.addEventListener('click', () => {
    content.innerHTML = ''
})

getMuseum()

async function getMuseum() {

    //const url2 = `http://www.rijksmuseum.nl/api/oai/${key}?verb=ListRecords`
    
    const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${key}&involvedMaker=${search}` 

    const res = await fetch(url)
   
    masterpieces = await res.json()

    console.log(masterpieces)
}

function getMaker(){
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

    if(makers.length === 1) { //se a pesquisa retornar apenas um pintor, segue para a função de mostrar a arte
        getSets(makers[0]) 
    } else { //para mais de um pintor com o nome da pesquisa, cria um botão para cada e chama a função do pintor selecionado
        for(let i = 0; i < makers.length; i++){
            var button = document.createElement('button')
            button.classList.add('btn-maker')
            button.innerHTML = makers[i]
            content.appendChild(button)
        }
        var buttons = document.querySelectorAll('.btn-maker')

        buttons.forEach(button => {
            button.addEventListener('click', function(){getSets(button.firstChild.data)})
        })
    }

    input.value = '' //limpa o campo de pesquisa
}

async function getSets(maker){
    console.log(maker)
    const urlMaker = `https://www.rijksmuseum.nl/api/nl/collection?key=${key}&involvedMaker=${maker}`

    const res = await fetch(urlMaker)

    masterpieces = await res.json()

    console.log(masterpieces)
    
    var url = []
    var width = []
    var height = []

    for(let i = 0; i < masterpieces.artObjects.length; i++){
        if(masterpieces.artObjects[i].hasImage === true){
            console.log(masterpieces.artObjects[i].webImage.url)
            url.push(masterpieces.artObjects[i].webImage.url) //colocando em um array as obras de arte do artista
            width.push(masterpieces.artObjects[i].webImage.width) // as larguras
            height.push(masterpieces.artObjects[i].webImage.height) // as alturas
        }
    }

    for(let i = 0; i < url.length; i++){ //percorre o array de obras de arte para criar uma imagem com cada uma

        var width = width[i] / 8 //mantem a proporção original da largura

        var height = height[i] / 8 //mantem a proporção original da altura

        var figure = document.createElement('figure')

        var figureCaption = document.createElement('figcaption')

        var img = document.createElement('img')

        img.setAttribute('src', url[i])
        img.setAttribute('title', masterpieces.artObjects[i].title)
        img.setAttribute('width', width)
        img.setAttribute('height', height)

        figureCaption.innerHTML = masterpieces.artObjects[i].title

        figure.appendChild(img)
        figure.appendChild(figureCaption)

        content.appendChild(figure)
    }
}

