import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

const SidebarFilterAccordion = ({ children, title, filterValue }) => {
  return (
    <Box
      borderTopWidth={filterValue && 1}
      borderBottomWidth={filterValue && 1}
      borderColor={"teal.500"}
      color={filterValue && "teal.500"}
    >
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
    </Box>
  );
};

export default SidebarFilterAccordion;
