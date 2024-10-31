
import { Autocomplete, FormControl, FormLabel, InputAdornment, TextField } from '@mui/material'
import { SxProps } from '@mui/system';

import { IOption } from '../../Model/Option';

import "./Style.scss"

const AutocompleteInput = ({ value, options, style, icon, label, onChange, type }: { value: IOption | null, options: any, style?: SxProps, icon: React.ReactNode, label: string, onChange: (event: React.SyntheticEvent, newValue: IOption | null, type: 'from' | 'to') => void, type: 'from' | 'to' }) => {

    return (
        <FormControl sx={{ ...style }}>
            <FormLabel className='autocomplete-label'>{label}</FormLabel>
            <Autocomplete
                value={value}
                onChange={(event: any, newValue: IOption | null) => onChange(event, newValue, type)}
                disablePortal
                options={options}
                sx={{ width: 300, background: "white" }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Select a City"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    {icon}
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </FormControl>
    )
}

export default AutocompleteInput