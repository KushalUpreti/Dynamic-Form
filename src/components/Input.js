import React, { useReducer, useEffect } from 'react';
import classes from '../styles/Input.module.css'

import { validate } from '../utils/validators';

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
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH',
            val: value,
            inputName: id,
            validators: props.validators
        });
    };

    const element =
        props.element === 'input' ? (
            <>
                <input
                    id={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                />
                <ErrorSignal inputState={inputState} />
            </>
        ) : (
            <>
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
            </>
        );

    return (
        <>
            {element}
        </>
    );
};

export default Input;
