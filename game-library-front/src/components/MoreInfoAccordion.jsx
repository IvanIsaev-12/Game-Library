import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default  function MoreInfoAccordion({children}){

   return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>More Info</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{children}
			</AccordionDetails>
		</Accordion>
	);
}