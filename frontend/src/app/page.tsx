"use client";

import { utils } from "ethers";
import { ConnectBtn } from "~/components/ConnectButton";
import Logo from "~/components/Logo";
import Profile from "~/components/Profile";
import SendMoneyButton from "~/components/SendMoneyButton";
import { useGame } from "~/hooks/useGame";
import Link from "next/link";
import { useState } from "react";
import FigmaButton from "~/components/FigmaButton";
import Navbar from "~/components/Navbar";
import Chat from "~/components/Chat";

export default function HomePage() {
  const [isStarted, setIsStarted] = useState(false);
  const {
    messages,
    prizePool,
    messagePrice,
    gameState,
    isLoading,
    isError,
    agentAddress,
    sendMessage,
  } = useGame();
  console.log(messages);
  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* Background images with responsive handling */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <div className="hidden h-full w-full md:block">
          <img
            src="/assets/web-hero-image.png"
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="block h-full w-full md:hidden">
          <img
            src="/assets/mobile-hero-image.png"
            alt="Mobile Background"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Add the Navbar component */}
      <Navbar />

      {!isStarted ? (
        <div className="container z-10 flex flex-col items-center justify-center gap-12 px-4 py-16">
          <Logo className="h-20 w-full" />
          <div className="z-50 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            {/* <ConnectBtn /> */}
            <button
              className="h-[80px] w-full bg-transparent text-[32px] md:text-[80px]"
              onClick={() => {
                setIsStarted(true);
              }}
            >
              Start
            </button>
          </div>
          {/* <SendMoneyButton /> */}
          {/* <Profile /> */}
          {/* <div>
          {messages?.map((item) => {
            return (
              <div key={item.timestamp}>
                <p>{item.content}</p>
              </div>
            );
          })}
        </div> */}
          {/* <div>
          <p>Game State: {gameState}</p>
          <p>Prize Pool: {prizePool}</p>
          <p>Message Price: {messagePrice}</p>
        </div>

        <button
          onClick={() => sendMessage("Hello world!", utils.formatEther(120))}
        >
          Send Message
        </button> */}
          {/* 
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none dark:from-black dark:via-black">
          <Link href="/start" className="mt-4 block">
            <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-700">
              Go to Start Page
            </button>
          </Link>
        </div> */}
        </div>
      ) : (
        <div className="container z-10 flex h-full max-w-[800px] flex-grow flex-col gap-12">
          {/* <p>Game State: {gameState}</p>
          <p>Prize Pool: {prizePool}</p>
          <p>Message Price: {messagePrice}</p> */}
          {/* <div className="flex-1"> */}
          <Chat
            messages={
              messages?.map((item, index) => ({
                id: item.timestamp.toString(),
                content: item.content,
                role: item.sender === agentAddress.data ? "assistant" : "user",
                timestamp: new Date(Number(item.timestamp)),
              })) || []
            }
            onSendMessage={() => {}}
            className="h-full w-full"
          />
          {/* </div> */}
        </div>
      )}
    </main>
  );
}
