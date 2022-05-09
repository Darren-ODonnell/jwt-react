import React from "react";
import { useForm } from "react-hook-form";

export const UseFormDialog = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log(errors, e);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <input {...register("firstName")} />
            <input {...register("lastName")} />
            <button type="submit">Submit</button>
        </form>
    );
}

