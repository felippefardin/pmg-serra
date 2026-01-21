import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import FontSizeControls from '@/Components/FontSizeControls';
import ThemeToggle from '@/Components/ThemeToggle';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            {/* CABEÇALHO */}
            <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 w-full transition-colors duration-300 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center relative">
                        
                        {/* LADO ESQUERDO */}
                        <div className="flex items-center">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-black dark:text-white transition-colors" />
                                </Link>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex items-center h-16">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <span className="text-black dark:text-white font-bold">Dashboard</span>
                                </NavLink>
                            </div>
                        </div>

                        {/* MEIO (Vazio - Brasão removido) */}

                        {/* LADO DIREITO */}
                        <div className="hidden sm:flex sm:items-center sm:ml-6 gap-4">
                            <div className="flex items-center gap-3 border-r pr-4 mr-2 border-gray-300 dark:border-gray-700">
                                <FontSizeControls 
                                    className="bg-transparent border-gray-300 dark:border-gray-600 text-black dark:text-white"
                                    btnClassName="hover:bg-gray-200 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600"
                                />
                                <ThemeToggle className="bg-transparent text-black dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800" />
                            </div>

                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-bold rounded-md text-black dark:text-white bg-transparent hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                                                {user.name}
                                                <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Sair</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Botão Mobile */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menu Mobile */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-gray-100 dark:bg-gray-900'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            <span className="text-black dark:text-white font-bold">Dashboard</span>
                        </ResponsiveNavLink>
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                             <span className="text-sm text-black dark:text-white font-bold">Acessibilidade</span>
                             <div className="flex gap-2">
                                <FontSizeControls className="bg-transparent border-gray-300 dark:border-gray-600 text-black dark:text-white" btnClassName="hover:bg-gray-200 dark:hover:bg-gray-800" />
                                <ThemeToggle />
                             </div>
                        </div>
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-700">
                        <div className="px-4">
                            <div className="font-bold text-base text-black dark:text-white">{user.name}</div>
                            <div className="font-medium text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Sair</ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-gray-100 dark:bg-gray-900 shadow-none border-b border-gray-200 dark:border-gray-800 transition-colors duration-300 relative z-0">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="text-black dark:text-white">
                            {header}
                        </div>
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}