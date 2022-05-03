import Input from './components/Input';
import { useForm } from './hooks/form-hook';
import classes from './styles/App.module.css';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from './utils/validators';

function App() {

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
    },
    false
  );


  return (
    <main className={classes.App}>
      <form>
        <Input
          id="username"
          element="input"
          type="text"
          placeholder="Username"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <Input
          id="password"
          element="input"
          type="password"
          placeholder="Password"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />

        <Input
          id="email"
          element="input"
          type="email"
          placeholder="Email"
          validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_EMAIL()]}
          onInput={inputHandler}
        />
      </form>
    </main>
  );
}

export default App;
