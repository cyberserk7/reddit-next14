"use client";

import { cn } from "@/lib/utils";
import { commentVotePayload } from "@/schema";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { TbArrowBigDown } from "react-icons/tb";
import { TbArrowBigDownFilled } from "react-icons/tb";
import { toast } from "sonner";

interface CommentVoteClientProps {
  commentId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const CommentVoteClient = ({
  initialVotesAmt,
  commentId,
  initialVote,
}: CommentVoteClientProps) => {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: commentVotePayload = {
        commentId: commentId,
        voteType,
      };

      await axios.patch(`/api/comments/${commentId}`, payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") {
        setVotesAmt((prev) => prev - 1);
      } else setVotesAmt((prev) => prev + 1);
      setCurrentVote(prevVote);
      if (err instanceof AxiosError) {
        if (err?.response?.status === 401) {
          return toast.error("Something went wrong");
        }
      }
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === "UP") {
          setVotesAmt((prev) => prev - 1);
        } else {
          setVotesAmt((prev) => prev + 1);
        }
      } else {
        setCurrentVote(type);
        if (type === "UP") {
          setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        } else {
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
        }
      }
    },
  });

  return (
    <div className={cn("rounded-full  flex items-center transition")}>
      <div
        className={cn(
          "hover:bg-[#223237] w-full h-full p-2 rounded-full transition cursor-pointer hover:text-[#FF4401] ",
          currentVote && "hover:bg-transparent"
        )}
        onClick={() => vote("UP")}
      >
        {currentVote === "UP" ? (
          <TbArrowBigUpFilled className="h-4 w-4 text-[#FF4401]" />
        ) : (
          <TbArrowBigUp className="h-4 w-4" />
        )}
      </div>
      <span className="text-sm font-semibold">{votesAmt}</span>
      <div
        className={cn(
          "hover:bg-[#223237] w-full h-full p-2 rounded-full transition cursor-pointer hover:text-blue-600",
          currentVote && "hover:bg-transparent"
        )}
        onClick={() => vote("DOWN")}
      >
        {currentVote === "DOWN" ? (
          <TbArrowBigDownFilled className="h-4 w-4 text-blue-600" />
        ) : (
          <TbArrowBigDown className="h-4 w-4" />
        )}
      </div>
    </div>
  );
};

export default CommentVoteClient;
