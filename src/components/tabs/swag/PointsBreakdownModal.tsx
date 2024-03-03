import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { Service, apiUrl } from '@hex-labs/core';

import BlockCollection from '../../common/BlockCollection';

interface PointsBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line arrow-body-style
const PointsBreakdownModal: React.FC<PointsBreakdownModalProps> = ({ isOpen, onClose }) => {
  const [swagShop, setSwagShop] = useState<any[]>([]);

  useEffect(() => {
    const getBlocks = async () => {
      const data = await axios.get(
        apiUrl(
          Service.HEXATHONS,
          `/blocks?hexathon=${String(process.env.REACT_APP_HEXATHON_ID)}&slug=swag`
        )
      );
      setSwagShop(data.data);
    };
    getBlocks();
  }, []);
    return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <BlockCollection title="Swag Shop" blocks={swagShop} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    )
};

export default PointsBreakdownModal;
