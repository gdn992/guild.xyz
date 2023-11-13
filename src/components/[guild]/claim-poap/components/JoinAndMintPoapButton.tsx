import { useDisclosure } from "@chakra-ui/react"
import { MintModal } from "components/[guild]/CreatePoap/hooks/useMintPoapButton"
import useJoin from "components/[guild]/JoinModal/hooks/useJoin"
import useClaimPoap from "components/[guild]/claim-poap/hooks/useClaimPoap"
import useIsMember from "components/[guild]/hooks/useIsMember"
import Button, { ButtonProps } from "components/common/Button"
import useToast from "hooks/useToast"
import { ArrowSquareOut } from "phosphor-react"
import { forwardRef } from "react"
import { useAccount } from "wagmi"

type Props = {
  poapId: number
} & ButtonProps

const JoinAndMintPoapButton = forwardRef(
  ({ poapId, ...buttonProps }: Props, ref: any) => {
    const { address } = useAccount()
    const isMember = useIsMember()
    const toast = useToast()

    const {
      isOpen: isMintModalOpen,
      onOpen: onMintModalOpen,
      onClose: onMintModalClose,
    } = useDisclosure()

    const { onSubmit, response, ...rest } = useClaimPoap(poapId)

    const handleSubmit = (res) => {
      if (res.success === false) {
        toast({
          status: "warning",
          title: "No access",
          description:
            "Seems like you're not eligible for any roles in this guild. Check the guild page for more info!",
          duration: 8000,
        })
        return
      }

      onSubmit()
      onMintModalOpen()
    }

    const { isLoading: isJoinLoading, onSubmit: onJoinSubmit } =
      useJoin(handleSubmit)

    const props: ButtonProps = response
      ? {
          as: "a",
          target: "_blank",
          href: `${response}?address=${address}`,
          rightIcon: <ArrowSquareOut />,
          children: "Go to minting page",
        }
      : isMember
      ? {
          onClick: handleSubmit,
          children: "Mint POAP",
        }
      : {
          onClick: () => onJoinSubmit(),
          isLoading: isJoinLoading,
          loadingText: "Joining Guild",
          children: "Mint POAP",
        }

    return (
      <>
        <Button ref={ref} {...buttonProps} {...props} />
        <MintModal
          isOpen={isMintModalOpen}
          onClose={onMintModalClose}
          response={response}
          {...rest}
        />
      </>
    )
  }
)

export default JoinAndMintPoapButton
