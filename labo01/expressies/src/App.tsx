


const App = () => {
  let random = Math.random();
  let getal1 = Math.floor(Math.random() * 10);
  let getal2 = Math.floor(Math.random() * 10);

  return (
      <div>
          <h1>Labo 1</h1>
          <p>Random: {random}</p>
          <p>Getal 1: {getal1}</p>
          <p>Getal 2: {getal2}</p>
          <p>Getal 1 + 2 : {getal1 + getal2} </p>
      </div>
  );
}

export default App;