import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Button, Stack } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { apiUrl, Service, useAuth } from "@hex-labs/core";
import axios from "axios";

import styles from "./markdown_styles.module.css";
import LinksNav from "./LinksNav";

type Props = {
  block: any;
};

const links = [
  [
    "Event Slack",
    "https://join.slack.com/t/horizons-xux6929/shared_invite/zt-1qhc3lyj7-6CeeTEzvI79kL8~EeTgypQ",
  ],
  ["Event App (iOS)", "https://apps.apple.com/us/app/hexlabs/id1478268737"],
  ["Event App (Android)", "https://play.google.com/store/apps/details?id=com.appgt&hl=en&gl=US"],
  ["Horizons Website", "https://horizons.hexlabs.org/"],
  ["Devpost", "https://horizons-2023.devpost.com/"],
  ["Event Packet", "https://www.notion.so/b3040e44a9334c899d93403042745dda"],
];

const Block: React.FC<Props> = (props: Props) => {
  const { user } = useAuth();

  const [role, setRoles] = React.useState<any>({
    member: false,
    exec: false,
    admin: false,
  });

  React.useEffect(() => {
    const getRoles = async () => {
      if (user?.uid) {
        const response = await axios.get(apiUrl(Service.USERS, `/users/${user?.uid}`));
        setRoles({ ...response.data.roles });
      }
    };
    getRoles();
  }, [user?.uid]);

  const showAdmin = role.member || role.admin || role.exec;

  const editBlock = () => {
    window.location.href = `./admin/blocks/${props.block.id}`;
  };

  return (
    <Stack direction="column" bg="white" textAlign="left" display="flex" width="full">
      <Stack direction="row" justify="space-between" width="100%">
        <Box color="black" fontSize="24px" fontWeight="bold">
          {props.block.title}
        </Box>
        {showAdmin && props.block.title !== "Quick Links" && (
          <Button onClick={editBlock} size="sm" backgroundColor="red.200">
            <EditIcon />
          </Button>
        )}
      </Stack>
      {props.block.title === "Quick Links" ? (
        <LinksNav links={links} />
      ) : (
        <ReactMarkdown className={styles.reactMarkDown} remarkPlugins={[remarkGfm]}>
          {props.block.content}
        </ReactMarkdown>
      )}
    </Stack>
  );
};

export default Block;
