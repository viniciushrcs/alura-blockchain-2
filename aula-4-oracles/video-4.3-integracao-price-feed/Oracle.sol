// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
// https://docs.chain.link/data-feeds/price-feeds/addresses?network=polygon&page=1

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Amoy
     * Aggregator: ETH/USD
     * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0xe7656e23fE8077D438aEfbec2fAbDf2D8e070C4f);
    }

    /**
     * Retorna o último preço ETH/USD
     */
    function getLatestPrice() public view returns (int256) {
        (
            ,
            int256 price,
            ,
            ,

        ) = priceFeed.latestRoundData();
        return price;
    }
}
