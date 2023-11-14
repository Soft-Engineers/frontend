import React from "react";
import Header from "../../components/Header";
import FormUser from "../../components/FormUser";
import ShowHandBanner from "../../components/ShowHandBanner";
import BackgroundAnimation from '../../components/Background';
const style = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
  },
};

const SelectName = () => {
  return (
    <div>
      <Header />
      <BackgroundAnimation />
      <div style={style.container}>
        <FormUser />
      </div>
    </div>
  );
};

export default SelectName;
