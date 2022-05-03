import React, { useReducer, useEffect } from 'react';
import classes from '../styles/Input.module.css'

import { validate, VALIDATOR_EMAIL, VALIDATOR_MAX, VALIDATOR_MAXLENGTH, VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../utils/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            const { validStatus, errorMessage } = validate(action.val, action.validators, action.inputName);
            return {
                ...state,
                value: action.val,
                isValid: validStatus,
                errorMessage
            };
        case 'TOUCH': {
            const { errorMessage } = validate(action.val, action.validators, action.inputName);
            return {
                ...state,
                isTouched: true,
                errorMessage
            };
        }
        default:
            return state;
    }
};

function ErrorSignal({ inputState }) {
    return (
        <div className={classes.error_signal}>
            {!inputState.isValid && inputState.isTouched && <p className={classes.error_text}>{inputState.errorMessage}</p>}
        </div>
    )
}

function generateValidators(rules) {
    let array = [];
    for (const key in rules) {
        const value = rules[key];
        if (key === 'required' && value === true) {
            array.push(VALIDATOR_REQUIRE());
        }
        if (key === 'minLength') {
            array.push(VALIDATOR_MINLENGTH(value));
        }
        if (key === 'maxLength') {
            array.push(VALIDATOR_MAXLENGTH(value));
        }
        if (key === 'min') {
            array.push(VALIDATOR_MIN(value));
        }
        if (key === 'max') {
            array.push(VALIDATOR_MAX(value));
        }
        if (key === 'email') {
            array.push(VALIDATOR_EMAIL());
        }
    }
    return array;
}

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false,
        errorMessage: ''
    });
    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            inputName: id,
            val: event.target.value,
            validators: generateValidators(props.validators)
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH',
            val: value,
            inputName: id,
            validators: generateValidators(props.validators)
        });
    };

    const element =
        props.element === 'input' ? (
            <div className={classes.input_wrapper}>
                <input
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                    className={classes.input_area}
                />
                <ErrorSignal inputState={inputState} />
            </div>
        ) : (
            <div>
                <textarea
                    id={props.id}
                    cols="30"
                    rows="10"
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    placeholder={props.placeholder}
                    value={inputState.value}
                />
                <ErrorSignal classes={props.classes} inputState={inputState} />
            </div>
        );

    return (
        <>
            {element}
        </>
    );
};

export default Input;
