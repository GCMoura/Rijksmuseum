# Rijksmuseum
This application aims to promote access to masterpieces, especially paintings, from the Rijksmuseum of Amsterdam in the Netherlands.

## Table of Contents
- [Rijksmuseum](#rijksmuseum)
  - [Table of Contents](#table-of-contents)
  - [Screenshots (mobile layout)](#screenshots-mobile-layout)
  - [Getting Started](#getting-started)
  - [How it works](#how-it-works)
  - [API](#api)
  - [Clone](#clone)
  - [Deploy](#deploy)
  - [Contributing](#contributing)
  - [License](#license)

## Screenshots (mobile layout)
![Screenshot-1](https://raw.githubusercontent.com/GCMoura/Rijksmuseum/master/screenshots/screenshot-1.png)
![Screenshot-2](https://raw.githubusercontent.com/GCMoura/Rijksmuseum/master/screenshots/screenshot-2.png)

## Getting Started
This page was created using only Vanilla Javascript, without frameworks or libraries, therefore for visualizing this page access:

[Rijksmuseum](https://gcmoura.github.io/Rijksmuseum/)

## How it works
In the input, put a keyword, that can be a simple word or the name of the artist. 
The 'Buscar' button provides a list with the masterpieces with some relationship with the keyword.
When clicking in the art chosen the masterpiece is shown. 
The 'X' button returns to the list of masterpieces.
The 'Limpar' button cleans the input field and the previous results and let the application ready for the next search.

## API
This application uses APIs available in [Rijksmuseum data](https://data.rijksmuseum.nl/). 
These data services provide access to object metadata, bibliographic data, controlled vocabularies, and content generated from users.
For use is necessary to obtain an API key by registering for a [Rijksstudio account](https://www.rijksmuseum.nl/en/rijksstudio).

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
Clone this repository to your local machine using https://github.com/GCMoura/Rijksmuseum.git.

## Deploy
The backend was deployed using [Heroku](https://heroku.com). And the frontend was deployed using [GitHub Pages](https://pages.github.com/).

## Contributing
If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
Made by Gabriel Moura. [Get in touch!](https://www.linkedin.com/in/gabriel-moura-b45b90150/)