import { Box } from "@mui/material";

export default function CenteringBox({children, scale=1}){
   return (
		<Box
			height='100vh'
			display='flex'
			justifyContent='center'
			alignItems={'center'}
			sx={{
				transform: `scale(${scale})`,
				transformOrigin: 'center',
			}}
		>
			{children}
		</Box>
	);
}
