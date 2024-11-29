import React, { useState } from 'react';

import PechinchaCard from '../main/PechinchaCard';



export default function Pechincha() {
  var [pechinchas, setPechinchas] = useState([
    { id: 19, name: 'Batom', price: 29, discount: 15, image: 'image_url' },
    { id: 20, name: 'Rímel', price: 27, discount: 10, image: 'image_url' },
    { id: 1, name: 'Mountain Bike Aro 29', price: 26, discount: 3, image: 'image_url' },
  ]);


  const removePechincha = (id) => {
    setPechinchas(pechinchas.filter(pechincha => pechincha.id !== id));
  };

  const filteredPechincha = pechinchas.filter(pechincha => {
    return pechincha.name.toLowerCase();
  });

  return (
    <div style={{ padding: '100px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pechinchas</h1>

      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-4">
        {filteredPechincha.map(pechincha => (
          <PechinchaCard 
            key={pechincha.id} 
            pechincha={pechincha} 
            onDelete={removePechincha} />
        ))}
      </div>
    </div>
  );
}