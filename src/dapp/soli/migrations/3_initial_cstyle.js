const CStyle = artifacts.require("CStyle");

module.exports = function(deployer) {
  deployer.deploy(CStyle,'CStyleCoin','cc',10,9999999999);
};