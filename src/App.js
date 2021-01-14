import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Form, Card, Icon, Image } from 'semantic-ui-react';

function App() {
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/exemple')
      .then(response => {response.json().then(data => setData(data))})
      .catch(e => console.log("Erro: "+e.message))
  }, [])

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url
  }) =>{
    setName(name);
    setUser(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const escolheUser = e =>{
    setUserInput(e.target.value);
  };

  const buscaUser = () =>{
    fetch(`https://api.github.com/users/${userInput}`)
      .then(response => {response.json().then(data => setData(data))})
      .catch(e => console.log("Erro: "+e.message))
  }

  return (
    <div className="App">
      <div className="navbar">
        <h1>Github Search</h1>
      </div>
      
      <div className = "busca">
        <Form onSubmit={buscaUser}>
            <Form.Group>
              <Form.Input placeholder='Github User' name='github user' onChange = {escolheUser}/>
              <Form.Button content='Buscar' />
            </Form.Group>
          </Form>
      </div>
  
      <div className='card'>
        <Card className = 'cardSettings' >
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>{user}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {repos} Repos
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {following} Following
            </a>
          </Card.Content>
        </Card>
        
      </div>
    </div>
    
  );
}

export default App;
