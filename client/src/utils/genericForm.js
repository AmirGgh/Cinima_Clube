import React, { useState } from 'react';

function GenericForm(props) {
    const [formData, setFormData] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onSubmit(formData);
    }

    const handleReset = () => {
        setFormData({});
    }
    console.log(formData)
    return (
        <form onSubmit={handleSubmit}>
            {props.fields.map(field => (
                <label key={field.name}>
                    {field.label}:
                    <input type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleChange} />
                </label>
            ))}
            <button type="submit">{props.typeForm}</button>
        </form>
    );
}

export default GenericForm;
