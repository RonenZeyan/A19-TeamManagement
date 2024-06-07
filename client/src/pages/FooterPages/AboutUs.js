import React from 'react';

/**
 * this is the aboutUs page including data about what is TeamPower 
 * @returns - a html code of the aboutUs page 
 */

const AboutUs = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5">About Us</h1>
      <p className="text-lg ">
        TeamPower is a web application that offers a platform for task management, which allows the manager to monitor and assign tasks efficiently to his employees. The application offers a variety of functionality to optimize the workflow and foster collaboration within the team such as employee management, communication task management. TeamPower is designed to provide a consistent user experience across devices, the intuitive navigation system, which includes a dedicated navigation bar, allows users to seamlessly explore the app's features.
      </p>
    </div>
  );
};

export default AboutUs;
