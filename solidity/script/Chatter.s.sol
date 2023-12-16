// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Chatter} from "../src/Chatter.sol";

contract ChatterScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();
        new Chatter();
    }
}

// anvil? 
// forge script ./script/Chatter.s.sol --rpc-url http://localhost:8545 --broadcast --sender 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --unlocked --chain-id 31337
// ganache? 
// forge script ./script/Chatter.s.sol --rpc-url http://localhost:8545 --broadcast --sender 0x31DE7a8ba1adC15f2a80Fb2BF1581BB163Ffca28 --unlocked --chain-id 1337
// frame wallet?
// forge script ./script/Chatter.s.sol --rpc-url http://localhost:1248 --broadcast --sender <address> --unlocked --chain-id <chainID> --verify
