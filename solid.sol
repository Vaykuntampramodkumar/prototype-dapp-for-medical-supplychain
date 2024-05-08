// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineSupplyChain {
    struct Medicine {
        uint id;
        string name;
        address manufacturer;
        address distributor;
        bool isAvailable;
    }

    mapping(uint => Medicine) public medicines;
    uint public medicineCount;

    event MedicineAdded(uint id, string name, address manufacturer);
    event MedicineDistributed(uint id, address distributor);

    function addMedicine(string memory _name) public {
        medicineCount++;
        medicines[medicineCount] = Medicine(medicineCount, _name, msg.sender, address(0), true);
        emit MedicineAdded(medicineCount, _name, msg.sender);
    }

    function distributeMedicine(uint _id, address _distributor) public {
        require(medicines[_id].isAvailable, "Medicine not available");
        require(msg.sender == medicines[_id].manufacturer, "Only manufacturer can distribute");

        medicines[_id].distributor = _distributor;
        medicines[_id].isAvailable = false; // Mark as distributed
        emit MedicineDistributed(_id, _distributor);
    }

    function getMedicine(uint _id) public view returns (
        uint id,
        string memory name,
        address manufacturer,
        address distributor,
        bool isAvailable
    ) {
        Medicine storage med = medicines[_id];
        return (med.id, med.name, med.manufacturer, med.distributor, med.isAvailable);
    }
}
