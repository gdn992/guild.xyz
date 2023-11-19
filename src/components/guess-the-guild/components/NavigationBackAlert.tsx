import React, { useRef } from "react"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Img,
} from "@chakra-ui/react"
import Button from "../../common/Button"
import FancyText from "./FancyText"

interface INavigationBackAlertProps {
  open: boolean
  onCloseModal: () => void
  onNavigate: () => void
  onStay: () => void
}

const NavigationBackAlert: React.FC<INavigationBackAlertProps> = ({
  open,
  onCloseModal,
  onNavigate,
  onStay,
}) => {
  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen={open}
      leastDestructiveRef={cancelRef}
      onClose={onCloseModal}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            display={"flex"}
            gap={3}
            alignItems={"center"}
          >
            <Img
              src={`/guildLogos/${Math.floor(Math.random() * 285)}.svg`}
              h="40px"
              w="40px"
            />
            Change the difficulty
            <Img
              src={`/guildLogos/${Math.floor(Math.random() * 285)}.svg`}
              h="40px"
              w="40px"
            />
          </AlertDialogHeader>
          <AlertDialogBody>
            <FancyText fontSize={14}>
              Do you want to navigate? You are in an unfinished game. If you choose
              to change the difficulty, any earned points will be lost.
            </FancyText>
          </AlertDialogBody>
          <AlertDialogFooter gap={3}>
            <Button colorScheme="red" onClick={onNavigate} ml={3}>
              navigate
            </Button>
            <Button ref={cancelRef} onClick={onStay}>
              cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default NavigationBackAlert
