import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Common
import Navbar from "../../common/Navbar"
import AutocompleteInput from '../../common/AutocompleteInput';

// Store
import { useData } from '../../core/store/AppStore';

// Core
import { GetBusLocations } from '../../core/apiRoutes/route';
import { formatToCustomDate, getFormattedDate } from '../../core/utils/helper';

// Model
import { IOption } from '../../Model/Option';

// Style & Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import "./Style.scss"


interface IState {
    selectedDate: string;
    selecedDatePure: Date;
    isTodaySelected: boolean;
    busLocations: IOption[];
    error: string | null;
}
const Home = () => {
    const [state, setState] = useReducer((currentState: IState, newState: Partial<IState>): IState => ({ ...currentState, ...newState }), {
        selectedDate: (getFormattedDate(new Date())),
        selecedDatePure: new Date(),
        isTodaySelected: true,
        busLocations: [],
        error: null
    });

    const [selectedCityFrom, setSelectedCityFrom] = useState<IOption | null>(null);
    const [selectedCityTo, setSelectedCityTo] = useState<IOption | null>(null);

    const { selectedDate, isTodaySelected, busLocations, selecedDatePure, error } = state;

    // navigate
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: IOption | null, type: 'from' | 'to') => {
        setState({
            error: null
        });
        if (type === 'from') {
            setSelectedCityFrom(newValue);
        } else {
            setSelectedCityTo(newValue);
        }
    };

    const { value } = useData();

    useEffect(() => {
        if (value?.status === 'Success') {
            const { data } = value || {};
            const deviceId = data ? data['device-id'] : undefined;
            const sessionId = data ? data['session-id'] : undefined;

            axios.post(
                GetBusLocations,
                {
                    "data": null,
                    "device-session": {
                        "session-id": sessionId,
                        "device-id": deviceId
                    },
                    "language": "tr-TR"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${process.env.REACT_APP_API_CLIENT_TOKEN}`,
                    },
                }
            ).then((response) => {
                const { data } = response || {};
                const convertDataArray = (dataArray: any) => {
                    return dataArray.map((data: any) => {
                        return {
                            value: data.id,
                            label: data.name,
                            cityName: data.cityName,
                            countryName: data.countryName,
                        };
                    });
                };

                setState({
                    busLocations: convertDataArray(data?.data)
                })

            }).catch((err) => {
                setState({
                    error: err.message
                })
            });
        }
    }, [value])

    const handleTodayClick = () => {
        setState({
            selectedDate: getFormattedDate(new Date()),
            selecedDatePure: new Date(),
            isTodaySelected: true
        })
    };

    const handleTomorrowClick = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setState({
            selectedDate: getFormattedDate(tomorrow),
            selecedDatePure: tomorrow,
            isTodaySelected: false
        })
    };

    const handleFindTicks = () => {
        if (!(selectedCityFrom && selectedCityTo)) {
            setState({
                error: "Lütfen şehir seçiniz..!"
            })
        } else {
            navigate(`/journey?originId=${selectedCityFrom?.value}&destinationId=${selectedCityTo?.value}&departureDate=${formatToCustomDate(selecedDatePure)}`);
        }
    };
    const handleSwapCities = () => {
        setSelectedCityFrom((prev) => selectedCityTo);
        setSelectedCityTo((prev) => selectedCityFrom);
    };

    return (
        <>
            <Navbar />
            <div className='home-container'>
                {error && <div>{error}</div>}
                <AutocompleteInput
                    value={selectedCityFrom}
                    type="from"
                    onChange={handleChange}
                    options={busLocations}
                    icon={<LocationOnIcon />}
                    label="Nereden"
                />
                <Button
                    onClick={handleSwapCities}
                    sx={{ mt: 2 }}
                >
                    <ChangeCircleOutlinedIcon />
                </Button>
                <AutocompleteInput
                    value={selectedCityTo}
                    type="to"
                    onChange={handleChange}
                    options={busLocations}
                    icon={<LocationOnOutlinedIcon />}
                    label="Nereye"
                />
                <div className='date-box'>
                    <div className='date-contain'>
                        <CalendarMonthTwoToneIcon />
                        <div className='texts'>
                            <Typography className='date-label'>Tarih</Typography>
                            <div className='date'>{selectedDate}</div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <Button
                            className={`date-button ${isTodaySelected ? 'selected' : ''}`}
                            onClick={handleTodayClick}
                        >
                            Bugün
                        </Button>
                        <Button
                            className={`date-button ${!isTodaySelected ? 'selected' : ''}`}
                            onClick={handleTomorrowClick}>
                            Yarın
                        </Button>
                    </div>
                </div>
                <Button onClick={handleFindTicks} className='find-ticket-button' variant="contained">Bileti Bul</Button>
                <Typography className='bottom-description'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium quae debitis modi omnis nam amet rem tempore animi, quisquam qui fuga veniam pariatur nemo esse, iusto, saepe veritatis consectetur.
                    Architecto quidem corporis, repellendus quos ipsam soluta inventore consectetur et. Error ex dolor harum numquam iure.
                </Typography>
            </div>

        </>
    )
}

export default Home