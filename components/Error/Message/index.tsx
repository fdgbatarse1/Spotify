const Message = ({ error }: { error: React.ReactNode }) => {
  return (
    <main className='w-full h-full flex flex-col items-center justify-center'>
      <p className='font-normal text-base text-center md:text-lg 2xl:text-2xl py-6 font-inter text-gray-500'>
        {error}
      </p>
    </main>
  );
};

export default Message;
