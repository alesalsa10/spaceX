import React from 'react'
import filter from '../../actions/index';
import {useDispatch} from 'react-redux'

export default function Filter() {
    const dispatch = useDispatch();
    return (
        <>
            <label for="cars">Choose a car:</label>

            <select name="cars" id="cars" onChange={()=>dispatch(filter())}>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
        </>
    )
}
