const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('nftFactory', () => {
  let nftFactory: { deployed: () => any; mint: (arg0: string) => any; ownerOf: (arg0: any) => any; tokenURI: (arg0: any) => any; };

  beforeEach(async () => {
    const NFTFactory = await ethers.getContractFactory('nftFactory');
    nftFactory = await NFTFactory.deploy();
    await nftFactory.deployed();
  });

  it('should mint a new NFT and set the token URI', async () => {
    const baseURI = `https://gateway.pinata.cloud/ipfs/QmTmPBfgJfsYDXu3Ro8b3Mc9FWASo1RcE2A8sQU8UjA78Y/`;
    const tx = await nftFactory.mint(baseURI);
    const receipt = await tx.wait();
    const event = receipt.events.find((event: { event: string; }) => event.event === 'CreatedNFT');
    const tokenId = event.args.tokenId;
    const tokenURI = baseURI+tokenId+'.json'
    expect(await nftFactory.ownerOf(tokenId)).to.equal(await ethers.provider.getSigner().getAddress());
    expect(await nftFactory.tokenURI(tokenId)).to.equal(tokenURI);

  });

  it('should increment token IDs correctly', async () => {
    const baseURI = 'https://gateway.pinata.cloud/ipfs/QmTmPBfgJfsYDXu3Ro8b3Mc9FWASo1RcE2A8sQU8UjA78Y/';

    const transaction1 = await nftFactory.mint(baseURI);
    const transaction2 = await nftFactory.mint(baseURI);
    const event1 = await transaction1.wait();
    const event2 = await transaction2.wait();
    // Retrieve the token ID from the events emitted during the minting process
    const tokenId1 = event1.events.find((event: { event: string; }) => event.event === 'CreatedNFT').args.tokenId;
    console.log(tokenId1);
    const tokenId2 = event2.events.find((event: { event: string; }) => event.event === 'CreatedNFT').args.tokenId;
    console.log(tokenId2)
    expect(tokenId2).to.equal(Number(tokenId1)+1);
  });
});
  
