import useWeb3ConnectionManager from "components/_app/Web3ConnectionManager/hooks/useWeb3ConnectionManager"
import Button from "components/common/Button"

const ConnectWalletButton = (): JSX.Element => {
  const { openWalletSelectorModal } = useWeb3ConnectionManager()

  return (
    <Button size="lg" colorScheme="blue" onClick={openWalletSelectorModal} w="full">
      Connect wallet
    </Button>
  )
}

export default ConnectWalletButton
