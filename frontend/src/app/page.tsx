"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import { utils } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import Chat from "~/components/Chat";
import Logo from "~/components/Logo";
import Navbar from "~/components/Navbar";
import { useGame } from "~/hooks/useGame";
import { GameState } from "~/types/GameState";

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

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  console.log(messages);

  const handleSendMessage = (message: string) => {
    if (!address && openConnectModal != undefined) {
      openConnectModal();
      return;
    }
    if (!messagePrice) {
      // toast.error("Message price is not set");
      return;
    }
    sendMessage(message, utils.formatEther(messagePrice));
  };
  return (
    <main className="flex h-full w-full flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {!isStarted ? (
        <div className="container z-10 mt-[100px] flex h-[90vh] flex-col items-center justify-center gap-12 px-4 py-16">
          <Logo className="h-20 w-full" />
          <div className="z-50 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <button
              className="h-[80px] w-full bg-transparent text-[32px] md:text-[80px]"
              onClick={() => {
                setIsStarted(true);
              }}
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div className="container z-10 mt-[100px] flex h-full max-w-[800px] flex-grow flex-col gap-12">
          <Navbar />
          <Chat
            prizePool={prizePool?.toString() || "0"}
            messagePrice={messagePrice?.toString() || "0"}
            gameState={gameState as keyof typeof GameState}
            messages={
              messages?.map((item, index) => ({
                id: item.timestamp.toString(),
                content: item.content,
                role: item.sender === agentAddress ? "assistant" : "user",
                timestamp: new Date(Number(item.timestamp)),
              })) || []
            }
            onSendMessage={handleSendMessage}
            className="h-full w-full"
            isDisabled={isLoading || gameState !== GameState.UserAction}
          />
        </div>
      )}
    </main>
  );
}
