import { artifacts, ethers } from "hardhat";
async function main() {
    
    // Read the contract's ABI
  const abiContract = await artifacts.readArtifact("nftFactory");

  // Deploy the contract
  const NFTFactory = await ethers.getContractFactory(abiContract.abi, abiContract.bytecode);
  const nftFactory = await NFTFactory.deploy();
  await nftFactory.deployed();

  console.log("NFT Factory contract deployed to:", nftFactory.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
