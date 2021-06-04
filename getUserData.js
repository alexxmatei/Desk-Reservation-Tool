import { reverse } from "dns";
import { IncomingMessage } from "http";

/**
 * Attempts to get a host name from the IP of the requester
 * @param {IncomingMessage} req
 * @return {String} Returns the host name of the user if found, if not returns the IP
 */
export function getUserDeviceName(req) {
    /* get the user IP from the connection */
    const l_userDeviceIp_s = req.socket.remoteAddress;
    let l_userDeviceName_s = null;
    let l_returnValue_s = null;

    /* if possible, get the user DNS from the IP */
    reverse(l_userDeviceIp_s, (err, l_addresses) => {
        console.log("New device connected...")
        if (err) console.log("Could not determine host name...");

        /* if host name could not be determined, use IP */
        if (l_addresses == null) {
            l_userDeviceName_s = l_userDeviceIp_s;
            console.log("Device IP:", l_userDeviceIp_s);
        }
        else {
            /* Use the first host name found */
            l_userDeviceName_s = l_addresses[0];
            if (l_addresses[1] == null) {
                console.log("Device host name:", l_addresses[0]);
            }
            else {
                console.log("Device host names:", l_addresses);
                console.log("Using address:", l_addresses[0]);
            }
        }

        if (l_userDeviceName_s != null) {
            l_returnValue_s = l_userDeviceName_s;
        } else {
            l_returnValue_s = l_userDeviceIp_s;
        }
        return (l_returnValue_s);
    });
}