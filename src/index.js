import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));
const WidgetDivs=document.querySelectorAll(".chatbot")

console.log(WidgetDivs)

//const WidgetDivs = document.querySelectorAll('.reddit_widget')

//Inject our React App into each
WidgetDivs.forEach(Div=> {
  
  return ReactDOM.render(
      <React.StrictMode>
      <App domElement={Div}/>
      </React.StrictMode>,
    Div
  );
})


// root.render(
//   <React.StrictMode>
//     <App domElement={chatbot}/>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
