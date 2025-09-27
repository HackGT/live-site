import React, { useEffect } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
  VStack
} from "@chakra-ui/react";

type Props = {
  links: string[][];
};

const LinksNav: React.FC<Props> = (props: Props) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return width > 768 ? (
    <Flex
      boxShadow="0 1px 1px rgb(0 0 0 / 0.1)"
      padding={2}
      borderRadius={4}
      marginTop={2}
      width="fit-content"
      alignSelf="center"
    >
      <Breadcrumb separator="|">
        {props.links.map(link => (
          <BreadcrumbItem key={link[1]}>
            <BreadcrumbLink href={link[1]}>{link[0]}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Flex>
  ) : (
    <VStack marginTop={2}>
      {props.links.map(link => (
        <Link w="full" key={link[1]} href={link[1]}>
          <Box 
          border="1px solid #0001" 
          w="full" 
          textAlign="center" 
          boxShadow="0 3px 3px rgb(0 0 0 / 0.1)" 
          padding={2} 
          borderRadius={4}>
            {link[0]}
          </Box>
        </Link>
      ))}
    </VStack>
  );
};

export default LinksNav;
