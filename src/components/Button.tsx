'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'stroke' | 'fill' | 'primary' | 'ghost';
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
            ? 'border border-[#E5E5E5] hover:border-[#FF6B00] bg-transparent text-[#1A1A1A]'
            : variant === 'fill'
            ? 'bg-[#1A1A1A] hover:bg-[#FF6B00] border border-[#1A1A1A] text-[#FFFFFF]'
            : variant === 'primary'
            ? 'bg-[#FF6B00] hover:bg-[#E85D00] border border-[#FF6B00] text-[#FFFFFF] shadow-[0_2px_12px_rgba(255,107,0,0.2)] hover:shadow-[0_4px_24px_rgba(255,107,0,0.35)]'
            : 'bg-transparent hover:bg-[rgba(255,107,0,0.04)] border border-transparent text-[#1A1A1A] hover:text-[#FF6B00]'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
    `;

    const textClasses = `
        px-6 py-3.5 text-sm font-semibold uppercase tracking-wider
        ${variant === 'stroke' ? 'text-[#1A1A1A]'
            : variant === 'ghost' ? 'text-[#1A1A1A] group-hover:text-[#FF6B00]'
            : 'text-[#FFFFFF]'}
    `;

    const arrowContainerClasses = `
        flex items-center justify-center px-4 border-l transition-all duration-300
        ${variant === 'stroke'
            ? 'border-[#E5E5E5] group-hover:border-[#FF6B00] bg-transparent group-hover:bg-[rgba(255,107,0,0.04)]'
            : variant === 'primary'
            ? 'border-[rgba(255,255,240,0.15)] bg-[rgba(255,255,240,0.1)] group-hover:bg-[rgba(255,255,240,0.2)]'
            : variant === 'ghost'
            ? 'border-transparent bg-transparent'
            : 'border-[rgba(255,255,240,0.1)] bg-[rgba(255,255,240,0.1)] group-hover:bg-[rgba(255,255,240,0.2)]'
        }
    `;

    const arrowColor = variant === 'stroke' || variant === 'ghost' ? 'text-[#1A1A1A] group-hover:text-[#FF6B00]' : 'text-[#FFFFFF]';

    const content = (
        <>
            <span className={textClasses}>{children}</span>
            <span className={arrowContainerClasses}>
                <svg
                    className={`w-4 h-4 transition-all duration-300 group-hover:hidden ${arrowColor}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <svg
                    className={`w-4 h-4 transition-all duration-300 hidden group-hover:block ${arrowColor}`}
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
