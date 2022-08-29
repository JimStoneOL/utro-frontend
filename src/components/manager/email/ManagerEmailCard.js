import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ManagerEmailCard=({data})=>{

  const getStatus=()=>{
    let status=data.status
    if(status==='STATUS_ALL'){
        return 'публичное сообщение'
    }
    if(status==='STATUS_PRIVATE'){
        return 'приватное сообщение'
    }
  }
   (data)
    return(<>
  <Card sx={{ minWidth: 275 }} key={data.id}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Тема: {data.heading}
      </Typography>
      <Typography variant="h5" component="div">
      
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {getStatus()}
      </Typography>
      <Typography variant="body2">
        {data.message}
        <br />
        <br />
       Отправитель: {data.fromUserEmail}
      </Typography>
    </CardContent>
  </Card>
    </>)
}