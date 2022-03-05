import React, { useState, useEffect } from "react";
import MediaQuery from "react-responsive";
import { Image, ComponentStyleConfig, Input, Select, FormControl, Button, Box, Text } from '@chakra-ui/react'
import CardTag from "../../common/CardTag";
import theme from "../../Theme";
import { fetchAllEvents } from "../../../services/cmsService";
import { getRandomCardImage } from "../../common/CardImg";

type Props = {
  setEventCallback: any;
};

const AllEvents: React.FC<Props> = (props: Props) => {
  const [events, setEvents] = useState<any[]>([]);
  const [tagFilter, setTagFilter] = useState("None");
  const [locationFilter, setLocationFilter] = useState("None");
  const [tagFilters, setTagFilters] = useState(new Set());
  const [locationFilters, setLocationFilters] = useState(new Set());
  const [filtered_events, set_filtered_events] = useState<any[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchAllEvents(true);
      const events = data.allEvents;
      setEvents(events);
      set_filtered_events(events.slice(0, 6));

      // Update possible tag filters
      if (tagFilters.size === 0) {
        const tag_filter_set = new Set(["None"]);
        for (let i = 0; i < events.length; i++) {
          for (let j = 0; j < events[i].tags.length; j++) {
            tag_filter_set.add(events[i].tags[j].name);
          }
        }
        setTagFilters(tag_filter_set);
      }

      // Update possible location filters
      if (locationFilters.size === 0) {
        const location_filter_set = new Set(["None"]);
        for (let i = 0; i < events.length; i++) {
          for (let j = 0; j < events[i].location.length; j++) {
            location_filter_set.add(events[i].location[j].name);
          }
        }
        setLocationFilters(location_filter_set);
      }
    };
    getEvents();
  }, []);

  const handleTagFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTagFilter(event.target.value as string);
  };

  const handleEventFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocationFilter(event.target.value as string);
  };

  // This function is called when the filter button is clicked
  // It should return a list of events that have the tags specified by the filters!
  // If there are both filters, we show events have have the tag filter OR the location filter.
  const handle_filter_button = () => {
    if (tagFilter === "None" && locationFilter === "None") {
      set_filtered_events(events.slice(0, 6));
    } else {
      const location_filtered_set = new Set();
      const tag_filtered_set = new Set();

      // Loop through each event
      for (let i = 0; i < events.length; i++) {
        if (locationFilter !== "None") {
          // If there is a location filter and no tag filter
          for (let j = 0; j < events[i].location.length; j++) {
            if (events[i].location[j]?.name === locationFilter) {
              location_filtered_set.add(events[i]);
              break;
            }
          }
        } else {
          location_filtered_set.add(events[i]);
        }
        if (tagFilter !== "None") {
          // If there is a tag filter but no location filter
          for (let j = 0; j < events[i].tags.length; j++) {
            if (events[i].tags[j].name === tagFilter) {
              tag_filtered_set.add(events[i]);
              break;
            }
          }
        } else {
          tag_filtered_set.add(events[i]);
        }
      }

      const location_filtered_list = Array.from(location_filtered_set);
      const filtered_list = [];
      for (let k = 0; k < location_filtered_list.length; k++) {
        if (tag_filtered_set.has(location_filtered_list[k])) {
          filtered_list.push(location_filtered_list[k]);
        }
      }
      set_filtered_events(filtered_list);
    }
  };

  return (
    <div className="all_events">
      <p className="all_events_title">All Events</p>
      <div className="all_events_filter_container">
        <p className="all_events_filter_text"> Search: </p>
        <FormControl className="all_events_filter_dropdown">
          <Select
            id="tag-select-id"
            value={tagFilter}
            onChange={handleTagFilterChange}
            placeholder="Tag"
          >
            {Array.from(tagFilters).map((obj: any) => (
              <option value={obj}>{obj}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl className="all_events_filter_dropdown">

          <Select

            id="event-select-id"
            value={locationFilter}
            onChange={handleEventFilterChange}
            placeholder="Location"
          >
            {Array.from(locationFilters).map((obj: any) => (
              <option value={obj}>{obj}</option>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handle_filter_button} color="primary" borderRadius="5" loadingText='Submitting' size='md'>
          Filter
        </Button>
      </div>
      <div className="all_events_container">
        <MediaQuery minWidth={900}>
          {filtered_events.map(event => (
            <div className="all_events_card">
              <Image
                src={getRandomCardImage()}
                style={{
                  borderTopLeftRadius: "1.5%",
                  borderTopRightRadius: "1.5%",
                  height: "130px",
                }}
              />
              <Box>
                <Box onClick={() => props.setEventCallback(event)}>
                  <Box borderWidth='3px' borderRadius='1px'>
                    <Text align="center" fontSize='lg'>
                      {event.name}
                    </Text>
                    <Text align="left" fontSize='lg' padding="10px">
                      {event.description}
                    </Text>
                    <Box>
                      {event.tags.map((tag: any, index: number) => (
                        <CardTag tag={tag.name} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
        </MediaQuery>
        <MediaQuery maxWidth={900}>
          {filtered_events.map(event => (
            <div className="all_events_card">
              <Box>
                <Box onClick={() => props.setEventCallback(event)}>
                  <Box>
                    <Text align="left" fontSize = 'lg'>
                      {event.name}
                    </Text>
                    <Text align="left" fontSize = 'md'>
                      {event.description}
                    </Text>
                    <Box>
                      {event.tags.map((tag: any, index: number) => (
                        <CardTag tag={tag.name} />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </div>
          ))}
        </MediaQuery>
      </div>
      <Button>
        <a href="\schedule">
          Check Full Schedule
        </a>
      </Button>

    </div>
  );
};

export default AllEvents;
