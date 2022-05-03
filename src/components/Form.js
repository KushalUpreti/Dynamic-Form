import Input from '../components/Input';
import { useForm } from '../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../utils/validators';
import classes from '../styles/Form.module.css'

const Form = () => {
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
        <div className={classes.form_wrapper}>
            <h2 className={classes.form_heading}>User Information Form</h2>
            <p className={classes.form_sub_heading}>Enter your user details in this form</p>
            <form className={classes.form}>
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
        </div>
    );

}

export default Form;