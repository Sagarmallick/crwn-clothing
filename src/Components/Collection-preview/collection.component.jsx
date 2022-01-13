import React from 'react';
import './collection.styles.scss';


export const CollectionPreview =({title,items})=>(
    <div className='collection-preview'>
        <h2 className='title'>{title.toUpperCase()}</h2>
        <div className='preview'>
            {
                items.filter((item,idx)=>idx<4).map(item=>(
                <div key={item.id}>{item.name}</div>
                ))
            }
        </div>
    </div>
) 
