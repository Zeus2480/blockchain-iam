const hre = require("hardhat");

async function main() {
  // Deploy the IdentityRegistration contract
  const IdentityRegistration = await hre.ethers.getContractFactory("IdentityRegistration");
  const identityRegistration = await IdentityRegistration.deploy();
  await identityRegistration.waitForDeployment(); // Updated to wait for deployment
  console.log("IdentityRegistration deployed to:", identityRegistration.target); // Use .target for deployed address

  // Deploy the AccessControl contract, using the address of IdentityRegistration
  const AccessControl = await hre.ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy(identityRegistration.target); // Updated to use .target for address
  await accessControl.waitForDeployment(); // Updated to wait for deployment
  console.log("AccessControl deployed to:", accessControl.target); // Use .target for deployed address

  // Deploy the IdentityVerification contract, using the address of IdentityRegistration
  const IdentityVerification = await hre.ethers.getContractFactory("IdentityVerification");
  const identityVerification = await IdentityVerification.deploy(identityRegistration.target); // Updated to use .target for address
  await identityVerification.waitForDeployment(); // Updated to wait for deployment
  console.log("IdentityVerification deployed to:", identityVerification.target); // Use .target for deployed address
}

// Execute the main deployment function and catch errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
