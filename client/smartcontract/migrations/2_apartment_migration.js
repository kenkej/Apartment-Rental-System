var Apartment = artifacts.require("../contracts/ApartmentContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Apartment);
};
