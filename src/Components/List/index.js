import React, { useEffect, useState } from "react";
import axios from 'axios'
import Button from '@mui/material/Button'
import List from "@material-ui/core/List"
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const ListContainer = () => {
    const [itens, setItens] = useState([])
    const [itensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const pages = Math.ceil(itens.length / itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = itens.slice(startIndex, endIndex)
  
  
    async function getUser() {
      try {
        const response = await axios.get('https://api.github.com/users');
        console.log(response.data);
        setItens(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => {
      getUser()
    }, [])
    return (
      <div className="App">
  
        {
          currentItens.map((item) => {
            return (
              <>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={item.avatar_url} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.login}
                      secondary={
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.repos_url}
                        </Typography>
  
                      }
                    />
                  </ListItem>
                  <Divider />
                </List>
  
              </>
            )
          })
        }
        <div>
          {Array.from(Array(pages), (item, index) => {
            return <Button value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index}</Button>
          })}
        </div>
      </div>
    );
  }
  
  export default ListContainer;
  