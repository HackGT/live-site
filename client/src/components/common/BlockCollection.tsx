import React from "react";
import ReactMarkdown from "react-markdown";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import styles from "./markdown_styles.module.css";

type Props = {
  blocks: Array<any>;
  title: string;
};

const BlockCollection: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <div className="block_title_container">
        <p className="block_title">{props.title}</p>
      </div>
      <div className="block_card_container">
        {props.blocks.map((block: any) => (
          <Card className="blocks_card">
            <CardContent>
              <div className="block_card_title">{block.name}</div>
              <ReactMarkdown className={styles.reactMarkDown}>
                {block.content}
              </ReactMarkdown>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlockCollection;
