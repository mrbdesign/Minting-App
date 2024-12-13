import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { base } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: "33348c96ab27f67e84ec697df5f583a8",
});

const wallets = [
  inAppWallet({
    auth: {
      options: [
        "google",
        "discord",
        "email",
        "passkey",
        "phone",
        "apple",
        "x",
        
      ],
    },
  }),
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
        accountAbstraction={{
          chain: base,
          sponsorGas: true,
        }}
        connectModal={{
          size: "compact",
          title: "🔪🔪🔪",
          showThirdwebBranding: false,
        }}
      />
    </div>
  );
}