// Initialize Web3
let web3;

if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // Request account access if needed
} else if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
} else {
    // Fallback to localhost; use development console port by default...
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Define the contract address and ABI
const contractAddress = '0x046F540Ef9245aB3d03A9484af1b507FcABD4852'; // Replace with the actual contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_distributor",
				"type": "address"
			}
		],
		"name": "distributeMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "manufacturer",
				"type": "address"
			}
		],
		"name": "MedicineAdded",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "medicineCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "medicines",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "manufacturer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "distributor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "retailer",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// Create an instance of the contract
const contract = new web3.eth.Contract(contractABI, contractAddress);


// Function to add a new medicine
function addMedicine() {
    const medicineName = document.getElementById('medicineName').value;
    const medicinePrice = document.getElementById('medicinePrice').value;

    contract.methods.addMedicine(medicineName, medicinePrice).send({ from: web3.eth.defaultAccount, gas: 3000000 }, function(error, transactionHash) {
        if (!error) {
            alert('Medicine added successfully!');
        } else {
            console.error(error);
            alert('Failed to add medicine.');
        }
    });
}
