
const mainURL = 'https://v2-api.obilet.com/api'


export const GetSession = `${mainURL}/client/getsession`;

export const GetBusLocations = `${mainURL}/location/getbuslocations`

export const GetJourneys = `${mainURL}/journey/getbusjourneys`


// GetSession sometimes fail, if it fall we can use this token for deviceid and sessionid
export const TEST_DEVICE_ID = 'RgySVhRMXDI6s66F/m0aVTU0fLpphEIogDzvWFK4cX4=';
export const TEST_SESSION_ID = "5TrDXY3B2GdCxTawznF5hM6rVpAA/C2HcSjI1BVrz8s=";