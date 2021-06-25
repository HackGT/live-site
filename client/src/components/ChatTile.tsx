import '../App.css';

type Props = {
  name: string;
  content: string;
  selfOrigin: boolean;
};

const ChatTile: React.FC<Props> = (props: Props) => {
  if (props.selfOrigin) {
    return (
        <div>
          <div className="chatTile">
            <h1 className="chatTileTextYou">(you)</h1>
            <h1 className="chatTileText">{props.content}</h1>
          </div>
        </div>
      )
  } else {
    return (
        <div>
          <div className="chatTile">
            <h1 className="chatTileTextOther">{props.name}</h1>
            <h1 className="chatTileText">{props.content}</h1>
          </div>
        </div>
      )
  }
}

export default ChatTile;
