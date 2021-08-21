import '../App.css';

type Props = {
  val: string;
};

const CountdownBox: React.FC<Props> = (props: Props) => {
  // var query =  
  //   `{
  //     allEvents  (where: {AND:[
  //         {startDate_gt: "2021-03-13T00:00:00.000Z"},
  //         {endDate_lt: "2021-03-14T21:00:00.000Z"}
  //       ]}, orderBy:"startDate") {
  //       name
  //       startDate
  //       url
  //     }
  //   }
  //   `;

  // async function fetchEvents(query: string) {
  //   var res = await fetch("https://cms.hack.gt/admin/api", {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ query: query }),
  //   });
  //   var jsonResponse = await res.json();
  //   return jsonResponse.data;
  // }
  
  // fetchEvents(query).then(data => {
  //   console.log(data.allEvents)
  // })

  return (
    <div>
      <div className="CountdownBox">
        <h1 className="CountdownBoxText">{props.val}</h1>
      </div>
    </div>
  )
}

export default CountdownBox;
