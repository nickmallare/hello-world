const { AlchemyProvider } = require("@ethersproject/providers");
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

//provider: this gives us read access to the blockchain
const alechemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

//signed : this takes the gas fees aka me
const signer = new ethers.Wallet(PRIVATE_KEY, alechemyProvider);

//contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();

    console.log(`Message is: ${message}`);

    console.log("updating the message ")
    const tx = await helloWorldContract.update("new message!!!");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log(`Updated message is ${newMessage}`);
}   

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }); 