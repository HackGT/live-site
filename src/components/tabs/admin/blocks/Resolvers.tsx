import { Resolver } from "react-hook-form"

import { BlockFormValues } from "./FormValues";

export const blockResolver: Resolver<BlockFormValues> = async (values) => {
  const missingRequired = (!values.hexathon || values.hexathon.length === 0)
    && (!values.title || values.title.length === 0)
    && (!values.content|| values.content.length === 0)
    && (!values.slug|| values.slug.length === 0);

  return {
    values: missingRequired ? {} : values,
    errors: {
          hexathon: (!values.hexathon || values.hexathon.length === 0) ? ({
            type: "required",
            message: "Please select a hexathon."
          }) : undefined,
          name: (!values.title || values.title.length === 0) ? ({
            type: "required",
            message: "Block title is required."
          }) : undefined,
          type: (!values.content|| values.content.length === 0) ? ({
            type: "required",
            message: "Content cannot be empty."
          }) : undefined,
          startDate: (!values.slug || values.slug.length === 0) ? ({
            type: "required",
            message: "Slug is required."
          }) : undefined,
        }
  };
};

