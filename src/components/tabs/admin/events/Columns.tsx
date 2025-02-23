import React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export const Types: { [key: string]: string } = {
  "food": "Food",
  "workshop": "Workshop",
  "ceremony": "Ceremony",
  "tech-talk": "Tech Talk",
  "mini-event": "Mini Event",
  "important": "Important",
  "speaker": "Speaker",
  "mini-challenge": "Mini Challenge",
};

const eventColumns = [
  {
    key: 0,
    enabled: true,
    header: "Name",
    field: "name",
    accessor: (row: any) => (
      <ChakraLink as={Link} to={`/admin/events/${row.id}`}>
        {row.name}
      </ChakraLink>
    ),
  },
  {
    key: 1,
    enabled: false,
    header: "Start Date",
    field: "startDate",
    accessor: (row: any) => dateFormat(row.startDate, "mm/dd/yyyy"),
  },
  {
    key: 2,
    enabled: true,
    header: "Start Time",
    field: "startTime",
    accessor: (row: any) => dateFormat(row.startDate, "hh:MM TT"),
  },
  {
    key: 3,
    enabled: false,
    header: "End Date",
    field: "endDate",
    accessor: (row: any) => dateFormat(row.endDate, "mm/dd/yyyy"),
  },
  {
    key: 4,
    enabled: true,
    header: "End Time",
    field: "endTime",
    accessor: (row: any) => row.endDate ? dateFormat(row.endDate, "hh:MM TT"): "N/A",
  },
  {
    key: 5,
    enabled: true,
    header: "Location",
    field: "location",
    accessor: (row: any) => row.location,
  },
  {
    key: 6,
    enabled: true,
    header: "Type",
    field: "type",
    accessor: (row: any) => Types[row.type],
  },
  {
    key: 7,
    enabled: true,
    header: "Description",
    field: "description",
    accessor: (row: any) => row.description,
  },
];

type StringToArray = {
  [name: string]: any[];
};

const Columns: StringToArray = {
  Events: eventColumns,
};

export default Columns;
