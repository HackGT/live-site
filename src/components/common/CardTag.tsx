import React from "react";

type Props = {
  tag: string;
};

const CardTag: React.FC<Props> = (props: Props) => (
  <div>
    <div className="card_tag">{props.tag}</div>
  </div>
);

export default CardTag;
