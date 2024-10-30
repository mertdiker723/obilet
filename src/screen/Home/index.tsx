import { useState } from 'react';
import { Button, Typography } from '@mui/material';

// Common
import Navbar from "../../common/Navbar"
import AutocompleteInput from '../../common/AutocompleteInput';

// Style & Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import "./Style.scss"


interface Option {
    label: string;
    value: string;
}

const options: Option[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
];

const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('tr-TR', options);
}

const Home = () => {
    const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate(new Date()));
    const [isTodaySelected, setIsTodaySelected] = useState<boolean>(true);


    const handleTodayClick = () => {
        setSelectedDate(getFormattedDate(new Date()));
        setIsTodaySelected(true);
    };

    const handleTomorrowClick = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(getFormattedDate(tomorrow));
        setIsTodaySelected(false);
    };
    return (
        <>
            <Navbar />

            <div className='home-container'>
                <AutocompleteInput options={options} icon={<LocationOnIcon />} label="Nereden" />
                <AutocompleteInput options={options} icon={<LocationOnOutlinedIcon />} label="Nereye" style={{ mt: 2 }} />
                <div className='date-box'>
                    <div className='date-contain'>
                        <CalendarMonthTwoToneIcon />
                        <div className='texts'>
                            <Typography className='date-label'>Tarih</Typography>
                            <div className='date'>{selectedDate}</div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <Button className={`date-button ${isTodaySelected ? 'selected' : ''}`} onClick={handleTodayClick}>Bugün</Button>
                        <Button className={`date-button ${!isTodaySelected ? 'selected' : ''}`} onClick={handleTomorrowClick}>Yarın</Button>
                    </div>
                </div>
                <Button className='find-ticket-button' variant="contained">Bileti Bul</Button>
                <Typography className='bottom-description'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusantium quae debitis modi omnis nam amet rem tempore animi, quisquam qui fuga veniam pariatur nemo esse, iusto, saepe veritatis consectetur.
                    Architecto quidem corporis, repellendus quos ipsam soluta inventore consectetur et. Error ex dolor harum numquam iure.
                </Typography>
            </div>

        </>
    )
}

export default Home