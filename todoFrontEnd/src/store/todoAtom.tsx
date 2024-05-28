import { atom } from "recoil";

 const todoState = atom({
    key: 'todoState',
    default: [{
      name:"",
      description:"",
      _id:"",
    }],
  });
  
  export default todoState