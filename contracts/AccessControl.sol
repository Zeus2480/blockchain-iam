// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IdentityRegistration.sol";

contract AccessControl {
    IdentityRegistration public identityRegistration;
    mapping(address => bool) public authorizedPatients;

    event AccessGranted(address patient);
    event AccessRevoked(address patient);

    constructor(IdentityRegistration _identityRegistration){
        identityRegistration = _identityRegistration;
    }
    
    function grantAccess(address _patientAddress) public {
        authorizedPatients[_patientAddress] = true;
        emit AccessGranted(_patientAddress);
    }

    function revokeAccess(address _patientAddress) public {
        authorizedPatients[_patientAddress] = false;
        emit AccessRevoked(_patientAddress);
    }

    function hasAccess(address _patientAddress) external view returns (bool) {
        (, , , bool isVerified) = identityRegistration.identities(_patientAddress);
        return isVerified && authorizedPatients[_patientAddress];
    }
}
