import { reverse } from "dns";
import { IncomingMessage } from "http";

/**
 * Attempts to get a host name from the IP of the requester
 * @param {IncomingMessage} req
 * @param {function(string)} callback The callback function containing the user's device name.
 */
export function getUserDeviceName(req, callback) {
    /* get the user IP from the connection */
    const l_userDeviceIp_s = req.socket.remoteAddress;
    let l_userDeviceName_s = null;

    /* if possible, get the user DNS from the IP */
    reverse(l_userDeviceIp_s, (err, l_addresses) => {
        console.log("New device connected...");
        if (err) console.log("Could not determine host name...");

        /* if host name could not be determined, use IP */
        if (l_addresses == null) {
            l_userDeviceName_s = l_userDeviceIp_s;
            console.log("Device IP:", l_userDeviceIp_s);
        } else {
            /* Use the first host name found */
            l_userDeviceName_s = l_addresses[0];
            if (l_addresses[1] == null) {
                console.log("Device host name:", l_addresses[0]);
            } else {
                console.log("Device host names:", l_addresses);
                console.log("Using address:", l_addresses[0]);
            }
        }
        callback(l_userDeviceName_s);
    });
}