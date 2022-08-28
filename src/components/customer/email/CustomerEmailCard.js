
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const CustomerEmailCard=({data})=>{

  const getStatus=()=>{
    let status=data.status
    if(status==='STATUS_ALL'){
        return 'публичное сообщение'
    }
    if(status==='STATUS_PRIVATE'){
        return 'приватное сообщение'
    }
  }
  console.log(data)
    return(<>
  <Card sx={{ minWidth: 275 }}>
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