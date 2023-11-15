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
              w="40px"
            />
            Change the difficulty
            <Img
              src={`/guildLogos/${Math.floor(Math.random() * 285)}.svg`}
              w="40px"
            />
          </AlertDialogHeader>
          <AlertDialogBody>
            Do you want to navigate? You are in a unfinished game, if you want to
            change the difficulty, the earned point will be lost.
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
