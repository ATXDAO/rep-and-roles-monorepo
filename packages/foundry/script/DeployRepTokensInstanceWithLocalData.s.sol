// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ReputationTokensInstance} from "../contracts/ReputationTokensInstance.sol";
import {Hats} from "../contracts/Hats/Hats.sol";

import {Script, console} from "../lib/forge-std/src/Script.sol";

contract DeployRepTokensInstanceWithLocalData is Script {
    address[] _admins = [0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266];
    uint256 maxMintAmount = 10;
    string baseURI =
        "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

    function run() public returns (ReputationTokensInstance) {
        vm.startBroadcast(
            0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        );
        ReputationTokensInstance instance = new ReputationTokensInstance(
            _admins[0],
            _admins,
            baseURI
        );

        Hats hatsInstance = new Hats("Hats", "");

        hatsInstance.mintTopHat(
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
            "",
            ""
        );
        vm.stopBroadcast();
        return instance;
    }
}
