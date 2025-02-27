"use client";

import { TransactionButton, MediaRenderer, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import { claimTo as claimTo1155 } from "thirdweb/extensions/erc1155";
import { CustomConnectButton } from "./CustomConnectButton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import type { ThirdwebContract } from "thirdweb";
import { client } from "@/lib/thirdwebClient";
import React from "react";
import { toast } from "sonner";

type Props = {
  contract: ThirdwebContract;
  displayName: string;
  description: string;
  contractImage: string;
  pricePerToken: number | null;
  currencySymbol: string | null;
  isERC1155: boolean;
  isERC721: boolean;
  tokenId: bigint;
};

export function NftMint(props: Props) {
  const [isMinting, setIsMinting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { theme, setTheme } = useTheme();
  const account = useActiveAccount();

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!Number.isNaN(value)) {
      setQuantity(Math.min(Math.max(1, value)));
    }
  };

  const getClaimTransaction = () => {
    if (props.isERC1155) {
      return claimTo1155({
        contract: props.contract,
        to: account?.address || "",
        quantity: BigInt(quantity),
        tokenId: props.tokenId,
      });
    }
    return claimTo({
      contract: props.contract,
      to: account?.address || "",
      quantity: BigInt(quantity),
    });
  };

  if (props.pricePerToken === null || props.pricePerToken === undefined) {
    console.error("Invalid pricePerToken");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0052FF] transition-colors duration-200">
      <Card className="w-full max-w-md bg-[#0052FF] border-[#0052FF]">
        <CardContent className="pt-6">
          <div className="aspect-square overflow-hidden rounded-lg mb-[25px] relative">
            <MediaRenderer
              client={client}
              className="w-full h-full object-cover"
              alt={props.displayName}
              src="/12.png"
            />
            <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {props.pricePerToken === 0 ? "0 PERX" : `${props.pricePerToken} ${props.currencySymbol}/each`}
            </div>
          </div>

          <div className="mb-4">
            <CustomConnectButton className="w-full [&_button]:!bg-white [&_button]:!text-[#0052FF] [&_button]:font-bold [&_button]:border-0" />
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">
            {props.displayName}
          </h2>
          <p className="text-white mb-4">
            {props.description}
          </p>

          <div className="flex items-center justify-start mb-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="rounded-r-none bg-[#0052FF] border-white text-white hover:bg-[#0052FF]"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-28 text-center rounded-none border-white bg-[#0052FF] text-white pl-6"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
                className="rounded-l-none bg-[#0052FF] border-white text-white hover:bg-[#0052FF]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {account ? (
            <TransactionButton
              transaction={getClaimTransaction}
              style={{
                backgroundColor: "white",
                color: "#0052FF",
                width: "100%",
                borderColor: "#ffffff",
                borderWidth: "1px"
              }}
              disabled={isMinting}
              onTransactionSent={() => toast.info("Minting NFT")}
              onTransactionConfirmed={() => toast.success("Minted successfully")}
              onError={(err) => toast.error(err.message)}
            >
              MINT
            </TransactionButton>
          ) : (
            <Button
              className="w-full bg-white !opacity-100 text-[#0052FF] border-white hover:bg-white hover:text-[#0052FF]"
              disabled={true}
            >
              MINT
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
