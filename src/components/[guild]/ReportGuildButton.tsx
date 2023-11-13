import { IconButton, Tooltip } from "@chakra-ui/react"
import Button, { ButtonProps } from "components/common/Button"
import { useIntercom } from "components/_app/IntercomProvider"
import { Flag } from "phosphor-react"
import { useEffect } from "react"
import useGuild from "./hooks/useGuild"

type Props = {
  layout?: "FULL" | "ICON"
} & ButtonProps

const label = "Report guild"
const className = "report-guild-btn"

const ReportGuildButton = ({ layout = "FULL", ...rest }: Props): JSX.Element => {
  const { id, name } = useGuild()
  const { addIntercomSettings } = useIntercom()

  useEffect(() => {
    if (!id || !name) return
    addIntercomSettings({ reportedGuildName: `${name} (#${id})` })

    return () => addIntercomSettings({ reportedGuildName: null })
  }, [id, name])

  const baseButtonProps: ButtonProps = {
    className,
    size: "sm",
    variant: "ghost",
  }

  return layout === "FULL" ? (
    <Button {...baseButtonProps} leftIcon={<Flag />} {...rest}>
      {label}
    </Button>
  ) : (
    <Tooltip label={label} placement="top" hasArrow>
      <IconButton
        {...baseButtonProps}
        icon={<Flag />}
        aria-label={label}
        boxSize={8}
        rounded="full"
        minW="none"
        {...rest}
        colorScheme={rest.colorScheme as string}
      />
    </Tooltip>
  )
}

export default ReportGuildButton
