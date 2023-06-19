import { Box, Tooltip } from "@chakra-ui/react";
import useAdminSellerCheck from "../../Hooks/useAdminSellerCheck";

const ViewOnlyMode = () => {
  const [isShown] = useAdminSellerCheck();
  return (
    <>
      {isShown && (
        <Tooltip
          label="You'r Currently on view only mode!"
          placement="top"
          hasArrow
          closeDelay={500}
        >
          <Box
            w={"full"}
            h={"full"}
            pos={"absolute"}
            top={0}
            bg={"transparent"}
            zIndex={50}
            cursor={"not-allowed"}
          ></Box>
        </Tooltip>
      )}
    </>
  );
};

export default ViewOnlyMode;
