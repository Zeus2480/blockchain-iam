// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IdentityRegistration.sol";

contract IdentityVerification {
    IdentityRegistration identityRegistrationContract;

    constructor(address _identityRegistrationContractAddress){
        identityRegistrationContract = IdentityRegistration(_identityRegistrationContractAddress);
    }

    event IdentityVerified(address indexed patientAddress);

    function verifyIdentity(address _patientAddress) public {
        identityRegistrationContract.updateIdentityVerificationStatus(_patientAddress, true);
        emit IdentityVerified(_patientAddress);
    }
}