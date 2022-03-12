import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  chakra,
  Icon,
  IconButton
} from "@chakra-ui/react";
import { TimeIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import dateFormat from "dateformat";

const Column1 = chakra(Box, {
  baseStyle: {
    verticalAlign: "top",
    px: "15px",
    paddingTop: "25px",
    display: "inline-block",
    fontSize: "14px",
  },
})

const Column2 = chakra(Box, {
  baseStyle: {
    verticalAlign: "top",
    px: "15px",
    paddingBottom: "25px",
    display: "inline-block",
  }
})

const Column3 = chakra(Box, {
  baseStyle: {
    verticalAlign: "top",
    marginTop: "50px",
    display: "inline-block",
    textAlign: "center",
  }
})

const LocationIcon = (props: any) => (
  <Icon viewBox="0 0 297 297" {...props}>
    <path
      fill="currentColor"
      d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645   c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645   C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892   c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z"
    />
    <path
      fill="currentColor"
      d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614   c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901   c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104   C179.265,127.948,165.464,141.901,148.5,141.901z"
    />
  </Icon>
)

const formatDateString = (date: string) => dateFormat(date, "h:MM TT");

export const EventRow = (props: any) => {
  const [expandable, setExpandable] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const widthRef = useRef<HTMLDivElement>(null);

  const checkTextOverflow = () => {
    if (widthRef.current !== null) {
      setExpandable(widthRef.current.offsetHeight < widthRef.current.scrollHeight);
    }
  }

  useEffect(() => {
    checkTextOverflow();
  }, []);

  window.addEventListener("resize", () => {
    checkTextOverflow();
  })

  return (
    <Box
      style={{
        minHeight: "120px",
        paddingRight: "15px",
        paddingLeft: "15px",
        borderBottomWidth: "2px",
        borderBottomColor: "rgba(175, 175, 175, 0.3)",
      }}
      key={props.row.id}
    >
      <Column1
        w={{ base: "100%", md: "25%"}}
        paddingBottom={{ sm: "10px", md: "25px"}}
      >
        <Box
          marginBottom="15px"
          lineHeight="24px"
          textAlign={{ base: "center", md: "left" }}
        >
          <TimeIcon fontSize="16px" marginRight="15px"/>
          {`${formatDateString(props.row.startDate)} - ${formatDateString(props.row.endDate)}`}
        </Box>
        <Box
          textAlign={{ base: "center", md: "left" }}
        >
          {props.row.location.length != 0 ? (
            <>
              <LocationIcon fontSize="18px" marginRight="15px"/>
              {props.row.location.map((x: any) => x.name).join(", ")}
            </>
          ) : null}
        </Box>
      </Column1>
      <Column2
        w={{ base: "100%", md: "75%"}}
        paddingTop={{ base: "5px", md: "25px" }}
      >
        <Box
          w="100%"
          fontSize={{ base: "16px", md: "20px" }}
          fontWeight="semibold"
          marginBottom="15px"
          lineHeight="24px"
          noOfLines={!expanded ? 1 : undefined}
          textAlign={{ base: "center", md: "left" }}
        >
          {props.row.name}
        </Box>
        <Box
          w={!expandable ? "95%" : "100%"}
          fontSize={{ base: "14px", md: "16px" }}
          noOfLines={!expanded ? 2 : undefined}
          display="inline-block"
          ref={widthRef}
        >
          {props.row.description}
        </Box>
        {
          expandable ? (
            <Column3 w="5%">
              <IconButton
                isRound
                bg="none"
                aria-label="Expand Description"
                icon={expanded ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                onClick={() => {
                  setExpanded(!expanded);
                }}
              />
            </Column3>
          ) : null
        }
      </Column2>
    </Box>
  )
}