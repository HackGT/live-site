import React from "react";
import ReactMarkdown from "react-markdown";
import { Box, Text } from "@chakra-ui/react";

import styles from "./markdown_styles.module.css";

type Props = {
  blocks: Array<any>;
  title: string;
};

const BlockCollection: React.FC<Props> = (props: Props) => (
  <Box mt="60px" mx="10%">
    <Box alignItems="center">
      <Text as="h2">{props.title}</Text>
    </Box>
    <Box className="block_card_container">
      {props.blocks.map((block: any) => (
        <Box bg="white" textAlign="left" mx="2%" width="75%" display="flex">
          <Box>
            <Box color="black" fontSize="24px" fontFamily="Roboto, sans-serif" fontWeight="bold">
              {block.name}
            </Box>
            <ReactMarkdown className={styles.reactMarkDown}>{block.content}</ReactMarkdown>
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

export default BlockCollection;
