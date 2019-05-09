const CStyleCoin = artifacts.require("CStyleCoin");

module.exports = function(deployer) {
  deployer.deploy(CStyleCoin,'CStyleCoin','cc',10,9999999999);
};