"use client";

import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

// Create the Thirdweb client
const client = createThirdwebClient({
  clientId: "33348c96ab27f67e84ec697df5f583a8",
});

// Define wallets
const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

// Define props for the CustomConnectButton component
interface CustomConnectButtonProps {
  className?: string;
}

// CustomConnectButton component
export function CustomConnectButton({ className }: CustomConnectButtonProps) {
  // Define a custom theme for the ConnectButton
  const customTheme = darkTheme({
    colors: {
      modalBg: "#FFFFFF",
      primaryText: "#000000",
      separatorLine: "#FFFFFF",
      borderColor: "#EEEEEE",
      accentText: "#FFFFFF",
      buttonBg: "#000000",
      buttonText: "#FFFFFF",
    },
    fonts: {
      family: "BasePixel-High",
    },
  });

  // Render the ConnectButton with the custom theme and configuration
  return (
    <div className={className}>
      <ConnectButton
        client={client}
        wallets={wallets}
        theme={customTheme} // Use custom theme here
        connectModal={{
          size: "compact",
          title: "Let's Friggin' Go!",
          showThirdwebBranding: false,
          termsOfServiceUrl: "https://www.mrbriandesign.com/terms",
          privacyPolicyUrl: "https://www.mrbriandesign.com/privacy",
        }}
      />
    </div>
  );
}
