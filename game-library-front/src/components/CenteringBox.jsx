import { Box } from "@mui/material";

export default function CenteringBox({children}){
   return <Box
   height='100vh'
   display='flex'
   justifyContent='center'
   alignItems={'center'}
>
   {children}
</Box>
}
