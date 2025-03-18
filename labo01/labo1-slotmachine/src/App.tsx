const App = () => {
  let slot1 = Math.floor(Math.random() *5);
  let slot2 = Math.floor(Math.random() *5);
  let slot3 = Math.floor(Math.random() *5);

  let img = ["/cherry.png","/grape.png,","/lemon.png","/seven.png","/watermelon.png"];




  return (
      <div>
          <h1>Labo 1 : slotmachine</h1>

          <p>s1 {slot1}</p>
          <p>s2 {slot2}</p>
          <p>s3 {slot3}</p>

          <div>{slot1 == slot2 && slot2 == slot3 ? <p>We hebben gewonnen</p> : <p>We hebben verloren</p>}</div>
          <img src="/cherry.png" alt="cherry" width={100} />
          <img src="/grape.png" alt="cherry" width={100} />
          <img src="/lemon.png" alt="cherry" width={100} />
          <img src="/seven.png" alt="cherry" width={100} />
          <img src="/watermelon.png" alt="cherry" width={100} />
          <p>slots</p>

          <img src={img[slot1]} alt="slot1" width={100} />
          <img src={img[slot2]} alt="slot2" width={100} />
          <img src={img[slot3]} alt="slot3" width={100} />







      </div>
  );
}

export default App;