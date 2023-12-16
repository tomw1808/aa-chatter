// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Chatter} from "../src/Chatter.sol";

contract CounterTest is Test {
    Chatter public chat;
    event Message(address indexed sender, string message);


    function setUp() public {
        chat = new Chatter();
    }

    function test_message() public {
        vm.expectEmit(true, false, false, true);
        emit Message(address(this), "test message 123");
        chat.sendMessage("test message 123");
    }

}
