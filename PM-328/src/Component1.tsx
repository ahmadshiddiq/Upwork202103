const data1 = [
  {
    done: true,
    name: "Arbetsmijlöplan ",
    task: "Upprätta",
    status: "Klart",
    deadline: "",
    assignTo: "Henric Börgeson",
  },
  {
    done: false,
    name: "Produktionsplan",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Rickard Nilsson",
  },
  {
    done: false,
    name: "ADP-plan",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Johan Kvick",
  },
  {
    done: false,
    name: "Skyddsrondsprotokoll",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Johan Thylin",
  },
  {
    done: true,
    name: "Riskanalyser",
    task: "Upprätta",
    status: "Inskickad",
    deadline: "",
    assignTo: "Johan Kvick",
  },
  {
    done: true,
    name: "KM-plan",
    task: "Upprätta",
    status: "Klar",
    deadline: "",
    assignTo: "Henric Börgeson",
  },
  {
    done: false,
    name: "Kontrollplan",
    task: "Upprätta",
    status: "",
    deadline: "",
    assignTo: "Johan Kvick",
  },
];

const data2 = [
  {
    done: true,
    name: "Arbetsmijlöplan",
    task: "Upprätta",
    status: "Klart",
    deadline: "",
    assignTo: "Johan Kvick",
  },
  {
    done: false,
    name: "Produktionsplan",
    task: "Upprätta",
    status: "Ej påbörjad",
    deadline: "",
    assignTo: "Henric Börgeson",
  },
  {
    done: false,
    name: "ADP-plan",
    task: "Upprätta",
    status: "Ej påbörjad",
    deadline: "",
    assignTo: "Rickard Nilsson",
  },
  {
    done: false,
    name: "Skyddsrondsprotokoll",
    task: "Upprätta",
    status: "Ej påbörjad",
    deadline: "",
    assignTo: "Johan Kvick",
  },
];

function Component1(props: any) {
  const [css, setCss] = React.useState("");

  const [complete, setComplete] = React.useState(true);
  const handleClick = () => {
    setComplete(!complete);
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
      <div className="container">
        <div className="top">
          <h1>Mileway, Stockholm</h1>
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
        <div className="bottom">
          <div>
            <p className="description">
              Samtliga delar måste vara uppfyllda innan du kan gå vidare till
              nästa steg.
            </p>
            <div className="table-top">
              <b className="table-name">Mandatory –</b>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-box-header">Done</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Task</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Deadline</th>
                    <th className="table-header">Assigned to</th>
                  </tr>
                </thead>
                <tbody>
                  {data1.map((item) => (
                    <tr key={item.name} className="table-row">
                      <td width="5%" className="table-box">
                        <button
                          onClick={handleClick}
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

            <div className="table-bottom">
              <b className="table-name">Ej obligatoriska –</b>
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-box-header">Done</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Task</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Deadline</th>
                    <th className="table-header">Assigned to</th>
                  </tr>
                </thead>
                <tbody>
                  {data2.map((item) => (
                    <tr key={item.name} className="table-row">
                      <td width="5%" className="table-box">
                        <button
                          onClick={handleClick}
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
