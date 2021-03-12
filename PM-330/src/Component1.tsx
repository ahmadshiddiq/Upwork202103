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

function GroupHeading(props: any) {
  return (
    <tbody>
      <tr>
        <td colSpan="5">
          <b className="table-name">{props.title}</b>
        </td>
      </tr>
    </tbody>
  );
}

function TableHeading(props: any) {
  return (
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
  );
}

function TableItems(props: any) {
  const handleClick = (key) => {
    props.switchButton(key);
  };

  return (
    <tbody>
      {props.group.data.map((item) => (
        <tr key={item.key} className="table-row">
          <td width="5%" className="table-box">
            <button
              onClick={() => handleClick(item.key)}
              className={`${
                props.buttons[item.key] ? "box-green" : "box-gray"
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
      <tr className="spacing-after">
        <td colSpan="6"></td>
      </tr>
    </tbody>
  );
}

function Component1(props: any) {
  const [css, setCss] = React.useState("");

  const [buttons, setButtons] = React.useState({});

  let switchButton = (key: string) => {
    let newButtons = { ...buttons };
    newButtons[key] = !newButtons[key];
    setButtons(newButtons);
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
                {_data.map((d) => (
                  <React.Fragment key={d.title}>
                    <GroupHeading title={d.title} />
                    <TableHeading />
                    <TableItems
                      buttons={buttons}
                      group={d}
                      switchButton={switchButton}
                    />
                  </React.Fragment>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
