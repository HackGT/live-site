/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react"
import { useParams } from "react-router-dom";

import BlockFormInput from "./FormInputs/BlockFormInput";


interface Props {
  name: string;
}

const EditEntry: React.FC<Props> = (props) => {
  const { id } = useParams();

  useEffect(() => {
    console.log(props)
    document.title = "Edit ".concat(props.name.substring(0, props.name.length - 1), " – HexLabs Schedule")
  }, [])

  return (
    <Box 
      margin="auto"
      marginTop="20px"
      width={{
        base: "90%",
        md: "80%"
      }}
      maxWidth="600px"
    >
      <Heading marginBottom="20px">
        Update {props.name.substring(0, props.name.length - 1)}
        
      </Heading>
      {
        (props.name === "Blocks") ? (
         
          <BlockFormInput id={id}/>
        ) : null
      }
    </Box>
  );
}

export default EditEntry; 