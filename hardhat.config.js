require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString()

const projectId = "b9800a14fba64600a36aafee61e7c54d"

module.exports = {
  networks:{
    hardhat: {
      chainId: 1337,
      
    },
    mumbai: {
      url : `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${projectId}`,
      accounts: [privateKey]
    }
  },

  solidity: "0.8.4",
};
