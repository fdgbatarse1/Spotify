import { ChangeEvent, useState, InputHTMLAttributes, DetailedHTMLProps } from 'react';

function useField(
  field: Partial<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>,
  initialValue?: string | undefined | null,
) {
  const [value, setValue] = useState(initialValue || '');
  const [error, setError] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return [
    {
      error,
      setError,
      setValue,
      input: {
        ...field,
        onChange,
        value,
      },
      onReset,
    },
  ];
}

export default useField;
