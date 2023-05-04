import React from 'react';
import Button from 'react-bootstrap/Button';

export default function NotFound() {
  return (
    <div className="card m-5 p-4">
      Not Login or not allowed to visit the page.
      <Button className="w-25" href="/login">Login</Button>
    </div>
  );
}
