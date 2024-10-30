
import { Autocomplete, FormControl, FormLabel, InputAdornment, TextField } from '@mui/material'
import { SxProps } from '@mui/system';

import "./Style.scss"

const AutocompleteInput = ({ options, style, icon, label }: { options: any, style?: SxProps, icon: React.ReactNode, label: string }) => {
    return (
        <FormControl sx={{ ...style }}>
            <FormLabel className='autocomplete-label'>{label}</FormLabel>
            <Autocomplete
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