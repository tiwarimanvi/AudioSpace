'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Polling from "@/components/Polling/Polling";
import ViewPolls from "@/components/Polling/ViewPolls";
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import Prompts from "@/components/common/Prompts";
import { useRoom, useLocalPeer, usePeerIds, useHuddle01, useDataMessage } from "@huddle01/react/hooks";
import AcceptRequest from "@/components/Modals/AcceptRequest";
import useStore from "@/store/slices";

const Home = ({ params }: { params: { roomId: string } }) => {
  const { push } = useRouter();
  const [shareLink, setShareLink] = useState<string | null>(null);
  const { state } = useRoom({
    onLeave: () => {
      push(`/${params.roomId}/lobby`);
    },
  });
  const { updateMetadata, metadata, peerId } = useLocalPeer<{
    displayName: string;
    avatarUrl: string;
    isHandRaised: boolean;
  }>();
  const { peerIds } = usePeerIds();
  const { huddleClient } = useHuddle01();
  const [requestedPeerId, setRequestedPeerId] = useState("");
  const { showAcceptRequest, setShowAcceptRequest } = useStore();
  const addChatMessage = useStore((state) => state.addChatMessage);
  const addRequestedPeers = useStore((state) => state.addRequestedPeers);
  const removeRequestedPeers = useStore((state) => state.removeRequestedPeers);
  const requestedPeers = useStore((state) => state.requestedPeers);
  const avatarUrl = useStore((state) => state.avatarUrl);
  const userDisplayName = useStore((state) => state.userDisplayName);
  const isChatOpen = useStore((state) => state.isChatOpen);
  const isPollingOpen = useStore((state) => state.isPollingOpen);
  const isViewPollsOpen = useStore((state) => state.isViewPollsOpen);

  useEffect(() => {
    if (state === "idle") {
      push(`/${params.roomId}/lobby`);
    } else {
      updateMetadata({
        displayName: userDisplayName,
        avatarUrl: avatarUrl,
        isHandRaised: metadata?.isHandRaised || false,
      });
    }
  }, []);

  useEffect(() => {
    if (!requestedPeers.includes(requestedPeerId)) {
      setShowAcceptRequest(false);
    }
  }, [requestedPeers]);

  // Function to generate and copy share link
  const generateAndCopyShareLink = () => {
    const generatedLink = `https://audio-space.vercel.app/${params.roomId}`;
    navigator.clipboard.writeText(generatedLink).then(() => {
      setShareLink(generatedLink);
      toast.success("Link copied to clipboard!");
    });
  };

  useDataMessage({
    onMessage(payload, from, label) {
      if (label === "requestToSpeak") {
        setShowAcceptRequest(true);
        setRequestedPeerId(from);
        addRequestedPeers(from);
        setTimeout(() => {
          setShowAcceptRequest(false);
        }, 5000);
      }

      if (label === "chat" && from !== peerId) {
        const messagePayload = JSON.parse(payload);
        const newChatMessage = {
          name: messagePayload.name,
          text: messagePayload.message,
          is_user: false,
        };
        addChatMessage(newChatMessage);
      }
    },
  });

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <div className="flex items-center justify-center w-full">
        <GridLayout />
        <Sidebar />
        <div className="absolute right-4 bottom-20">
          {showAcceptRequest && <AcceptRequest peerId={requestedPeerId} />}
        </div>
      </div>
      {isChatOpen && <Chat />}
      {isPollingOpen && <Polling />}
      {isViewPollsOpen && <ViewPolls />}
      <BottomBar />
      <Prompts />
      {/* Share button and generated link */}
      <div className="fixed bottom-4 text-black right-4">
        <button onClick={generateAndCopyShareLink} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
          Share Room
        </button>
        {shareLink && (
          <input
            className="border border-gray-400 rounded-md px-2 py-1 mt-2"
            type="text"
            value={shareLink}
            readOnly
          />
        )}
      </div>
    </section>
  );
};

export default Home;
