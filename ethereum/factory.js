import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xb85e0d4B673BddEf5C8e9eFbCEFCDBA5bE476086'
);

export default instance;