export function LoginModal({isOpen, toggle}) {
    return (
        <div className="block touch-none overscroll-none no-scrollbar bg-white dark:bg-black bg-opacity-80 transition-all duration-600 fixed w-full h-full overflow-hidden pt-[135px] left-0 z-[60]"
             style={{
                 opacity: `${isOpen ? "1" : "0"}`,
                 top: ` ${isOpen ? "0" : "-100%"}`,
             }}
            tabIndex="-1"
            role="dialog"
        >
            <div className="w-full max-w-md mx-auto">
                <form className=" bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-sm mb-2" htmlFor="username">
                            Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                            {/*<p className="text-red-500 text-xs italic">Please choose a password.</p>*/}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="btn-yellow py-2 px-4 rounded"
                                type="button">
                            Sign In
                        </button>
                        <button
                            className="btn-yellow py-2 px-4 rounded"
                            type="button"
                            onClick={toggle}
                        >
                            Cancel
                        </button>

                    </div>
                    <a className="inline-block align-baseline font-bold text-sm hover:text-blue-800 mt-7" href="#">
                        Forgot Password?
                    </a>
                </form>
            </div>
        </div>)}
