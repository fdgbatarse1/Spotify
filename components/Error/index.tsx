import Message from './Message';

interface IError {
  error: string;
  children?: React.ReactNode;
}

const Error = ({ error, children }: IError) => {
  return (
    <div className='w-full h-full flex flex-col justify-start'>
      {children}

      <Message error={error} />
    </div>
  );
};

export default Error;
