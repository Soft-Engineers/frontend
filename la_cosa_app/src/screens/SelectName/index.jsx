import React from 'react';
import Header from '../../components/Header';
import FormUser from '../../components/FormUser';
import ShowHandBanner from '../../components/ShowHandBanner';
const style = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
};

const SelectName = () => {
  return (
    <div>
      <Header />
      <div style={style.container}>
        <FormUser />
      </div>
      <ShowHandBanner hand={[{ card_name: 'Lanzallamas' }, { card_name: 'La Cosa' }, { card_name: 'Análisis' }, { card_name: 'Seducción' }]} player={'Juan'} trigger_card={{ card_name: 'whisky' }} />
    </div>
  )
}

export default SelectName;
