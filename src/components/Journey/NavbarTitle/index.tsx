
// Core
import { formatToDayMonthWeekDate } from "../../../core/utils/helper";

// Style
import "./Style.scss";

const NavbarTitle = ({ fromCity, toCity, departureDate }: { fromCity: string | null, toCity: string | null, departureDate: string | null }) => {
    return (
        <div className="navbar-journey-conitaner">
            <div className="city-names">
                <span>{fromCity}</span>
                <span>-</span>
                <span>{toCity}</span>
            </div>
            <div className="departure-date">{formatToDayMonthWeekDate(departureDate)}</div>
        </div>
    )
}

export default NavbarTitle