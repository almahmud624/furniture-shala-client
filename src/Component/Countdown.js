import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const data = [
  { timerText: "Hrs", timer: "hours" },
  { timerText: "Min", timer: "minutes" },
  { timerText: "Sec", timer: "seconds" },
];

export const Countdown = ({
  setCouponStatus,
  couponDuration,
  productId,
  couponStatus,
}) => {
  const { pathname } = useLocation();
  const flashSaleCountdown = pathname === "/flashsale";
  const [time, setTime] = useState(couponDuration);

  useEffect(() => {
    const startTime = localStorage.getItem("furniture_shala_coupon_timer");
    const currentTime = Math.floor(Date.now() / 1000);

    if (startTime) {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime <= 24 * 60 * 60) {
        const remainingTime = couponDuration - (elapsedTime % couponDuration);
        setTime(remainingTime);
      } else {
        localStorage.setItem("furniture_shala_coupon_timer", currentTime);
      }
    } else {
      localStorage.setItem("furniture_shala_coupon_timer", currentTime);
    }
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time === 0) {
      return clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [time, setCouponStatus, couponDuration, productId, couponStatus]);

  useEffect(() => {
    if (time <= 0) {
      // setCouponStatus({ _id: productId, status: false });
      localStorage.removeItem("furniture_shala_coupon_timer");
    }
  }, [time, productId, setCouponStatus]);

  const formatTime = (time) => {
    const day = Math.floor(time / (24 * 3600));
    const hours = Math.floor((time % (24 * 3600)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      day: day.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  return (
    <Box mt={3}>
      <Grid
        templateColumns={`repeat(${flashSaleCountdown ? 2 : 4}, 1fr)`}
        gap={5}
      >
        {flashSaleCountdown && (
          <GridItem>
            <Box
              textAlign="center"
              borderWidth={flashSaleCountdown ? 3 : 1}
              borderColor={"gray.600"}
              px={4}
              py={flashSaleCountdown && 4}
              rounded={"lg"}
              fontWeight={"semibold"}
            >
              <Text fontSize="5xl">{formatTime(time).day}</Text>
              <Text fontSize="xl">Day</Text>
            </Box>
          </GridItem>
        )}
        {data?.map(({ timerText, timer }) => (
          <GridItem key={timer}>
            <Box
              textAlign="center"
              borderWidth={flashSaleCountdown ? 3 : 1}
              borderColor={"gray.600"}
              px={4}
              py={flashSaleCountdown && 4}
              rounded={"lg"}
              fontWeight={"semibold"}
            >
              <Text fontSize={flashSaleCountdown ? "5xl" : "xl"}>
                {formatTime(time)[timer]}
              </Text>
              <Text fontSize={flashSaleCountdown ? "xl" : "lg"}>
                {timerText}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
