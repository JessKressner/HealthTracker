import React, { useState } from 'react';
import './Journal.css';

function Journal({ journalEntries, addJournalEntry }) {
  // State hook to keep track of the text in the journal input field.
  const [entryText, setEntryText] = useState('');

  // Function to handle saving a journal entry.
  const handleSave = () => {
    // Check if the input is not empty or just spaces.
    if (entryText.trim()) {
      // Create a new journal entry with the text and the current date.
      const newEntry = {
        text: entryText.trim(),
        date: new Date().toLocaleString(), // Get the current date and time.
      };
      
      // Call the addJournalEntry function (passed as a prop) to add the new entry to the list.
      addJournalEntry(newEntry);
      
      // Clear the input field after saving the entry.
      setEntryText('');
    } else {
      // If the input is empty, alert the user to write something before saving.
      alert('Please write something before saving.');
    }
  };

  return (
    <div className="journal-container">
      {/* Heading for the journal section */}
      <h2>Mental Health Journal</h2>
      
      {/* Text area where the user writes their journal entry */}
      <textarea
        value={entryText} // Set the current value of the textarea to the state variable.
        onChange={(e) => setEntryText(e.target.value)} // Update the state whenever the user types.
        placeholder="Write about your day and set goals for the next day..." // Placeholder text when the textarea is empty.
      ></textarea>
      
      {/* Button that triggers the handleSave function when clicked */}
      <button onClick={handleSave} className="save-entry">
        Save Entry
      </button>
      
      {/* Display the list of journal entries */}
      <ul className="journal-entries">
        {/* Map through the journalEntries array and display each entry */}
        {journalEntries.map((entry, index) => (
          <li key={index}>
            <strong>{entry.date}</strong> {/* Display the date of the entry */}
            <p>{entry.text}</p> {/* Display the text of the entry */}
          </li>
        ))}
      </ul>
    <img 
        src= "https://thumbs.dreamstime.com/b/hands-person-holding-open-journal-diary-pen-to-write-hands--holding-open-journal-diary-pen-to-write-322583842.jpg?w=768"
        alt= "Journal"
        className= "journal-image"
    />
    </div>
  );
}
export default Journal;
