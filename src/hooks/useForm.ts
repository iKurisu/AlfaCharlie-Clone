import { useState, SyntheticEvent } from "react";

export type InputHandler = (e: SyntheticEvent<HTMLInputElement>) => void;

const useForm = <T>(initialState: T): [T, InputHandler, () => void] => {
  const [form, setForm] = useState(initialState);

  const updateForm: InputHandler = e => {
    console.log(e.currentTarget.name);
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const resetForm = (): void => setForm(initialState);

  return [form, updateForm, resetForm];
};

export default useForm;
