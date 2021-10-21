import '../App.css';
import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
 
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import custom_theme from './Theme'

import { fetchUpcomingEvents } from '../services/cmsService';

type Props = {
  tableLength: number;
};

const Schedule: React.FC<Props> = (props: Props) => {

  let [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    const getEvents = async () => {
       const data = await fetchUpcomingEvents();
       let sortedData = data.allEvents.sort(function(a: any, b: any) {
         let dateA = a.startDate;
         let dateB = b.startDate;
         return dateA >= dateB ? 1 : -1;
       })
       setEvents(sortedData.slice(0, props.tableLength));
     };
     getEvents();
   }, []);

  const formateDateString = (date: string) => {
    return dateFormat(date, "h:MM TT Z")
  }

  const getDayFromDate = (date: string) => {
    return dateFormat(date, "mmm dS")
  }

  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        backgroundColor: custom_theme.palette.primary.main,
        color: theme.palette.common.white
      },
      body: {
        fontSize: 14,
      },
    }),
  )(TableCell);

  return (
    <div className="schedule">
      <p className="schedule_title">Schedule</p>
      <TableContainer className="schedule_table" component={Paper} style={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="simple table" style={{
          tableLayout: "fixed",
          minWidth: "1100px", overflow: "auto"
        }}>
          <colgroup>
              <col width="15%" />
              <col width="40%" />
              <col width="8" />
              <col width="10%" />
              <col width="8%" />
              <col width="7%" />
              <col width="7%" />
          </colgroup>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Link</StyledTableCell>
              <StyledTableCell align="left">Location</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Start Time</StyledTableCell>
              <StyledTableCell align="left">End Time</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">
                  <a href={row.url} target="_blank">{row.url ? ("Join Here!"):("")}</a>
                </TableCell>
                <TableCell style={{width: 'max-content'}} align="left">{row.location.map((x: any) => x.name).join(", ")}</TableCell>
                <TableCell style={{width: 'max-content'}} align="left">{getDayFromDate(row.startDate)}</TableCell>
                <TableCell align="left">{formateDateString(row.startDate)}</TableCell>
                <TableCell align="left">{formateDateString(row.endDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Schedule;
