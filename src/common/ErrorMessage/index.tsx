import { Alert, Stack } from "@mui/material"


const ErrorMessage = ({ message, width }: { message?: string, width: string }) => {
    return (
        <Stack sx={{ width, mt: 2, mb: 2 }} spacing={2}>
            <Alert severity="error">{message}</Alert>
        </Stack>
    )
}

export default ErrorMessage