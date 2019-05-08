const ERC20Impl = artifacts.require("ERC20Impl");

module.exports = function(deployer) {
  deployer.deploy(ERC20Impl,'ccstyle','cc',10,9999999999);
};