import React from 'react';
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom'
import LicenseLogo from './assets/license.png';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  useEffect(()=> {
    fetch("https://api.github.com/users/larkgronick/repos")
    .then(res => res.json())
    .then(data => {
      setData(data)
    }) 
  }, [])
    
    function dateConverter(date){
      const currentDate = new Date();
      const uploadDate = new Date(date);
      const updateDateString = uploadDate.toDateString().substring(4,7) + ' ' + Number.parseInt(uploadDate.toDateString().substring(8,11)).toString();
      const passed = Math.ceil((currentDate - uploadDate) / 8.64e7) - 1; 
        if(passed === 1){
          return `Updated ${passed} day ago` 
        } else if (passed <= 31) {
          return `Updated ${passed} days ago` 
        } else{
          return `Updated on ${updateDateString}` 
      }
    }

    function licenseChecker(license){
      if (license === null) {
        return ''
      }else{
        return <div><img src={LicenseLogo}/><span>   </span><span>{license.name}</span></div>
      } 
    }
        
    function setColorByLanguage(language){
      switch (language) {
        case 'HTML':
          return '#e34c26'
        case 'CSS':
          return '#563d7c'
        case 'JavaScript':
          return '#f1e05a'
        default:
          return ''
      }
    }

    function searchSpace(e){
      setSearch(e.target.value);
    }
    
    const view = data.filter((el, index, arr)=>{
     
      if(search == null)
          return el
      else if(el.name.toLowerCase().includes(search.toLowerCase())){
          return el
      }
    }).map((el) => {
      return(
        <div>
           <ul >
              <li className="result">
                <a className="repo-name" href={el.clone_url}>{el.name}</a>
                <span className="repo-language-color" style={{backgroundColor: setColorByLanguage(el.language)}}></span>
                <p className="language description">{el.language}</p>
                <p className="license description">{licenseChecker(el.license)}</p>
                <p className="description">{dateConverter(el.pushed_at)}</p>
              </li>
          </ul>
        </div>
      )
    }
    )  
  return (
    <div className="App">
    <input type="text" className="search-bar" placeholder="Find a repository made by Larkgronick..." onChange={(e)=>searchSpace(e)} />
      {view}
    </div>
    
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
