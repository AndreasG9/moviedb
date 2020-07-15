import React from 'react'; 
import Film from "./Film"; 

 function SearchResults( {query, results} ) {

  return (
    <div>
      <h3 style={header_style}> FOUND {results.length} MATCHES FOR "{query}" </h3>
      <section>
        {results.map( (result) => (
          <Film result={result} key={result.id}></Film>
        ))}
      </section>
       
    </div>
  )
}

const header_style = {

}

export default SearchResults; 