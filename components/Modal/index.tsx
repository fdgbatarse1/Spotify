import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface IModal {
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  withoutbackground?: boolean;
}

const Modal = ({
  show,
  onClose,
  children,
  title,
  withoutbackground,
}: IModal) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div
      className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-30"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div
        className={`${
          withoutbackground
            ? 'rounded'
            : 'p-2 sm:p-4 max-w-260px sm:max-w-xs lg:max-w-none rounded bg-white'
        }`}
      >
        {title && <div>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    const portal = document.getElementById('modal-root');
    if (portal !== null) {
      return ReactDOM.createPortal(modalContent, portal);
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default Modal;
