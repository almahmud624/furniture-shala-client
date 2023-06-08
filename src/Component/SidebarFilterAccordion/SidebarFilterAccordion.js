import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

const SidebarFilterAccordion = ({ children, title }) => {
  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton px={0}>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize={"lg"}
                fontWeight={"semibold"}
              >
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px={0}>
            {children}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default SidebarFilterAccordion;
