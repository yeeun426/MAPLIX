import React from 'react';
import './SearchSidebar.css';

function SearchSidebar(places){
    const onChange = (e) => {
        console.log(e.target.value);
    }
    
    return (
        <div className="search-sidebar">
            <div className='sidebar_category'>
                <li><span>title</span></li>
                <li><span>area</span></li>
            </div>
    
            <input
            type="text" 
            onChange={onChange}
            placeholder="Search"
            />
        </div>

    );
}

export default SearchSidebar;