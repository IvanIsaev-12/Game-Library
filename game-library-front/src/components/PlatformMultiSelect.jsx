import {
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Chip,
	Box,
	OutlinedInput,
	FormHelperText,
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function PlatformMultiSelect({
	name,
	label = 'Platform',
	options = [],
	value = '',
	onChange,
	error,
}) {
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		if (value) {
			setSelected(value.split(',').filter((v) => v));
		} else {
			setSelected([]);
		}
	}, [value]);

	const handleChange = (event) => {
		const newSelected = event.target.value;
		setSelected(newSelected);
		onChange(newSelected.join(','));
	};

	return (
		<FormControl
			fullWidth
			error={!!error}
		>
			<InputLabel id={`${name}-label`}>{label}</InputLabel>
			<Select
				labelId={`${name}-label`}
				multiple
				value={selected}
				onChange={handleChange}
				input={<OutlinedInput label={label} />}
				renderValue={(selectedItems) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selectedItems.map((item) => (
							<Chip
								key={item}
								label={item}
								onMouseDown={(e) => e.stopPropagation()}
								onDelete={() => {
									const updated = selected.filter((v) => v !== item);
									setSelected(updated);
									onChange(updated.join(','));
								}}
							/>
						))}
					</Box>
				)}
			>
				{options.map((option) => (
					<MenuItem
						key={option}
						value={option}
					>
						{option}
					</MenuItem>
				))}
			</Select>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	);
}
