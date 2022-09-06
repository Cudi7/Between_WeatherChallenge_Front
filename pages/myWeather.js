import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Container } from "@mui/system";
import Link from "../src/Link";
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteOne } from "../api/api";
import { useRouter } from 'next/router'

export default function MyWeather({ data }) {
  const router = useRouter()
  
  const handleDelete=(id)=>{
  deleteOne(id)
  router.push("/")
  }
  
  return (
    <Container maxWidth="lg">
      <p>My Weather</p>
      <List>
        {data.data.map((el, index) => (
          <ListItem
          key={index}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={()=>handleDelete(el.firestoreId)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemAvatar>

          </ListItemAvatar>
          <ListItemText
            primary={`City: ${el.name}, temperature: ${el.main.temp}`}
            secondary={`min-temp: ${el.main.temp_min}, max-temp: ${el.main.temp_max}` }
          />
        </ListItem>,
        ))}
      </List>
      <Button variant="outlined" component={Link} noLinkStyle href="/">
          Go to the main page
        </Button>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:5000/api/city/all`);
  const data = await res.json();

  return { props: { data } };
}
