import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImportButton from './ImportedFile';

function VocabList({ file }) {
  const [vocab, setVocab] = useState([]);

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('/api/extract-vocab', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        setVocab(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, [file]);

  return (
    <div>
      <h2>Vocabulary List</h2>
      {vocab.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            {vocab.map((item, index) => (
              <tr key={index}>
                <td>{item.word}</td>
                <td>{item.definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No vocabulary found.</p>
      )}
    </div>
  );
}

export default VocabList;