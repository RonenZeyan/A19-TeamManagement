import React from 'react';


/**
 * this is the FAQs page including information and questions and answers about our website
 * @returns - a html code of the FAQs page 
 */

const FAQs = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5">Frequently Asked Questions</h1>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">What is TeamPower?</h2>
        <p>
          TeamPower is a web application designed to streamline task management within teams. It allows managers to efficiently monitor and assign tasks to employees, fostering collaboration and optimizing workflow.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">What are the main features of TeamPower?</h2>
        <p>
          TeamPower offers several key features including:
          <ul className="list-disc pl-5">
            <li><strong>Workers Management:</strong> Administrators can add, delete, and edit employee profiles. Each employee is assigned a unique password.</li>
            <li><strong>Task Management:</strong> Managers can assign tasks to employees, specifying due dates and task details. Employees can view, accept, and mark tasks as complete. The application tracks task status (pending, in progress, completed).</li>
            <li><strong>Communication:</strong> Managers can send messages to all employees, which employees can view. This facilitates seamless communication within the team.</li>
            <li><strong>Profile Management:</strong> Employees can edit their personal profiles and upload profile pictures.</li>
          </ul>
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Is TeamPower accessible across devices?</h2>
        <p>
          Yes, TeamPower is designed to provide a consistent user experience across different devices, ensuring seamless access to its features.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">How can I get started with TeamPower?</h2>
        <p>
          To get started with TeamPower, simply sign up for an account. As an administrator, you'll have the ability to manage employee profiles and assign tasks. Employees can log in, view their assigned tasks, and communicate with the team.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">Can I access TeamPower on mobile devices?</h2>
        <p >
          Currently, TeamPower is accessible via web browsers on desktop and mobile devices.
        </p>
      </div>
    </div>
  );
};

export default FAQs;
