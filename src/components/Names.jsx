export default function Names({ names }) {
  return (
    <>
      <h3>Names</h3>
      <div className="names">
        {names.map((e, i) => {
          return <h2 key={i}>{e}</h2>;
        })}
      </div>
    </>
  );
}
