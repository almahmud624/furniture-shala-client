import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const Countdown = ({
  setCouponStatus,
  couponDuration,
  productId,
  couponStatus,
}) => {
  const [time, setTime] = useState(couponDuration); // 24 hours in seconds

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
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  return (
    <Box mt={3}>
      <Box display="flex" justifyContent="space-between" gap={5}>
        <Box
          textAlign="center"
          borderWidth={1}
          borderColor={"gray.600"}
          px={4}
          rounded={"lg"}
        >
          <Text fontSize="xl">{formatTime(time).hours}</Text>
          <Text fontSize="lg">Hrs</Text>
        </Box>
        <Box
          textAlign="center"
          borderWidth={1}
          borderColor={"gray.600"}
          px={4}
          rounded={"lg"}
        >
          <Text fontSize="xl">{formatTime(time).minutes}</Text>
          <Text fontSize="lg">Min</Text>
        </Box>
        <Box
          textAlign="center"
          borderWidth={1}
          borderColor={"gray.600"}
          px={4}
          rounded={"lg"}
        >
          <Text fontSize="xl">{formatTime(time).seconds}</Text>
          <Text fontSize="lg">Sec</Text>
        </Box>
      </Box>
    </Box>
  );
};
