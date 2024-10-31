import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Container, CircularProgress } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Common
import Navbar from "../../common/Navbar"
import ErrorMessage from "../../common/ErrorMessage";

// Component
import NavbarTitle from "../../components/Journey/NavbarTitle";

// Core
import { useData } from "../../core/store/AppStore";
import { GetJourneys } from "../../core/apiRoutes/route";
import { extractTime } from "../../core/utils/helper";

// Style
import "./Style.scss";


const Journey = () => {
    const { value } = useData();
    const [journey, setJourney] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const originId = searchParams.get('originId');
    const destinationId = searchParams.get('destinationId');
    const departureDate = searchParams.get('departureDate');
    const fromCity = searchParams.get('fromCity');
    const toCity = searchParams.get('toCity');


    useEffect(() => {
        if (value?.status === 'Success') {
            const { data } = value || {};
            const deviceId = data ? data['device-id'] : undefined;
            const sessionId = data ? data['session-id'] : undefined;

            axios.post(
                GetJourneys,
                {
                    "device-session": {
                        "session-id": sessionId,
                        "device-id": deviceId
                    },
                    "date": departureDate,
                    "language": "tr-TR",
                    "data": {
                        "origin-id": originId,
                        "destination-id": destinationId,
                        "departure-date": departureDate
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${process.env.REACT_APP_API_CLIENT_TOKEN}`,
                    },
                }
            ).then((response) => {
                const { data } = response || {};
                setJourney(data.data);
                setLoading(false);
            }).catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        }
    }, [departureDate, destinationId, originId, value])

    const handleBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };
    return (
        <>
            <Navbar showBackButton handleBack={handleBack}
                title={<NavbarTitle fromCity={fromCity} toCity={toCity} departureDate={departureDate} />}
            />
            <Container>
                {error && <ErrorMessage message={error} width="100%" />}
                {
                    loading && (
                        <Box sx={{ display: 'flex', justifyContent: "center", mt: 5 }}>
                            <CircularProgress />
                        </Box>
                    )
                }
                {
                    journey && journey.map((item) => {
                        const { id, journey: itemJourney } = item || {};
                        const { arrival, departure, destination } = itemJourney || {};
                        return (
                            <Box key={id} className="journey-card-container">
                                <Stack direction="column" spacing={1}>
                                    <Stack direction="row" spacing={2}>
                                        <Box>
                                            <Typography variant="subtitle2">Kalkış</Typography>
                                            <Typography variant="h6">{departure && extractTime(departure)}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <ArrowForwardIcon sx={{ fontSize: 20, ml: 0.5 }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle2">Varış</Typography>
                                            <Typography variant="h6">{arrival && extractTime(arrival)}</Typography>
                                        </Box>
                                    </Stack>
                                    <Typography variant="body2">
                                        {destination}
                                    </Typography>
                                </Stack>
                                <Box className="price">
                                    <Typography color="white">
                                        {itemJourney['original-price']},00 TL
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    })
                }

            </Container>
        </>
    )
}

export default Journey