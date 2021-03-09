const _data1 = [
  {
    key:1,
    done: true,
    name: "Arbetsmijlöplan ",
    task: "Upprätta",
    status: "Klart",
    deadline: "",
    assignTo: "Henric Börgeson",
  },
  {
    key:2,
    done: false,
    name: "Produktionsplan",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Rickard Nilsson",
  },
  {
    key:3,
    done: false,
    name: "ADP-plan",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Johan Kvick",
  },
  {
    key:4,
    done: false,
    name: "Skyddsrondsprotokoll",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Johan Thylin",
  },
  {
    key:5,    
    done: true,
    name: "Riskanalyser",
    task: "Upprätta",
    status: "Inskickad",
    deadline: "",
    assignTo: "Johan Kvick",
  },
  {
    key:6,
    done: true,
    name: "KM-plan",
    task: "Upprätta",
    status: "Klar",
    deadline: "",
    assignTo: "Henric Börgeson",
  },
  {
    key:7,
    done: false,
    name: "Kontrollplan",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Johan Kvick",
  },
];

const _data2 = [
  {
    key:8,
    done: true,
    name: "Arbetsmijlöplan",
    task: "Upprätta",
    status: "Klart",
    deadline: "",
    assignTo: "Johan Kvick",
  },
  {
    key:9,
    done: false,
    name: "Produktionsplan",
    task: "Upprätta",
    status: "Ej påbörjad",
    deadline: "",
    assignTo: "Henric Börgeson",
  },
  {
    key:10,
    done: false,
    name: "ADP-plan",
    task: "Upprätta",
    status: "Ej påbörjad",
    deadline: "",
    assignTo: "Rickard Nilsson",
  },
  {
    key:11,
    done: false,
    name: "Skyddsrondsprotokoll",
    task: "Upprätta",
    status: "Ej påbörjad",
    deadline: "",
    assignTo: "Johan Kvick",
  },
];

function Header(props: any) {
  return (
    <div className="top">
      <h1>{props.title}</h1>
      <div className="top-wrapper">
        <ul className="navbar">
          <li className="menu">Overview</li>
          <li className="menu active">Todo</li>
          <li className="menu">Tools</li>
          <li className="menu">Documents</li>
          <li className="menu">Risk</li>
          <li className="menu">Project</li>
          <div className="search-menu">
            <input type="text" name="" placeholder="Search" id="" />
          </div>
        </ul>
      </div>
    </div>
  );
}

function Component1(props: any) {
  const [css, setCss] = React.useState("");

  const [complete, setComplete] = React.useState(true);
  const [data1, setData1] = React.useState(_data1);
  const [data2, setData2] = React.useState(_data2);

  const handleClick1 = (key) => {
    let newData = [...data1];
    let item = data1.find(d => d.key == key);
    if (item) {
      item.done = !item.done
    }
    setData1(newData);
  };

  const handleClick2= (key) => {
    let newData = [...data1];
    let item = data2.find(d => d.key == key);
    if (item) {
      item.done = !item.done
    }
    setData2(newData);
  };


  React.useEffect(() => {
    BridgeStyling.loadStyle("./src/Component1.scss").then((css) => {
      setCss(css);
    });
  });

  if (!css) return null;
  let className = BridgeStyling.useStyle(css);

  return (
    <div className={className}>
      {/* Build component here */}
      {/* You do not have not write React code, normal HTML is also OK */}

      {/* Top */}
      <div className="component">
        <Header title="Mileway, Stockholm" />

        <div className="bottom">
          <div>
            <p className="description">
              Samtliga delar måste vara uppfyllda innan du kan gå vidare till
              nästa steg.
            </p>
            <div className="table-top">
              <table className="table">

                {/* Ahmad: create component GroupHeading */}
                <tbody>
                  <tr>
                    <td colspan="5">
                      <b className="table-name">Mandatory –</b>
                    </td>                            
                  </tr>
                </tbody>                

                {/* Ahmad:  create component TableHeading */}
                <tbody>
                  <tr>
                    <th>Done</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Task</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Deadline</th>
                    <th className="table-header">Assigned to</th>
                  </tr>
                </tbody>

                {/* Ahmad:  create component TableItems */}
                <tbody>
                  {data1.map((item) => (
                    <tr key={item.key} className="table-row">
                      <td width="5%" className="table-box">
                        <button
                          onClick={() => handleClick1(item.key)}
                          className={`${
                            complete === item.done ? "box-green" : "box-gray"
                          }`}
                        ></button>
                      </td>
                      <td width="40%" className="table-item">
                        {item.name}
                      </td>
                      <td width="14%" className="table-item">
                        {item.task}
                      </td>
                      <td width="13%" className="table-item">
                        {item.status}
                      </td>
                      <td width="13%" className="table-item">
                        {item.deadline}
                      </td>
                      <td width="15%" className="table-item">
                        {item.assignTo}
                      </td>
                    </tr>
                  ))}
                </tbody>

                {/* Ahmad:  reuse component GroupHeading */}
                <tbody>
                  <tr>
                    <td colspan="5">
                      <b className="table-name">Ej obligatoriska –</b>
                    </td>                            
                  </tr>
                </tbody>

                {/* Ahmad:  reuse component TableHeading */}
                <tbody>
                  <tr>
                    <th>Done</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Task</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Deadline</th>
                    <th className="table-header">Assigned to</th>
                  </tr>
                </tbody>

                  {/* Ahmad:  reuse component TableItems */}
                <tbody>
                  {data2.map((item) => (
                    <tr key={item.name} className="table-row">
                      <td width="5%" className="table-box">
                        <button
                          onClick={() => handleClick2(item.key)}
                          className={`${
                            complete === item.done ? "box-green" : "box-gray"
                          }`}
                        ></button>
                      </td>
                      <td width="40%" className="table-item">
                        {item.name}
                      </td>
                      <td width="14%" className="table-item">
                        {item.task}
                      </td>
                      <td width="13%" className="table-item">
                        {item.status}
                      </td>
                      <td width="13%" className="table-item">
                        {item.deadline}
                      </td>
                      <td width="15%" className="table-item">
                        {item.assignTo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
