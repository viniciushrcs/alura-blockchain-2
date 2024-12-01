// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSale is Ownable {
    AggregatorV3Interface internal priceFeed;
    IERC20 public token;
    uint256 public tokensPerUsd;

    event TokensPurchased(address indexed buyer, uint256 amountSpent, uint256 tokensBought);

    /**
     * @param _tokenAddress Endereço do token ERC20 que está sendo vendido
     * @param _priceFeedAddress Endereço do AggregatorV3Interface para ETH/USD
     * @param _tokensPerUsd Quantidade de tokens que o comprador recebe por 1 USD
     */
    constructor(
        address _tokenAddress,
        address _priceFeedAddress,
        uint256 _tokensPerUsd
    ) {
        token = IERC20(_tokenAddress);
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
        tokensPerUsd = _tokensPerUsd;
    }

    /**
     * @notice Permite que os usuários comprem tokens enviando ETH
     */
    function buyTokens() external payable {
        require(msg.value > 0, "Envie ETH para comprar tokens");

        uint256 ethPriceInUsd = getLatestPrice();
        uint256 ethAmountInUsd = (msg.value * ethPriceInUsd) / 1e18;
        uint256 tokensToBuy = ethAmountInUsd * tokensPerUsd;

        require(token.balanceOf(address(this)) >= tokensToBuy, "Saldo insuficiente de tokens no contrato");

        token.transfer(msg.sender, tokensToBuy);

        emit TokensPurchased(msg.sender, msg.value, tokensToBuy);
    }

    /**
     * @notice Retorna o preço mais recente do ETH em USD
     * @return Preço do ETH em USD com 18 casas decimais
     */
    function getLatestPrice() public view returns (uint256) {
        (
            ,
            int256 price,
            ,
            ,

        ) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        return uint256(price) * 1e10; // Ajusta o preço para ter 18 casas decimais
    }

    /**
     * @notice Permite que o proprietário do contrato retire os ETH acumulados
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    /**
     * @notice Permite que o proprietário do contrato retire tokens ERC20 acumulados
     * @param _tokenAddress Endereço do token ERC20 a ser retirado
     */
    function withdrawTokens(address _tokenAddress) external onlyOwner {
        IERC20 _token = IERC20(_tokenAddress);
        _token.transfer(owner(), _token.balanceOf(address(this)));
    }
}
