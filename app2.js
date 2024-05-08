// Replace with your contract address and ABI
const contractAddress = '0x046F540Ef9245aB3d03A9484af1b507FcABD4852';
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

let web3;
let contractInstance;

window.addEventListener('load', async () => {
    // Modern dapp browsers
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            await window.ethereum.enable();
            contractInstance = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("User denied account access or other error occurred.");
        }
    } else {
        console.error("No Ethereum provider detected. Install MetaMask or use a dapp browser.");
    }
});
async function placeOrder() {
    const medicineId = document.getElementById('medicineId').value;

    if (!medicineId) {
        alert('Please enter a valid medicine ID.');
        return;
    }

    try {
        const medicine = await contractInstance.methods.medicines(medicineId).call();

        if (!medicine.isAvailable) {
            alert('Order not placed. Medicine not available.');
            return;
        }

        // Place order logic goes here
        // You can implement the order placement functionality as per your requirement
        
        alert('Order placed successfully. Medicine is available.');
    } catch (error) {
        console.error('Error placing order:', error);
        alert('Failed to place order. Check the console for error.');
    }
}

// No changes to getMedicineDetails() function


async function getMedicineDetails() {
    const medicineId = document.getElementById('medicineId').value;

    if (!medicineId) {
        alert('Please enter a valid medicine ID.');
        return;
    }

    try {
        const medicine = await contractInstance.methods.medicines(medicineId).call();

        if (!medicine.name) {
            alert('Medicine not found.');
            return;
        }

        const medicineInfo = `ID: ${medicine.id}<br>
                              Name: ${medicine.name}<br>
                              Manufacturer: ${medicine.manufacturer}<br>
                              Distributor: ${medicine.distributor}<br>
                              Retailer: ${medicine.retailer}<br>
                              Available: ${medicine.isAvailable ? 'Yes' : 'No'}<br>`;

        document.getElementById('medicineInfo').innerHTML = medicineInfo;
    } catch (error) {
        console.error('Error fetching medicine details:', error);
        alert('Failed to fetch medicine details. Check the console for error.');
    }
}
