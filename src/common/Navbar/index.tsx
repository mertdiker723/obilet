import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./Style.scss"

interface NavbarProps {
    title?: string;
    showBackButton?: boolean;
    handleBack?: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ title, showBackButton, handleBack }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "#2F4EB4" }}>
                <Toolbar className="toolbar-container">
                    {
                        showBackButton && <IconButton
                            size="large"
                            edge="start"
                            onClick={handleBack}
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    }


                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
                        {title}
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Navbar