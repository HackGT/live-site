import React from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Container, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ItemEditForm from "./ItemEditForm";

const CreateItem = () => {
  const navigate = useNavigate();

  return (
    <Container p="8">
      <Button variant="link" size="lg" onClick={() => navigate(-1)}>
        <ArrowBackIcon mr={2} /> Back
      </Button>
      <Heading mt={2}>Create Item</Heading>
      <ItemEditForm />
    </Container>
  );
};

export default CreateItem;