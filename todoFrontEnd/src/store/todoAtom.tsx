import { atom } from "recoil";

 const todoState = atom({
    key: 'todoState',
    default: [{
        title:"",
      description:"",
      id:"",
    }]
  });
  
  export default todoState