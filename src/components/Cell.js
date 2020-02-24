import React from 'react'

export default function Cell(props) {
    return (
        <button className={`cell cell-${props.value}`} onClick={props.onClick}>
            {props.value}
        </button>
    )
}
