var content = document.querySelector('.content')
var img = document.querySelector('.img')
var input = document.querySelector('.input')
var btn = document.querySelector('.btn')
var masterpieces = ''

btn.addEventListener('click', getMuseum)

async function getMuseum() {
    var search = input.value

    console.log(search)

    const key = 'dMnRKstP'
    
    const url2 = `http://www.rijksmuseum.nl/api/oai/${key}?verb=ListRecords&resumptionToken`
    const url3 = `https://www.rijksmuseum.nl/api/nl/collection?key=${key}&involvedMaker=${search}` 

    // Rembrandt+van+Rijn

    const res = await fetch(url3)
    masterpieces = await res.json()

    console.log(masterpieces)

    // var url = masterpieces.artObjects[0].webImage.url

    // img.setAttribute('src', url)
    // img.setAttribute('width', '600px')
    // img.setAttribute('height', '800px')

}

