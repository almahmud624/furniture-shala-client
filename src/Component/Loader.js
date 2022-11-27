import { Grid } from "@chakra-ui/react";
import React from "react";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <Grid placeItems={"center"} h="100vh">
        <Rings
          height="80"
          width="80"
          color="#4fa94d"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </Grid>
    </>
  );
};

export default Loader;
