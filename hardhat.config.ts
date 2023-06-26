import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-ethers";
import "solidity-coverage";

dotenv.config();
const privateKey= process.env.PRIVATE_KEY;
const urlSepo= process.env.DEPLOY_KEY_SEPOLIA;
const urlGoerli=process.env.DEPLOY_KEY_GOERLI;
const etherscanKey= process.env.ETHERSCAN_API_KEY;

let deploySepolia: Array<string>= new  Array<string>();
process.env.DEPLOY_ACC_SEPOLIA!=null? deploySepolia.push(process.env.DEPLOY_ACC_SEPOLIA) : deploySepolia;
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version:"0.8.4",
    settings: {
      optimizer: {enabled: process.env.DEBUG ? false : true},
    }
  },
    networks: {
      hardhat: {
        chainId: 1337,
      },
      sepolia: {
        url: urlSepo,
        accounts: [`0x${privateKey}`],
      },
      goerli: {
        url: urlGoerli,
        accounts: [`0x${privateKey}`],
      },
    
      localhost: {
      accounts:process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      url: "http://127.0.0.1:8545"
    }
  },
  
  etherscan:{
    apiKey:etherscanKey
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

};

export default config;
