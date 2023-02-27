import { Resolver } from "react-hook-form"

import { EventFormValues } from "./FormValues";

export const eventResolver: Resolver<EventFormValues> = async (values) => {
  const missingRequired = (!values.hexathon || values.hexathon.length === 0)
    && (!values.name || values.name.length === 0)
    && (!values.type || values.type.length === 0)
    && (!values.startDate || values.startDate.length === 0)
    && (!values.startTime || values.startTime.length === 0)
    && (!values.startTimeMarker || values.startTimeMarker.length === 0)
    && (!values.endDate || values.endDate.length === 0)
    && (!values.endTime || values.endTime.length === 0)
    && (!values.endTimeMarker || values.endTimeMarker.length === 0)
    && (!values.location || values.location.length === 0);

  return {
    values: missingRequired ? {} : values,
    errors: {
          hexathon: (!values.hexathon || values.hexathon.length === 0) ? ({
            type: "required",
            message: "Please select a hexathon."
          }) : undefined,
          name: (!values.name || values.name.length === 0) ? ({
            type: "required",
            message: "Event name is required."
          }) : undefined,
          type: (!values.type || values.type.length === 0) ? ({
            type: "required",
            message: "Please select type."
          }) : undefined,
          startDate: (!values.startDate || values.startDate.length === 0) ? ({
            type: "required",
            message: "Start date is required."
          }) : undefined,
          startTime: (!values.startTime || values.startTime.length === 0) ? ({
            type: "required",
            message: "Start time is required."
          }) : undefined,
          startTimeMarker: (!values.startTimeMarker || values.startTimeMarker.length === 0) ? ({
            type: "required",
            message: "Start time is required."
          }) : undefined,
          endDate: (!values.endDate || values.endDate.length === 0) ? ({
            type: "required",
            message: "End date is required."
          }) : undefined,
          endTime: (!values.endTime || values.endTime.length === 0) ? ({
            type: "required",
            message: "End time is required."
          }) : undefined,
          endTimeMarker: (!values.endTimeMarker || values.endTimeMarker.length === 0) ? ({
            type: "required",
            message: "End time is required."
          }) : undefined,
          location: (!values.location || values.location.length === 0) ? ({
            type: "required",
            message: "Please select a location."
          }) : undefined,
        }
  };
};

