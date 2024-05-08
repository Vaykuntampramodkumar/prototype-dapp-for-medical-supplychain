// Update with your contract address and ABI
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

    // Load existing medicines
    loadMedicines();
});

async function loadMedicines() {
    const medicineCount = await contractInstance.methods.medicineCount().call();
    const medicinesList = document.getElementById('medicinesList');

    for (let i = 1; i <= medicineCount; i++) {
        const medicine = await contractInstance.methods.medicines(i).call();
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${medicine.id} | Name: ${medicine.name} | Manufacturer: ${medicine.manufacturer}`;
        medicinesList.appendChild(listItem);
    }
}

async function addMedicine() {
    const medicineName = document.getElementById('medicineName').value;

    if (medicineName.trim() === '') {
        alert('Please enter a valid medicine name.');
        return;
    }
	document.getElementById('loadingCar').style.display = 'block';

    try {
        const accounts = await web3.eth.getAccounts();
        await contractInstance.methods.addMedicine(medicineName).send({ from: accounts[0] });
        alert('Medicine added successfully!');
        location.reload();
    } catch (error) {
        console.error('Error adding medicine:', error);
        alert('Failed to add medicine. Check the console for details.');
    }
}
function redirectToOrderPage() {
    // Redirect to the order page (replace 'order.html' with your desired order page URL)
    window.location.href = 'web2.html';
}