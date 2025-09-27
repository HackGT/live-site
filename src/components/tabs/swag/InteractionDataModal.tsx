/* eslint-disable */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Spinner,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { apiUrl, handleAxiosError, Service } from "@hex-labs/core";
import { HEXATHON_ID } from "../../../App";
import axios from "axios";

interface Props {
  userId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const InteractionDataModal: React.FC<Props> = props => {
  const [interactions, setInteractions] = useState<any>(null);
  const [loadingInteractions, setLoadingInteractions] = useState(false);

  useEffect(() => {
    const getUserDetailInfo = async () => {
      if (!props.userId) {
        return;
      }

      setLoadingInteractions(true);
      try {
        const response = await axios.request({
          method: "GET",
          url: apiUrl(Service.HEXATHONS, `/interactions`),
          params: {
            hexathon: HEXATHON_ID,
            userId: props.userId,
          },
        });
        setInteractions(response.data);
        setLoadingInteractions(false);
      } catch (error: any) {
        handleAxiosError(error);
      }
    };

    getUserDetailInfo();
  }, [props.userId]);

  if (loadingInteractions) {
    return (
      <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <Spinner />
      </Modal>
    );
  }

  if (!interactions) {
    return null;
  }

  const interactionList =
    interactions.length === 0 ? (
      "No Interactions"
    ) : (
      <UnorderedList>
        {interactions?.map((interaction: any) => {
          if (interaction.type === "event") {
            return <ListItem>{interaction.event?.name}</ListItem>;
          } else if (interaction.type === "scavenger-hunt") {
            return <ListItem>Scavenger Hunt</ListItem>;
          } else if (interaction.type === "expo-submission") {
            return <ListItem>Expo Submission</ListItem>;
          } else if (interaction.type === "check-in") {
            return <ListItem>Check-In</ListItem>;
          }
        })}
      </UnorderedList>
    );

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Interaction Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom="5">{interactionList}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default InteractionDataModal;
