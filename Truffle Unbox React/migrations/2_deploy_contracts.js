var Job = artifacts.require("./Job.sol");

module.exports = async function(deployer) {
  deployer.deploy(Job);
};
