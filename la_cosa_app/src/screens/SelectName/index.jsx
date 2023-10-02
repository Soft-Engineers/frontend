import Header from '../../components/Header'; 
import FormUser from '../../components/FormUser';

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
    </div>
  )
}

export default SelectName;
