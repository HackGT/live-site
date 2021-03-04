import '../App.css';

type Props = {
  val: string;
};

const CountdownBox: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <div className="CountdownBox">
        <h1 className="CountdownBoxText">{props.val}</h1>
      </div>
    </div>
  )
}

export default CountdownBox;
