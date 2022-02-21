import React from "react";
import ReactMarkdown from "react-markdown";
import { Box, Text } from "@chakra-ui/react";

import styles from "./markdown_styles.module.css";

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
        <Box bg="white" textAlign="left" display="flex">
          <Box>
            <Box color="black" fontSize="24px" fontWeight="bold">
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
