import { DynamicWidget, useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { AarcFundKitModal } from "@aarc-xyz/fundkit-web-sdk";

interface Props {
    isDark: boolean;
    logoLight: string;
    logoDark: string;
    aarcModal: AarcFundKitModal;
    tokenSymbol?: string;
}

const DynamicAarcApp = ({ isDark, logoLight, logoDark, aarcModal, tokenSymbol }: Props) => {
    const isLoggedIn = useIsLoggedIn();
    const { primaryWallet } = useDynamicContext();

    const handleFundWallet = () => {
        if (primaryWallet?.address) {
            console.log('primaryWallet?.address: ', primaryWallet?.address);
            try {
                aarcModal?.updateDestinationWalletAddress(primaryWallet?.address);
                aarcModal.openModal();
            } catch (error) {
                console.error('Error opening Aarc modal:', error);
            }
        }
    };

    return (
        <div className={`container ${isDark ? 'dark' : 'light'}`}>
            <header className="header">
                <img
                    className="logo"
                    src={isDark ? logoLight : logoDark}
                    alt="Logo"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="big-text"> X </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img
                  className="logo"
                    src="/dynamicLogo.svg"
                    alt="Dynamic Logo"

                />
            </header>

            <main className="modal">
                <DynamicWidget />
                {isLoggedIn && primaryWallet && (
                    <button
                        onClick={handleFundWallet}
                        className="fund-wallet-button"
                    >
                        {tokenSymbol ? `Buy ${tokenSymbol}` : "Fund Wallet"}
                    </button>
                )}
            </main>
        </div>
    );
};

export default DynamicAarcApp;
