import React from "react";
import { Button, Text, Box, Heading, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";

const NoItemsFound = ({ searchQuery, user }: any) => {
  if (!searchQuery) {
    return (
        <Box style={{ marginTop: 10 }}>
        <Text>No items here!  </Text>
        <p>
          This location doesn't have any items you can see. Try again later, or contact a HackGT
          staff member for further assistance.
        </p>
        {user && user.admin && (
          <>
            <Button as={Link} to="/admin/items/new">
              Create item
            </Button>
            <Button as={Link} to="/admin/csv">
              Import items
            </Button>
          </>
        )}
        </Box>
    );
  }

  return (
    <Box textAlign="center" style={{ marginTop: 10 }}>
      <Heading>
        <ViewIcon />
        No matching items were found
      </Heading>
      If you're trying to find something specific, you can ask a staff member at the HackGT hardware
      desk staff for help!
    </Box>
  );
};

export default NoItemsFound;
