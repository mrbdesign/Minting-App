"use client";

import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "33348c96ab27f67e84ec697df5f583a8",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

interface CustomConnectButtonProps {
  className?: string;
}

export function CustomConnectButton({ className }: CustomConnectButtonProps) {
  return (
    <div className={className}>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={darkTheme({
          colors: { modalBg: "hsl(228, 12%, 8%)" },
        })}
        connectModal={{
          size: "compact",
          title: "Let's Friggin' Go !",
          showThirdwebBranding: false,
          termsOfServiceUrl: "https://www.mrbriandesign.com/terms",
          privacyPolicyUrl: "https://www.mrbriandesign.com/privacy",
        }}
      />
    </div>
  );
}
