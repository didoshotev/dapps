const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  // Deploy the Migrations contract as our only task
  console.log('init Migration...!');
  deployer.deploy(Migrations);
};