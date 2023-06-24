import { ethers } from "hardhat";

async function main() {
    const NFTFactory = await ethers.getContractFactory("NFTFactory");
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
