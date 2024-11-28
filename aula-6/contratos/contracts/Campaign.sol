// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract Campaign {
    struct CampaignDetails {
        address creator;
        string title;
        string description;
        uint256 goal;
        uint256 totalContributed;
        bool completed;
    }

    mapping(uint256 => CampaignDetails) public campaigns;
    uint256 public campaignCount;

    address public multisigWallet; // Endereço do contrato MultisigWallet autorizado

    event CampaignCreated(
        uint256 indexed id,
        address indexed creator,
        string title,
        uint256 goal
    );

    event ContributionReceived(
        uint256 indexed id,
        address indexed contributor,
        uint256 amount
    );

    event FundsReleased(uint256 indexed id, uint256 amount, address indexed to);

    modifier onlyMultisig() {
        require(msg.sender == multisigWallet, "Caller is not the multisig wallet");
        _;
    }

    modifier onlyUnsetMultisig() {
        require(multisigWallet == address(0), "Multisig wallet already set");
        _;
    }

    /**
     * @dev Define o endereço da carteira multisig.
     * Pode ser chamado apenas uma vez para evitar alterações após a configuração inicial.
     * @param _multisigWallet Endereço da carteira multisig.
     */
    function setMultisigWallet(address _multisigWallet) external onlyUnsetMultisig {
        require(_multisigWallet != address(0), "Invalid multisig wallet address");
        multisigWallet = _multisigWallet;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _goal
    ) external {
        require(_goal > 0, "Goal must be greater than zero");

        campaignCount++;
        campaigns[campaignCount] = CampaignDetails({
            creator: msg.sender,
            title: _title,
            description: _description,
            goal: _goal,
            totalContributed: 0,
            completed: false
        });

        emit CampaignCreated(campaignCount, msg.sender, _title, _goal);
    }

    function contribute(uint256 _campaignId) external payable {
        CampaignDetails storage campaign = campaigns[_campaignId];
        require(msg.value > 0, "Contribution must be greater than zero");
        require(!campaign.completed, "Campaign is already completed");

        campaign.totalContributed += msg.value;

        emit ContributionReceived(_campaignId, msg.sender, msg.value);
    }

    function releaseFunds(uint256 _campaignId, address _to, uint256 _amount) external onlyMultisig {
        CampaignDetails storage campaign = campaigns[_campaignId];
        require(!campaign.completed, "Campaign is already completed");

        campaign.totalContributed -= _amount;
        campaign.completed = campaign.totalContributed == 0;

        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Transfer failed");

        emit FundsReleased(_campaignId, _amount, _to);
    }
}