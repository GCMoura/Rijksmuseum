# Rijksmuseum
This application aims to promote access to masterpieces, especially paintings, from the Rijksmuseum of Amsterdam in the Netherlands.

## Table of Contents
- [Rijksmuseum](#rijksmuseum)
  - [Table of Contents](#table-of-contents)
  - [Screenshots (mobile layout)](#screenshots-mobile-layout)
  - [Getting Started](#getting-started)
  - [API](#api)
  - [Clone](#clone)
  - [Deploy](#deploy)
  - [Contributing](#contributing)
  - [License](#license)

## Screenshots (mobile layout)
![Screenshot-1](users/gabriel/desktop/github/Rijksmuseum/screenshots/img-1.png?raw=true)

## Getting Started
This page was created using only Vanilla Javascript, without frameworks or libraries, therefore for visualizing this page access:

https://rijksmuseum-amsterdam.vercel.app/

## API
This application uses APIs available in [Rijksmuseum data](https://data.rijksmuseum.nl/). 
These data services provide access to object metadata, bibliographic data, controlled vocabularies, and content generated from users.
It is necessary to obtain an API key by registering for a [Rijksstudio account](https://www.rijksmuseum.nl/en/rijksstudio).

- ### Examples
  * To search for a keyword:
  ```
  https://www.rijksmuseum.nl/api/en/collection?key=[api-key]&q=[keyword]&ps=100&p=[page]
  ```
  * To search for a specific masterpiece:
  ```
  https://www.rijksmuseum.nl/api/en/collection/[masterpiece code]/tiles?key=[api-key]
  ```

## Clone
Clone this repository to yout local machine using https://github.com/GCMoura/Rijksmuseum.git.

## Deploy
This application was deployed using [Vercel](https://vercel.com/).

## Contributing
If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
