import React from "react";
import ReactMarkdown from "react-markdown";

import styles from "./markdown_styles.module.css";
import { Box} from '@chakra-ui/react';

type Props = {
  blocks: Array<any>;
  title: string;
};

const BlockCollection: React.FC<Props> = (props: Props) => {
  return (
    <Box>
      <Box className="block_title_container" alignItems="center">
        <p className="block_title">{props.title}</p>
      </Box>
      <Box className="block_card_container" border="1px" >
        {props.blocks.map((block: any) => (
          <Box className="blocks_card">
            <Box>
              <Box className="block_card_title">{block.name}</Box>
              <ReactMarkdown className={styles.reactMarkDown}>
                {block.content}
              </ReactMarkdown>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BlockCollection;
