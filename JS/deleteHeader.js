/**********************************************
 > deleteHeader by LocketGOLD Services
 > Compatible with Shadowrocket, Surge, LanceX
 **********************************************/	

const version = 'V1.0.2-Shadowrocket';

/**
 * Set header value with case-insensitive handling
 * @param {object} headers - Headers object
 * @param {string} headerName - Header name
 * @param {string} headerValue - Header value
 */
function setHeaderValue(headers, headerName, headerValue) {
    const lowerCaseName = headerName.toLowerCase();
    if (lowerCaseName in headers) {
        headers[lowerCaseName] = headerValue;
    } else {
        headers[headerName] = headerValue;
    }
}

// Get current request headers
var modifiedHeaders = $request.headers;

// Remove RevenueCat ETag headers for proper functionality
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

// Return modified headers
$done({headers: modifiedHeaders});