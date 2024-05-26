import { atom } from "recoil";

 const todoState = atom({
    key: 'todoState', // unique ID (with respect to other atoms/selectors)
    default: [{
      name:"",
      description:"",
      _id:"",
    }],
     
  });
  
  export default todoState