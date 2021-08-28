import '../App.css';

type Props = {
  tag: string;
};

const CardTag: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <div className="card_tag">{props.tag}</div>
    </div>
  )
}

export default CardTag;
