const { Web3 } = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const compiledFactory  = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'virtual enrich present soldier sense cheap strategy armed animal denial net suggest',
    'https://opt-sepolia.g.alchemy.com/v2/ZfW5FmNeK1qY_Ic1wllZyxrhkYtF7pW1'
);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Attempting to deploy from account:", accounts[0]);
        
        const result = await new web3.eth.Contract(compiledFactory.abi)
            .deploy({ data: compiledFactory.evm.bytecode.object })
            .send({ from: accounts[0], gasPrice: '5000000000', gas: 2000000 }); // Adjust gasPrice and gas limit as needed
        
        console.log('Contract deployed at:', result.options.address);
        provider.engine.stop();
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

deploy();
