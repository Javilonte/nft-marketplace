# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

## Installation

```shell
npm install
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

## Dependencies of the project

This project is currently using a React template so it's using a lot of packages that maybe won't be used in the future.

Project packages:

```
@nomiclabs/hardhat-ethers
@nomiclabs/hardhat-waffle
@openzeppelin/contracts
alpinejs
axios
chai
ethereum-waffle
ethers
hardhat
ipfs-http-client
next
react
react-dom
web3modal
```

Template Packages:

```

@tim-soft/react-spring-web
bootstrap
cra-template
elegant-icons
emailjs-com
et-line
font-awesome
react-awesome-reveal
react-bootstrap
react-cool-onclickoutside
react-redux
react-scripts
react-select
react-slick
react-socks
react-spring-lightbox
react-tsparticles
redux-thunk
reselect
sass
slick-carousel
styled-components
typesafe-actions
web-vitals

```

## Pages structure

The project has many pages, the main pages that have the features required and all the template pages. All related with the template was put into the route `/template/` and the others pages are at the root level.

Pages tree:

```
pages
├── api
│   └── hello.js
├── _app.js
├── assets.js
├── create-item.js
├── create.js
├── creator-dashboard.js
├── dashboard.js
├── index.js
├── my-assets.js
└── template
    ├── accordion.js
    ├── activity.js
    ├── alerts.js
    ├── Auction.js
    ├── Author.js
    ├── colection.js
    ├── contact.js
    ├── create2.js
    ├── create3.js
    ├── create.js
    ├── createOptions.js
    ├── elegantIcons.js
    ├── etlineIcons.js
    ├── explore2.js
    ├── explore.js
    ├── fontAwesomeIcons.js
    ├── fontAwesomeIcons.js~
    ├── helpcenter.js
    ├── home1.js
    ├── home2.js
    ├── home3.js
    ├── home.js
    ├── ItemDetail.js
    ├── ItemDetailRedux.js
    ├── login.js
    ├── loginTwo.js
    ├── news.js
    ├── price.js
    ├── progressbar.js
    ├── rangking.js
    ├── RankingRedux.js
    ├── register.js
    ├── tabs.js
    ├── wallet.js
    └── works.js
```
