import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Text } from "@chakra-ui/react";
import LinksNav from "./LinksNav";

import styles from "./markdown_styles.module.css";

type Props = {
  blocks: Array<any>;
  title: string;
};

const links = [
  ["Event Slack", "https://join.slack.com/t/horizons-xux6929/shared_invite/zt-1qhc3lyj7-6CeeTEzvI79kL8~EeTgypQ"],
  ["Event App (iOS)", "https://apps.apple.com/us/app/hexlabs/id1478268737"],
  ["Event App (Android)", "https://play.google.com/store/apps/details?id=com.appgt&hl=en&gl=US"],
  ["Horizons Website", "https://horizons.hexlabs.org/"],
  ["Devpost", "https://horizons-2023.devpost.com/"],
  ["Event Packet", "https://www.notion.so/b3040e44a9334c899d93403042745dda"]
]

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
              {
                (block.name === "Quick Links")
                  ? <LinksNav links={links} />
                  : <ReactMarkdown className={styles.reactMarkDown} remarkPlugins={[remarkGfm]}>
                      {block.content}
                    </ReactMarkdown>
              }
            </Box>
          </Box>
      ))}
    </Box>
  </Box>
);

export default BlockCollection;
