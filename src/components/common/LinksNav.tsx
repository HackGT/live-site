import React, { useEffect } from "react";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack } from "@chakra-ui/react";

type Props = {
  links: string[][];
};

const LinksNav: React.FC<Props> = (props: Props) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  return width > 768 ? (
    <Box
      boxShadow="0 1px 1px rgb(0 0 0 / 0.1)"
      padding={2}
      borderRadius={4}
      marginTop={2}
    >
      <Breadcrumb separator="">
        {props.links.map(link => (
          <BreadcrumbItem>
            <BreadcrumbLink href={link[1]}>{link[0]}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  ) : (
    <HStack spacing="10px" overflow="scroll">
      <Box boxShadow="0 3px 3px rgb(0 0 0 / 0.1)" padding={2} borderRadius={4} marginTop={2}>
        <Breadcrumb separator="">
          {props.links.map(link => (
            <BreadcrumbItem>
              <BreadcrumbLink href={link[1]}>{link[0]}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Box>
    </HStack>
  );
};

export default LinksNav;
