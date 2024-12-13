"use client";

import { TransactionButton } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import { CustomConnectButton } from "./CustomConnectButton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Minus, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { ThirdwebContract } from "thirdweb";
import { ClaimButton, MediaRenderer, NFT, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import React from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

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
  console.log(props);
  const [isMinting, setIsMinting] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [customAddress, setCustomAddress] = useState("");
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

  if (props.pricePerToken === null || props.pricePerToken === undefined) {
    console.error("Invalid pricePerToken");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat transition-colors duration-200" style={{backgroundImage: "url('/background.png')"}}>
      <div className="absolute top-4 right-4 sm:block hidden">
        <CustomConnectButton />
      </div>

      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
            {props.isERC1155 ? (
              <NFT contract={props.contract} tokenId={props.tokenId}>
                <React.Suspense
                  fallback={<Skeleton className="w-full h-full object-cover" />}
                >
                  <NFT.Media className="w-full h-full object-cover" />
                </React.Suspense>
              </NFT>
            ) : (
              <MediaRenderer
                client={client}
                className="w-full h-full object-cover"
                alt=""
                src={
                  props.contractImage || "/placeholder.svg?height=400&width=400"
                }
              />
            )}
            <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {props.pricePerToken === 0 ? "FREE" : `${props.pricePerToken} ${props.currencySymbol}/each`}
            </div>
          </div>

          <div className="sm:hidden block mb-4 pt-[50px]">
            <CustomConnectButton />
          </div>

          <h2 className="text-2xl font-bold mb-2 dark:text-white">
            {props.displayName}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {props.description}
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-28 text-center rounded-none border-x-0 pl-6"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={increaseQuantity}
                aria-label="Increase quantity"
                className="rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-base pr-1 font-semibold dark:text-white">
              Totally {props.pricePerToken === 0 ? "FREE" : `${props.pricePerToken * quantity} ${props.currencySymbol}`}
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="custom-address"
              checked={useCustomAddress}
              onCheckedChange={setUseCustomAddress}
            />
            <Label
              htmlFor="custom-address"
              className={`${useCustomAddress ? "" : "text-gray-400"} cursor-pointer`}
            >
              Mint to a custom address
            </Label>
          </div>
          {useCustomAddress && (
            <div className="mb-4">
              <Input
                id="address-input"
                type="text"
                placeholder="Enter recipient address"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          {account ? (
            <TransactionButton
              transaction={() =>
                claimTo({
                  contract: props.contract,
                  to: customAddress || account?.address || "",
                  quantity: BigInt(quantity),
                })
              }
              style={{
                backgroundColor: "black",
                color: "white",
                width: "100%",
              }}
              disabled={isMinting}
              onTransactionSent={() => toast.info("Minting NFT")}
              onTransactionConfirmed={() => toast.success("Minted successfully")}
              onError={(err) => toast.error(err.message)}
            >
              Mint {quantity} NFT{quantity > 1 ? "s" : ""}
            </TransactionButton>
          ) : (
            <CustomConnectButton className="w-full" />
          )}
        </CardFooter>
      </Card>
      <p className="text-center mt-4 text-sm text-white">
        By clicking 'Mint', you agree to our{' '}
        <a href="https://www.mrbriandesign.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
          terms of service
        </a>
        .
      </p>
      {true && (
        <Toast className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md">
          Successfully minted {quantity} NFT{quantity > 1 ? "s" : ""}
          {useCustomAddress && customAddress ? ` to ${customAddress}` : ""}!
        </Toast>
      )}
    </div>
  );
}
