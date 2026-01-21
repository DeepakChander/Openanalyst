'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'stroke' | 'fill';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    href,
    onClick,
    variant = 'stroke',
    className = '',
    type = 'button',
    disabled = false,
}) => {
    const baseClasses = `
        group inline-flex items-stretch overflow-hidden transition-all duration-300
        ${variant === 'stroke'
            ? 'border border-black/20 hover:border-black bg-transparent text-black'
            : 'bg-black hover:bg-gray-800 border border-black text-white'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
    `;

    const textClasses = `
        px-6 py-3.5 text-sm font-semibold uppercase tracking-wider
        ${variant === 'stroke' ? 'text-black' : 'text-white'}
    `;

    const arrowContainerClasses = `
        flex items-center justify-center px-4 border-l transition-all duration-300
        ${variant === 'stroke'
            ? 'border-black/20 group-hover:border-black bg-transparent group-hover:bg-black/5'
            : 'border-white/10 bg-white/10 group-hover:bg-white/20'
        }
    `;

    const content = (
        <>
            <span className={textClasses}>{children}</span>
            <span className={arrowContainerClasses}>
                {/* Default arrow */}
                <svg
                    className={`w-4 h-4 transition-all duration-300 group-hover:hidden ${variant === 'stroke' ? 'text-black' : 'text-white'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                {/* Hover arrow (diagonal) */}
                <svg
                    className={`w-4 h-4 transition-all duration-300 hidden group-hover:block ${variant === 'stroke' ? 'text-black' : 'text-white'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 17L17 7M7 7h10v10" />
                </svg>
            </span>
        </>
    );

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseClasses}
        >
            {content}
        </button>
    );
};

export default Button;
