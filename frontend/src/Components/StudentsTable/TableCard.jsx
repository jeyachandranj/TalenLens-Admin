import "./StudentsTable.css";
const TableCard = ({value}) => {
  return (
    <section>
      <div className="table-content">
        <li>{value.name}</li>
        <li>{value.mail}</li>
        <li>{value.exp}</li>
        <li style={{marginLeft:"5vh"}}>{value.company}</li>
      </div>
    </section>
  );
};

export default TableCard;
