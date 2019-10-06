import React, { useEffect, useState } from 'react';

const CreateCareer = () => {
  const [response, setResponse] = useState('');
  useEffect(() => {
    fetch('/api/user/fresh')
      .then(res => {
        debugger;
        res.text();
      })
      .then(res => setResponse(res));
  });
  return (
    <div>
      <div>Careers</div>
      <div>{response}</div>
    </div>
  );
};

export default CreateCareer;
