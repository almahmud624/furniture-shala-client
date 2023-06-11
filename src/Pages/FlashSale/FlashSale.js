import { Box, Heading, Image, Text } from "@chakra-ui/react"
import { Countdown } from "../../Component/Countdown"
import { useState } from "react"

const FlashSale = () => {
    const [couponStatus,setCouponStatus] = useState({})
    return(
        <>
            <Box maxW={'90%'} mx='auto' py={10}>
                <Box textAlign={'center'}>
                    <Image src=''/>
                    <Box>
                        <Heading>Deal of the week</Heading>
                        <Text>lorem ipsum dolar emmet</Text>
                        <Countdown setCouponStatus={setCouponStatus}
                    couponDuration={7*24*60*60}
                    productId={'_id'}
                    couponStatus={couponStatus} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default FlashSale