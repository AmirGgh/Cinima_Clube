import React from "react";
import useGenericForm from "./utils";

function MyComponent() {
    const inputFields = [
        { name: "name", type: "text", defaultValue: "" },
        { name: "email", type: "email", defaultValue: "" },
    ];

    const { formData, handleInputChange, handleSubmit } = useGenericForm(
        inputFields
    );

    const handleClick = () => {
        const formValues = handleSubmit();
        console.log(formValues);
    };

    return (
        <form>
            {inputFields.map((input) => (
                <input
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    defaultValue={input.defaultValue}
                    onChange={handleInputChange}
                />
            ))}
            <button type="button" onClick={handleClick}>
                Submit
            </button>
        </form>
    );
}
