"use client";
import ChatMessage from '@/components/ChatMessage'
import { ScrollableBox } from '@/components/ScrollableBox'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Log, TransactionExecutionError } from 'viem';
import { useAccount, useBlockNumber, useChainId, useContractEvent, useContractWrite, usePrepareContractWrite, usePublicClient, useWaitForTransaction } from 'wagmi'
const chattercontract = require("../../solidity/out/Chatter.sol/Chatter.json");

const chatterAddress = "0xAf24cbB6425311F23F42Ec40a153707AC99425E8";

export default function Home() {

  const chainId = useChainId()
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const [messages, setMessages] = useState<{ from: string, message: string }[]>([])
  const [message, setMessage] = useState<string>("");
  const [messageLoading, setMessageLoading] = useState<boolean>(false);
  const { config, isError: isPrepareError, error: prepareError } = usePrepareContractWrite({
    address: chatterAddress,
    abi: chattercontract.abi,
    functionName: 'sendMessage',
    args: [message]
  })
  const { data, write, isIdle, isError, error } = useContractWrite(config)
  useEffect(() => {
    setMessages([]); //reset if the chain changes

    publicClient.getBlockNumber().then(blockNumber => {
      publicClient.getContractEvents({
        address: chatterAddress,
        abi: chattercontract.abi,
        eventName: 'Message',
        fromBlock: blockNumber - BigInt(Math.min(100, Number(blockNumber.toString()))),
        toBlock: "latest"
      }).then((logs: Log[]) => {
        console.log({logs});
        setMessages(logs.map(log => { return { from: log.args.sender, message: log.args.message } }))
      })
    })

  }, [chainId]);

  function addToMessage(msg: { from: string, message: string }) {
    setMessages(prevMessage => [...prevMessage, { from: msg.from, message: msg.message }]);
  }
  useContractEvent({
    address: chatterAddress,
    abi: chattercontract.abi,
    eventName: 'Message',
    listener(logs) {
      logs.map(log => { addToMessage({ from: log.args.sender, message: log.args.message }) })
    },
  })

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSettled() {
      setMessage("");
      setMessageLoading(false)
    },
  })

  function sendMessage() {
    if (address != undefined && message && message.length > 0) {
      //setMessages(prevMessages => [...prevMessages, { from: address, message }]);
      try {
        setMessageLoading(true)
        write?.();
      } catch (err: TransactionExecutionError | any) {
        console.error("Error happened during sending", err.message);
      }
    }
  }
  return (
    <div className='container mx-auto max-w-xl'>
      <div className="flex-1 justify-between flex flex-col h-screen">
        <div className="flex items-center justify-between py-3 border-b-2 border-gray-200 p-3 ">
          <div className='text-xl flex flex-col sm:flex-row gap-3 '>
            AA-Chatter
          </div>

          <ConnectButton accountStatus="avatar" />
        </div>

        <ScrollableBox className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch h-full" >
          {messages.length > 0 ? <div className='flex shrink grow'></div> : <div></div>}
          {messages?.map((msg, i) => <ChatMessage key={i} fromAddress={msg.from} message={msg.message} />)}
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=''
            visible={messageLoading}
          />
          {(isPrepareError || isError) && (
          <div className='red'>Error: {(prepareError || error)?.message}</div>
        )}
        </ScrollableBox>

        

        <div className="border-t-2 border-gray-200 p-3 pb-5 mb-2 sm:mb-0">
          <div className="relative flex">
            <input disabled={messageLoading} value={message} onKeyDown={event => {
              if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                sendMessage()
              }
            }} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder="Hi there..." className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 p-3 bg-gray-200 rounded-md" />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">

              <button disabled={messageLoading} onClick={(e) => { e.preventDefault(); sendMessage() }} type="button" className="inline-flex items-center justify-center rounded-r-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                <span className="font-bold">📩</span>

              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
