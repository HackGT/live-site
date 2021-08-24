import '../App.css';

import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import custom_theme from './Theme'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardTag from './CardTag'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { fetchEvents } from '../services/cmsService';

import placeholder_img from '../assets/blue_wide.png'

const AllEvents: React.FC = () => {
  // var query =  
  // `{
  //   allEvents  (where: {AND:[
  //       {startDate_gt: "2021-03-13T00:00:00.000Z"},
  //       {endDate_lt: "2021-03-14T21:00:00.000Z"}
  //     ]}, orderBy:"startDate") {
  //     id
  //     name
  //     startDate
  //     endDate
  //     description
  //     type {
  //         name
  //         points
  //     }
  //     url
  //     location {
  //       name
  //     }
  //     tags {
  //       name
  //     }
  //   }
  // `;

  // const events = [
  //   {
  //     "title": "Title 1",
  //     "tags": ["super long tag 1", "tag 2", "tag"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "in person"
  //   },
  //   {
  //     "title": "Title 2",
  //     "tags": ["tag 2", "tag"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "in person"
  //   },
  //   {
  //     "title": "Title 3",
  //     "tags": ["super long tag 1", "tag 2"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "in person"
  //   },
  //   {
  //     "title": "Title 1a",
  //     "tags": ["super long tag 1", "tag 2", "tag"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "in person"
  //   },
  //   {
  //     "title": "Title 2b",
  //     "tags": ["tag 2", "tag"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "virtual"
  //   },
  //   {
  //     "title": "Title 3c",
  //     "tags": ["super long tag 1", "tag 2"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "virtual"
  //   },
  //   {
  //     "title": "Title 1ax",
  //     "tags": ["super long tag 1", "tag 2", "tag"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "virtual"
  //   },
  //   {
  //     "title": "Title 2by",
  //     "tags": ["tag 2", "tag"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "virtual"
  //   },
  //   {
  //     "title": "Title 3cz",
  //     "tags": ["super long tag 1", "tag 2"],
  //     "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  //     "event_type": "virtual"
  //   }
  // ]

  let [events, setEvents] = useState<any[]>([])
  const [tagFilter, setTagFilter] = useState("None")
  const [eventFilter, setEventFilter] = useState("None")
  const [tagFilters, setTagFilters] = useState(new Set(['test']));
  const [eventFilters, setEventFilters] = useState(new Set());
  const [filtered_events, set_filtered_events] = useState<any[]>([])





  useEffect(() => {

   const getEvents = async () => {
      const data = await fetchEvents();
      console.log(data.allEvents)
      setEvents(data.allEvents);
    };
    getEvents();
    console.log('here');

   // fetchEvents(query).then(data => {
   //  console.log(data)
   //  console.log(data.allEvents)
   //  for(var i = 0; i < data.allEvents.length; i++) {
   //    var obj = data.allEvents[i];
   //    console.log(obj.tags);
   //  }
   //  setEvents(data.allEvents)
   //  })
    
    // Update filters
    if (tagFilters.size == 0) {
      let filter_set = new Set(["None"])
      for (var i = 0; i < events.length; i++) {
        for (var j = 0; j < events[i]["tags"].length; j++) {
          filter_set.add(events[i]["tags"][j]["name"])
        }
      }
      setTagFilters(filter_set)
    }
    if (eventFilters.size == 0) {
      let filter_set = new Set(["None"])
      for (var i = 0; i < events.length; i++) {
        if (events[i]["location"].length!=0) {
          filter_set.add(events[i]["location"][0]["name"])
        } else {
          filter_set.add("virtual")
        }
      }
      setEventFilters(filter_set)
    }
  });

  const handleTagFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTagFilter(event.target.value as string)
  };

  const handleEventFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEventFilter(event.target.value as string)
  };

  const handle_filter_button = () => {
    if (tagFilter === "None" && eventFilter === "None") {
      set_filtered_events(events.splice(0, 6))
    } else {
      let filtered_list = []
      for (var i = 0; i < events.length; i++) {
        if (tagFilter === "None" && eventFilter !== "None") {
          if (events[i]["location"][0]["name"] === eventFilter) {
            filtered_list.push(events[i])
          }
        } else if (tagFilter !== "None" && eventFilter === "None") {
          for (var j = 0; j < events[i]['tags'].length; j++) {
            if (events[i]['tags'][j]['name'] === tagFilter) {
              filtered_list.push(events[i])
              break;
            }
          }
        } else {
          if (events[i]["location"][0]["name"] === eventFilter) {
            for (var j = 0; j < events[i]['tags'].length; j++) {
              if (events[i]['tags'][j]['name'] === tagFilter) {
                filtered_list.push(events[i])
                break;
              }
            }
            // if (events[i]['tags'].includes(tagFilter)) {
            //   filtered_list.push(events[i])
            // }
          }
        }
      }
      set_filtered_events(filtered_list)
    }
  }

  const StyledButton = withStyles({
    root: {
      background: custom_theme.palette.primary.main,
      borderRadius: 5,
      border: 0,
      color: 'white',
      height: 48,
      fontSize: 16,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

  return (
    <div className="all_events">
      <p className="all_events_title">Upcoming Events</p>
      <div className="all_events_filter_container">
        <p className="all_events_filter_text">Filter by: </p>
        <FormControl className="all_events_filter_dropdown">
          <InputLabel id="tag-select-input">Tag</InputLabel>
          <Select
            labelId="tag-select-label"
            id="tag-select-id"
            value={tagFilter}
            onChange={handleTagFilterChange}
          >
            {
              Array.from(tagFilters).map(function(obj: any) { 
                return <MenuItem value={obj}>{obj}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <FormControl className="all_events_filter_dropdown">
          <InputLabel id="event-select-label">Event Type</InputLabel>
          <Select
            labelId="event-select-label"
            id="event-select-id"
            value={eventFilter}
            onChange={handleEventFilterChange}
          >
            {
              Array.from(eventFilters).map(function(obj: any) { 
                return <MenuItem value={obj}>{obj}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <StyledButton variant="contained" onClick={handle_filter_button} color="primary">Filter</StyledButton>
      </div>
      <div className="all_events_container">
        {
          filtered_events.map(function(event) { 
            return (
              <div className="all_events_card">
                <CardMedia
                  component='img'
                  image={placeholder_img}
                  style={{
                    borderTopLeftRadius: '1.5%',
                    borderTopRightRadius: '1.5%'
                  }}
                />
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography align='left' gutterBottom variant="h5" component="h2">
                        {event.name}
                      </Typography>
                      <Typography align='left' variant="body2" color="textSecondary" component="p">
                        {event.description}
                      </Typography>
                      <CardActions>
                        {
                          event.tags.map(function(obj:any) { 
                            return <CardTag tag={obj}  />;
                          })
                        }
                      </CardActions>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            )
          })
        }
      </div>
      <StyledButton variant="contained" href="/schedule" color="primary">Check Full Schedule</StyledButton>
    </div>
  )
}

export default AllEvents;
