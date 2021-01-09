const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const axios = require('axios')
const server = express()
const router = express.Router()

server.use(cors())
server.use(express.json({extend: true}))

dotenv.config()

const api_key = process.env.API_KEY
const port = process.env.PORT || 5000

router.get('/:search/:page', async (req, res) => {

  const { search } = req.params
  const { page } = req.params

  axios.get(`https://www.rijksmuseum.nl/api/en/collection?key=${api_key}&q=${search}&ps=100&p=${page}`)
    .then(response => {
      res.send(response.data)
    })
  
})

router.get('/:objNumber', (req, res) => {
  const { objNumber } = req.params

  axios.get(`https://www.rijksmuseum.nl/api/en/collection/${objNumber}/tiles?key=${api_key}`)
    .then(response => {
      res.send(response.data)
  })
})

server.use(router)

server.listen(port, () => {
  console.log(`Server working on port ${port}`)
})