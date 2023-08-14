/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import BlockFormInput from "./FormInputs/BlockFormInput";

interface Props {
  name: string;
}

const EditEntry: React.FC<Props> = props => {
  const { id } = useParams();

  useEffect(() => {
    document.title = `Edit ${props.name.substring(0, props.name.length - 1)}`; // eslint-disable-line no-param-reassign
  }, [props.name]);

  return (
    <Box
      margin="auto"
      marginTop="20px"
      width={{
        base: "100%",
        md: "80%",
      }}
      maxWidth="80%"
    >
      <Heading marginBottom="20px" textAlign="left">
        Update {props.name.substring(0, props.name.length - 1)}
      </Heading>
      {props.name === "Blocks" ? <BlockFormInput id={id} /> : null}
    </Box>
  );
};

export default EditEntry;
