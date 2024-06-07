import React from 'react';

/**
 * this is the contactUs page including data about contact with us like email and name
 * @returns - a html code of the contactUs page 
 * @componentsUsed - used a ContactCard component to create 5 cards 
 */

const ContactUs = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ContactCard name="Adham Asad" email="adham@example.com" />
        <ContactCard name="Layan Amer" email="layan@example.com" />
        <ContactCard name="haya khbishi" email="haya@example.com" />
        <ContactCard name="Daniella Kadamani" email="daniella@example.com" />
        <ContactCard name="Ronen Zeyan" email="ronen@example.com" />
      </div>
    </div>
  );
};

/**
 * this is a component for create a card including data about user name and email
 * @param {object} - include two things name and email of the user we want to set his data 
 * @returns and html code of the card 
 */
const ContactCard = ({ name, email }) => {
  return (
    <div className="border rounded p-4 shadow-md">
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-500">{email}</p>
    </div>
  );
};

export default ContactUs;
