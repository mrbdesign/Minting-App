"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";
import type { ThirdwebContract } from "thirdweb";
import { ClaimButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import React from "react";
import { toast } from "sonner";

export function NFTMint() {
  const account = useActiveAccount();
  const { theme } = useTheme();

  const handleClaim = async () => {
    try {
      const contract = await client.getContract(
        "0x0000000000000000000000000000000000000000"
      );
      const tx = await contract.erc721.claim(1);
      console.log(tx);
      toast.success("NFT claimed successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to claim NFT");
    }
  };

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Claim Your NFT</CardTitle>
        <CardDescription>
          Click the button below to claim your NFT.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MediaRenderer
          src="ipfs://QmV4HC4mZXQs6SBQz8yhjF8tqmBpVsm3yDtbxdGsD8QNwP"
          alt="NFT"
          width="100%"
          height="auto"
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        {account ? (
          <ClaimButton
            contract={
              "0x0000000000000000000000000000000000000000" as ThirdwebContract
            }
            className="w-full"
          >
            Claim NFT
          </ClaimButton>
        ) : (
          <Button className="w-full" onClick={handleClaim}>
            Connect Wallet
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
