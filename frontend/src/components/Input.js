import React, { forwardRef} from 'react'
import { isEmpty } from '../utils'
import './Input.css'

const Input = forwardRef((props, ref)  => {
    switch(props.type) {
        case "text":
            return (
                <div className={["input_group", props.className].join(" ")}>
                    {
                        !isEmpty(props.removeLabel)
                        ? <p>{props.placeholder}</p>
                        : !props.removeLabel
                            ? <p>{props.placeholder}</p>
                            : null
                    }
                    <input
                        onChange={props.changed}
                        onBlur={props.blurred}
                        onFocus={props.focussed}
                        type="text"
                        ref={ref}
                        defaultValue={props.value}
                        className="input"
                        disabled={props.disabled}
                        placeholder={props.placeholder}
                    />
                    {
                        isEmpty(props.errors)
                        ? <p>{props.errors}</p>
                        : null
                    }
                </div>
            )
        case "textarea":
            return (
                <div className={["textarea_container", props.className].join(" ")}>
                    <p>{props.placeholder}</p>
                    <textarea
                        onChange={props.changed}
                        type="text"
                        value={props.value}
                        placeholder={props.placeholder}
                        className="textarea"
                        disabled={props.disabled}
                    />
                    {
                        isEmpty(props.errors)
                        ? <p>{props.errors}</p>
                        : null
                    }
                </div>
            );
        default:
            return (
                <div className={["input_group", props.className].join(" ")}>
                    <p>{props.placeholder}</p>
                    <input
                        ref={ref}
                        defaultValue={props.value}
                        onChange={props.changed}
                        placeholder={props.placeholder} 
                        autoComplete={props.autoComplete}
                        type={props.type ? props.type : "text"}
                    />
                    {
                        isEmpty(props.errors)
                        ? <p>{props.errors}</p>
                        : null
                    }
                </div>
            )
    }
})

export default Input