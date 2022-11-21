import React from 'react';

interface IButton {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }
  
  const DarkModeButton = ({ onClick, children, className}: IButton ) => {

    return (
        <button
          className={`p-2 ${className}`} onClick={onClick}>
          {children}
        </button>
    );
  }

export default DarkModeButton;