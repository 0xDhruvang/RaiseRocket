const hre = require('hardhat');

async function main() {

    const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
    
    // Define a higher gas price
    const gasPrice = hre.ethers.utils.parseUnits('30', 'gwei'); // Set gas price to 30 Gwei

    const campaignFactory = await CampaignFactory.deploy({ gasPrice });

    await campaignFactory.deployed();

    console.log("Factory deployed to:", campaignFactory.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
