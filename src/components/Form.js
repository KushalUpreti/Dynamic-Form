import Input from '../components/Input';
import { useForm } from '../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../utils/validators';
import classes from '../styles/Form.module.css'

const Form = ({ form }) => {
    let obj = {};
    Object.keys(form.fields).forEach(item => {
        obj[item] = {
            value: '',
            isValid: false
        }
    })

    const [formState, inputHandler] = useForm(
        {
            ...obj
        },
        false
    );

    function formSubmitHandler(e) {
        e.preventDefault();
        if (!formState.isValid) {
            alert("Fill the form properly to submit");
            return;
        }
    }

    return (
        <div className={classes.form_wrapper}>
            <h2 className={classes.form_heading}>{form.title}</h2>
            <p className={classes.form_sub_heading}>{form.description}</p>
            <form className={classes.form} onSubmit={formSubmitHandler}>
                {Object.values(form.fields).map((input, index) => {
                    return <Input
                        key={index}
                        id={input.placeholder}
                        element={input.inputType}
                        type={input.type}
                        placeholder={input.placeholder}
                        validators={input.validations}
                        onInput={inputHandler}
                    />
                })}

                <input type="submit" value="Submit" className={classes.form_submit} />
            </form>
        </div>
    );

}

export default Form;