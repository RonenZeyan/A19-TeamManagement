import React from 'react';

/**
 * This page is used to display more detailed information about the TeamPower application.
 * @returns and html code of page 
 */
export default function LearnMorePage() {
    return (
        <div className="relative isolate px-6 pt-2">
            <div className="mx-auto max-w-3xl py-32">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-[royalblue]">Discover TeamPower</h1>
                    <p className="mt-6 text-lg leading-8 text-gray">
                        TeamPower is your comprehensive solution for efficient task management and team collaboration. With intuitive features designed to streamline workflow, you can easily monitor tasks and assign responsibilities.
                    </p>
                </div>

                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-center text-[royalblue]">Key Features</h2>
                    <ul className="mt-6 list-disc list-inside text-left text-lg text-gray">
                        <li>Task Assignment and Monitoring: Easily assign tasks and monitor progress in real-time.</li>
                        <li>Team Collaboration: Enhance team communication and collaboration with integrated chat and discussion forums.</li>
                        <li>Intuitive Dashboard: Get a bird's-eye view of your team's activities and performance metrics.</li>
                        <li>Customizable Workflows: Tailor workflows to suit your team's specific needs and processes.</li>
                        <li>Reporting and Analytics: Generate detailed reports to analyze team performance and task completion.</li>
                    </ul>
                </div>

                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-center text-[royalblue]">Use Cases</h2>
                    <p className="mt-6 text-lg leading-8 text-gray">
                        Whether you are managing a small team or a large organization, TeamPower is designed to adapt to your needs. Here are some scenarios where TeamPower excels:
                    </p>
                    <ul className="mt-6 list-disc list-inside text-left text-lg text-gray">
                        <li>Project Management: Keep your projects on track with efficient task allocation and timeline tracking.</li>
                        <li>Remote Teams: Foster collaboration and communication among remote team members with ease.</li>
                        <li>Event Planning: Organize events seamlessly with dedicated task lists and milestone tracking.</li>
                        <li>Product Development: Coordinate development efforts and track progress from ideation to release.</li>
                    </ul>
                </div>

                <div className="mt-10 text-center">
                    <a href="/login" className="text-[royalblue] hover:text-white border border-[royalblue] hover:bg-[royalblue] focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Get Started →</a>
                </div>
            </div>
        </div>
    );
}
