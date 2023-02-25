import { useState, useCallback } from "react";

function useGenericForm(inputFields) {
    const [formData, setFormData] = useState({});

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }, []);

    const handleSubmit = useCallback(() => {
        const formValues = {};
        inputFields.forEach((input) => {
            formValues[input.name] = formData[input.name];
        });
        return formValues;
    }, [formData, inputFields]);

    return { formData, handleInputChange, handleSubmit };
}

export default useGenericForm;
