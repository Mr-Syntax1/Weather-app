import React, { type ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className={`max-w-4xl text-gray-800 dark:text-gray-200 mx-auto px-4 `}>
            {children}
        </div>
    );
};

export default Container;