import { AppBar, Box, Toolbar, Typography } from "@mui/material"

const Navbar = ({ title }: { title?: string }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#2F4EB4" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar