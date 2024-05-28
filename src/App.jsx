import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleButtonClick = () => {
    // Llamada a la API dummy para obtener datos
    fetch(`https://my-json-server.typicode.com/Kado12/API-dummy/days`)
      .then(response => response.json())
      .then(data => setData(data));
  };
  const addDate = (id, horario) => {
    setSelectedData({ id, horario })
    if (selectedData) {

      console.log(selectedData)
      alert(`Separaste a ${selectedData.id}`)
    }
  }

  // if (data) {
  //   console.log(data)
  //   console.log(data[0])
  //   console.log(data[0].personal_disponible)
  //   console.log(data[0].personal_disponible[0])
  //   console.log(data[0].personal_disponible[0].nombre)
  //   console.log(data[0].personal_disponible[0].horario)
  //   console.log(date.toLocaleDateString())
  //   console.log(date.toISOString().slice(0, 10))
  // }

  return (
    <div className='container'>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      />
      <button className='container-button' onClick={handleButtonClick}>Disponibilidad</button>
      {data && (
        <div>
          <h2>Datos para el día {date.toLocaleDateString()}</h2>
          <ul>
            {data.map(item => (
              item.fecha === date.toISOString().slice(0, 10) ? (
                item.personal_disponible.map(personal => (
                  <li key={personal.id}>
                    <p>{personal.nombre}</p>
                    {personal.horario.length > 1 ? (<a onClick={() => { addDate(personal.id, personal.horario[0] + ' ' + personal.horario[1]) }}>{personal.horario[0]}  {personal.horario[1]}</a>) : <a onClick={() => { addDate(personal.id, personal.horario[0]) }}>{personal.horario[0]}</a>}
                  </li>
                ))
              ) : null
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;