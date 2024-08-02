import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => setInput(e.target.value);

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:5000/bfhl', JSON.parse(input));
            setResponse(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div>
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                {selectedOptions.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                {selectedOptions.includes('Highest alphabet') && <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>{response ? response.roll_number : 'Your Application'}</h1>
            <div>
                <label>API Input</label>
                <textarea 
                    value={input} 
                    onChange={handleInputChange} 
                    placeholder='Enter JSON' 
                    style={{ width: '100%', height: '50px', marginBottom: '10px' }}
                />
            </div>
            <button 
                onClick={handleSubmit} 
                style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                Submit
            </button>
            <div style={{ marginTop: '10px' }}>
                <label>Multi Filter</label>
                <select 
                    multiple 
                    onChange={handleOptionChange} 
                    style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                >
                    <option value='Alphabets'>Alphabets</option>
                    <option value='Numbers'>Numbers</option>
                    <option value='Highest alphabet'>Highest Alphabet</option>
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <h3>Filtered Response</h3>
                {renderResponse()}
            </div>
        </div>
    );
}

export default App;
