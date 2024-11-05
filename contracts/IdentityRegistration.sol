// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityRegistration {
    struct Identity{
        address patientAddress;
        string name;
        uint dateOfBirth;
        bool isVerified;
    }

    mapping(address => Identity) public identities;

    event IdentityRegistered(address indexed patientAddress, string name, uint dateOfBirth);

    function registerIdentity(string memory _name, uint _dateOfBirth) public {
        require(identities[msg.sender].patientAddress == address(0), "Identity already registered");
        identities[msg.sender] = Identity(msg.sender, _name, _dateOfBirth, false);
        emit IdentityRegistered(msg.sender, _name, _dateOfBirth);
    }

    function updateIdentityVerificationStatus(address _patientAddress, bool _isVerified) external {
        Identity storage identity = identities[_patientAddress];
        require(identity.patientAddress != address(0), "Identity not registered");
        identity.isVerified = _isVerified;
    }
}