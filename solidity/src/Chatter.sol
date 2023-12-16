// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Chatter {
    event Message(address indexed sender, string message);

    function sendMessage(string calldata message) public {
        emit Message(msg.sender, message);
    }
}
