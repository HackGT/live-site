import React from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

type Props = {
  links: string[][];
};

const LinksNav: React.FC<Props> = (props: Props) => (
  <Box boxShadow="0 3px 10px rgb(0 0 0 / 0.2)" padding={2} borderRadius={4} marginTop={2}>
    <Breadcrumb separator='|'>
      {props.links.map(link =>
        <BreadcrumbItem>
          <BreadcrumbLink href={link[1]}>{link[0]}</BreadcrumbLink>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  </Box>
);

export default LinksNav;
