import React, { PropsWithChildren } from "react"
import { Box, Circle, HTMLChakraProps } from "@chakra-ui/react"

const DashedCircle: React.FC<
  PropsWithChildren<HTMLChakraProps<"div"> & { ref?: any; size?: number }>
> = ({ children, ...rest }) => (
  <Box
    style={{
      backgroundImage: `background-image: url("data:image/svg+xml,<svg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><rect width='100%' height='100%' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6, 14' stroke-dashoffset='0' stroke-linecap='square'/></svg>");`,
    }}
    {...rest}
  >
    {children}
  </Box>
)

export default DashedCircle
