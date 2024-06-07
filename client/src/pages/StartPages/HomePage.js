


/**
 * this component used for display the global home (before user loggedIN)
 * @returns a html code of page 
 */
export default function Home(){
    return (
        <div >
        <div className="relative isolate px-6 pt-2">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 ">

                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-[royalblue]">TeamPower Management, building, connect</h1>
                    <p className="mt-6 text-lg leading-8 text-gray">
                    TeamPower is your comprehensive solution for efficient task management and team collaboration. With intuitive features designed to streamline workflow, you can easily monitor tasks and assign responsibilities.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/login" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                    <a href="/learnMore" className="text-sm font-semibold leading-6">Learn more <span aria-hidden="true">→</span></a>
                    </div>
                </div>
            </div>
   
        </div>
        </div>

    )
}