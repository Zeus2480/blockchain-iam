require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x1d0f6bf2dabbd29ebe8d4cc2ecb7b3b5de808bad3e1d4e827d4e9c033cd913f3"] // Use one of Ganache’s generated accounts
    }
  }
};
