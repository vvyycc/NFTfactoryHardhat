// SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract nftFactory is ERC721URIStorage {
    string constant BASE_URI = "https://ipfs.io/ipfs/QmQE1FzbGqJbqwm82GCPZGMFUWUBnyCiiJpGY3nJjVgKyu/";
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event CreatedNFT(uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("My NFT Collection", "MNC") {
        uint256 numberOfNFTs = 7;
        for (uint256 i = 0; i < numberOfNFTs; i++) {
          _tokenIds.increment(); // Start from token ID 1
            _safeMint(msg.sender, _tokenIds.current());
            _setTokenURI(_tokenIds.current(), string(abi.encodePacked("https://ipfs.io/ipfs/QmQE1FzbGqJbqwm82GCPZGMFUWUBnyCiiJpGY3nJjVgKyu/", i,".json")));

            
                }
    }

    function mint(string memory _tokenURI) public returns (uint256) {
        uint256 newItemId =  _tokenIds.current() + 1;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        emit CreatedNFT(newItemId, _tokenURI);
        _tokenIds.increment();

        return newItemId;
    }

      function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        // Always return the baseURI regardless of tokenId
            return string(
            abi.encodePacked(
                BASE_URI,
                Strings.toString(tokenId),".json"
            )
        );
    }
}