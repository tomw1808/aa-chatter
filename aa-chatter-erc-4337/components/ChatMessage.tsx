"use client";
import { useAccount } from "wagmi";
import JazziconImage from "./JazziconImage";

//https://tailwindcomponents.com/component/chat
export default function ChatMessage({fromAddress, message}: {fromAddress: string, message: string}) {
    const { address, isConnecting, isDisconnected } = useAccount()
    return <div className="message">
    <div className={["flex items-end", address == fromAddress ? ' justify-end' : ''].join(" ")}>
      <div className={["flex flex-col space-y-2 text-xs max-w-xs mx-2 ", address == fromAddress ? " order-1 items-end" : "order-2 items-start"].join(" ")}>
        <div><span className={["px-4 py-2 rounded-lg inline-block ", address == fromAddress ? " rounded-br-none bg-blue-600 text-white" : "rounded-bl-none bg-gray-300 text-gray-600"].join(" ")}>{message}</span></div>
      </div>
      <JazziconImage address={fromAddress} className={["w-6 h-6 rounded-full", address == fromAddress ? 'order-2' : 'order-1'].join(" ")}/>
      
    </div>
  </div>
}