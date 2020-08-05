import React, { Component, useState, useEffect } from 'react';

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=react')
  const [loading, setLoading] = useState(false);
  
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const fetchNews = () => {
  //   fetch(url)
  //     .then(result => result.json())
  //     // .then(data => console.log(data))
  //     .then(data => setNews(data.hits))
  //     .catch(err => console.log(err));
  // };

  useEffect(() => {
    // fetchNews();
    setLoading(true);
    fetch(url)
      .then(result => result.json())
      // .then(data => console.log(data))
      .then(data => {
        setNews(data.hits);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [url]); // run useEffect when url changes or we search and submit our query.

  const onChangeHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSubmithandler = (e) => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${ searchQuery }`);
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : '');

  const searchForm = () => (
    <form onSubmit={onSubmithandler}>
      <input type="text" value={searchQuery} onChange={onChangeHandler} />
      <button>Search</button>
    </form>
  );

  const showNews = () => (news.map((n, i) => (<p key={i}>{n.title}</p>)));

  return (
    <div>
      <h2>News App</h2>
      { showLoading() }
      { searchForm() }
      { showNews() }
    </div>
  );
}

// const App = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     document.title = `Clicked ${ count } times`
//   }, [count]);

//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// };

// FUNCTIONAL COMPONENET
// const App = () => {
//   const [count, setCount] = useState(0);

//   const increment = () => {
//     setCount(count + 1);
//   };

//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={ increment }>Clicked { count } times</button>
//     </div>
//   );
// };

// CLASS BASED COMPONENET
// class App extends Component {
//   state = {
//     count: 0
//   };

//   increment = () => {
//     this.setState({ count: this.state.count + 1});
//   };

//   componentDidMount() {
//     document.title = `Clicked ${ this.state.count } times`
//   }

//   componentDidUpdate() {
//     document.title = `Clicked ${ this.state.count } times`
//   }

//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={ this.increment }>Clicked { this.state.count } times</button>
//       </div>
//     );
//   }
// }

export default App;
