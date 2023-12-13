import { useState } from "react";
import { Form } from "react-router-dom";

export const LogCreateForm = () => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = async (event) => {
        
    }

    return (
        <Form method="post" onSubmit={onSubmit} >
            <textarea
                value={inputValue}
                onChange={handleChange}
                rows={4} // Set the number of visible rows
                cols={50} // Set the number of visible columns
                placeholder="Type your text here..."
            />
            <br></br>
            <input type="submit" value="Log" />
        </Form>
    );
}