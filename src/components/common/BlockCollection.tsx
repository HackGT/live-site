import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Block from "./Block";

type Props = {
  blocks: Array<any>;
  title: string;
};

const BlockCollection: React.FC<Props> = (props: Props) => (
  <Box mt="60px" mx="5%" fontFamily="Roboto, sans-serif">
    <Box alignItems="center">
      <Text as="h2" fontSize="32px" fontWeight="bold" mb="20px">
        {props.title}
      </Text>
    </Box>
    <Box display="flex" flexDir="column" gap="20px">
      {props.blocks.map((block: any) => (
        <Block block={block} />
      ))}
    </Box>
  </Box>
);

export default BlockCollection;
