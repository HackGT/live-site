import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box } from "@chakra-ui/react";

import styles from "./markdown_styles.module.css";

type Props = {
  block: any;
};

const Block: React.FC<Props> = (props: Props) => (
  <Box bg="white" textAlign="left" display="flex">
    <Box>
      <Box color="black" fontSize="24px" fontWeight="bold">
        {props.block.name}
      </Box>
      <ReactMarkdown className={styles.reactMarkDown} remarkPlugins={[remarkGfm]}>
        {props.block.content}
      </ReactMarkdown>
    </Box>
  </Box>
);

export default Block;