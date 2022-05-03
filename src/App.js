import { useEffect, useState } from 'react';
import Form from './components/Form';
import classes from './styles/App.module.css';

function App() {
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch('https://reactchat01.herokuapp.com/user/getHomeForm')
      .then(res => {
        res.json().then(function (data) {
          setForm(data[0])
        });
      })
  }, [])

  return (
    <main className={classes.App}>
      {form && <Form form={form} />}
    </main>
  )
}

export default App;
