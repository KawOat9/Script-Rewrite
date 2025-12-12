/*
Script modified and referenced from @CyWr110, @githubdulong, @Saga
Modification Date: 2024.10.16
 ---------------------------------------
 */

const REQUEST_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36', // User agent, identifies the browser type
    'Accept-Language': 'en', // Accepted language, set to English here
    'Accept': '*/*', // Add Accept header, indicating acceptance of all content types
    'Referer': 'https://chat.openai.com/', // Add Referer header, indicating the request source
};


const STATUS_COMING = 2; // Coming soon
const STATUS_AVAILABLE = 1; // Supported (Unlockable)
const STATUS_NOT_AVAILABLE = 0; // Not supported (Not unlockable)
const STATUS_TIMEOUT = -1; // Detection timeout
const STATUS_ERROR = -2; // Detection error

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36';
const ipApiUrl = "https://ipinfo.io/json"; // IP acquisition API

let args = getArgs(); // Get arguments

(async () => {
    let now = new Date(); // Get current date and time
    let hour = now.getHours(); // Get current hour
    let minutes = now.getMinutes(); // Get current minutes
    hour = hour > 9 ? hour : "0" + hour; // Pad with zero for hours less than 10
    minutes = minutes > 9 ? minutes : "0" + minutes; // Pad with zero for minutes less than 10

    // Initialize the panel, display the current time
    let panel_result = {
        title: `${args.title} | ${hour}:${minutes}` || `Unlock Test | ${hour}:${minutes}`, // Set title
        content: '', // Set content
        icon: args.icon || 'play.tv.fill', // Set icon
        'icon-color': args.color || '#FF2D55', // Set icon color
    };

    let notificationContent = ""; // Notification content

// Get IP information and add it to the panel
try {
    const ipData = await fetchData(ipApiUrl); // Get IP data
    const ipInfo = JSON.parse(ipData); // Parse IP data into JSON format
    const ipAddress = `IP: ${ipInfo.ip}  📍: ${ipInfo.region}, ${ipInfo.country}`; // Construct the IP address string
    panel_result.content = `${ipAddress}\n`; // Add the IP to the first line of the panel content
    notificationContent += `IP: ${ipInfo.ip}  📍: ${ipInfo.city}, ${ipInfo.country}\n`; // Add IP information to the notification content
} catch (error) {
    panel_result.content = "IP: N/A\n"; // If IP cannot be obtained, handle the error
    notificationContent += "IP: N/A\n"; // Add error information to the notification content
}


// Check multiple services simultaneously
let [{ region, status }] = await Promise.all([testDisneyPlus()]); // Simultaneously check the status of Disney+
await Promise.all([check_chatgpt(), check_youtube_premium(), check_netflix()]) // Simultaneously check ChatGPT, YouTube Premium, and Netflix
    .then((result) => {
        let disney_result = getServiceStatus(status, region, "Disney"); // Get the service status for Disney+
        result.push(disney_result); // Add the Disney+ result to the results array

        let youtube_netflix = [result[1], result[2]].join('  \t|  '); // Combine the results for YouTube and Netflix
        let chatgpt_disney = [result[0], result[3]].join('  \t|  '); // Combine the results for ChatGPT and Disney

        // Update panel content to display service status results
        panel_result.content += youtube_netflix + '\n' + chatgpt_disney;

        // Add the unlock results to the notification content
        notificationContent += `${youtube_netflix}\n`;
        notificationContent += `${chatgpt_disney}`;
    })
    .finally(() => {
        // Send a notification containing all results
        $notification.post(`Test Complete  |  ${hour}:${minutes}`, "", notificationContent); // Send notification
        $done(panel_result); // Display the final panel result
    });
})();


// Helper function to handle the unlock status of each service
function getServiceStatus(status, region, serviceName) {
    if (status == STATUS_COMING) { // If the status is coming soon
        return `${serviceName} ➟\u2009🔜\u2009${region}`; // Return coming soon service status
    } else if (status == STATUS_AVAILABLE) { // If the status is available
        return `${serviceName} ➟\u2009✅\u2009${region}`; // Return available service status
    } else if (status == STATUS_NOT_AVAILABLE) { // If the status is not available
        return `${serviceName} ➟\u2009❌`; // Return not available service status
    } else if (status == STATUS_TIMEOUT) { // If the status is timeout
        return `${serviceName} ➟\u2009N/A`; // Return timeout service status
    } else {
        return `${serviceName} ➟\u2009N/A`; // Return unknown status
    }
}

// Fetch data from the given URL
function fetchData(url) {
    return new Promise((resolve, reject) => {
        $httpClient.get({ url, headers: REQUEST_HEADERS }, (error, response, data) => {
            if (error || response.status !== 200) { // If there is an error or the status code is not 200
                reject(error || 'Request failed'); // Reject the Promise, return error message
            } else {
                resolve(data); // Successfully fetched data, resolve the Promise
            }
        });
    });
}

// ... [Keep your existing service check functions like ChatGPT, YouTube, Netflix, Disney+ here]

// Get and parse parameters from the URL
function getArgs() {
    return Object.fromEntries( // Convert key-value pairs to an object
        $argument.split("&") // Split parameters by &
            .map(item => item.split("=")) // Split each parameter into a key-value pair by =
            .map(([k, v]) => [k, decodeURIComponent(v)]) // Decode each value
    );
}

// Check ChatGPT
async function check_chatgpt() {
    // Web check
    let inner_check_web = () => {
        return new Promise((resolve, reject) => {
            let option = {
                url: 'http://chat.openai.com/cdn-cgi/trace', // Set the request URL
                headers: REQUEST_HEADERS, // Set the request headers
            };
            $httpClient.get(option, function (error, response, data) {
                if (error != null || response.status !== 200) { // Check if there is an error or the status code is not 200
                    reject('Error'); // Reject the Promise
                    return;
                }

                let lines = data.split("\n"); // Split the returned data by line
                let cf = lines.reduce((acc, line) => { // Convert each line into a key-value pair
                    let [key, value] = line.split("="); // Split each line by =
                    acc[key] = value; // Add the key-value pair to the accumulator
                    return acc;
                }, {});

                let country_code = cf.loc; // Get country code
                let restricted_countries = ['HK', 'RU', 'CN', 'KP', 'CU', 'IR', 'SY']; // List of restricted countries
                if (restricted_countries.includes(country_code)) { // Check if it is in the list of restricted countries
                    resolve({ status: 'Not Available', region: '' }); // Return Not Available status
                } else {
                    resolve({ status: 'Available', region: country_code.toUpperCase() }); // Return Available status
                }
            });
        });
    };

    // iOS client check
    let inner_check_ios = () => {
        return new Promise((resolve, reject) => {
            let option = {
                url: 'https://ios.chat.openai.com/', // Set the request URL
                headers: {
                    'authority': 'ios.chat.openai.com',
                    'accept': '*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'en-US,en;q=0.9',
                    'sec-ch-ua': '',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"iOS"',  // Set to iOS here
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'none',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': '' // Can be filled in as needed
                }
            };
            $httpClient.get(option, function (error, response, data) {
                if (error) {
                    const errorMsg = "ChatGPT: Check failed (Network connection issue - VPN request)"; // Error message
                    console.log(errorMsg);
                    resolve('Client Error'); // Return client error
                    return;
                }

                console.log("ChatGPT: Received response for VPN request.");
                const vpnDetected = data.toLowerCase().includes('vpn'); // Check if the response contains 'vpn'
                console.log(`VPN detection response: ${data}`);

                if (vpnDetected) {
                    resolve('Client Not Available'); // If VPN is detected, return Not Available
                } else {
                    resolve('Client Available'); // Otherwise, return Available
                }
            });
        });
    };

    let check_result = 'ChatGPT➟ '; // Initialize check result

    try {
        // Simultaneously check Web and iOS clients
        const [webResult, iosResult] = await Promise.all([inner_check_web(), inner_check_ios()]);
        console.log("Web Result:", webResult);
        console.log("iOS Result:", iosResult);

        // Generate the final return content based on the check results
        if (webResult.status === 'Available' && iosResult === 'Client Available') {
            check_result += `✅\u2009${webResult.region}`; // Both Web and iOS are available
        } else if (webResult.status === 'Available' && iosResult === 'Client Not Available') {
            check_result += `⚠️\u2009${webResult.region}  `; // Web is available, but iOS is not
        } else {
            check_result += '❌     '; // Both are not available
        }
    } catch (error) {
        console.log("Error:", error);
        check_result += ' N/A    \u2009'; // An error occurred, return N/A
    }

    return check_result; // Return the check result
}

// Check YouTube Premium
async function check_youtube_premium() {
    let inner_check = () => {
        return new Promise((resolve, reject) => {
            let option = {
                url: 'https://www.youtube.com/premium', // Set the request URL
                headers: REQUEST_HEADERS, // Set the request headers
            }
            $httpClient.get(option, function (error, response, data) {
                if (error != null || response.status !== 200) { // Check if there is an error or the status code is not 200
                    reject('Error'); // Reject the Promise
                    return;
                }

                if (data.indexOf('Premium is not available in your country') !== -1) { // Check if the returned data contains 'Premium is not available'
                    resolve('Not Available'); // Return Not Available
                    return;
                }

                let region = ''; // Initialize region variable
                let re = new RegExp('"countryCode":"(.*?)"', 'gm'); // Define regex to extract country code
                let result = re.exec(data); // Execute regex match on the data
                if (result != null && result.length === 2) { // If match is successful
                    region = result[1].toUpperCase(); // Get the country code and convert to uppercase
                } else if (data.indexOf('www.google.cn') !== -1) { // If the data contains www.google.cn
                    region = 'CN'; // Return China region code
                } else {
                    region = 'US'; // Default to US region code
                }
                resolve(region); // Return the region code
            });
        });
    }

    let youtube_check_result = 'YouTube ➟ '; // Initialize check result

    await inner_check() // Execute the inner check
        .then((code) => {
            if (code === 'Not Available') {
                youtube_check_result += '❌     \u2009'; // If not available, add the mark
            } else {
                youtube_check_result += '✅\u2009' + code; // If available, add the mark and region code
            }
        })
        .catch((error) => {
            youtube_check_result += '\u2009N/A   '; // An error occurred, return N/A
        });

    return youtube_check_result; // Return the check result
}

// Check Netflix
async function check_netflix() {
    let inner_check = (filmId) => {
        return new Promise((resolve, reject) => {
            let option = {
                url: 'https://www.netflix.com/title/' + filmId, // Set the request URL
                headers: REQUEST_HEADERS, // Set the request headers
            }
            $httpClient.get(option, function (error, response, data) {
                if (error != null) { // Check for errors
                    reject('Error'); // Reject the Promise
                    return;
                }

                if (response.status === 403) { // Check for 403 error
                    reject('Not Available'); // Return Not Available
                    return;
                }

                if (response.status === 404) { // Check for 404 error
                    resolve('Not Found'); // Return Not Found
                    return;
                }

                if (response.status === 200) { // Check for 200 success response
                    let url = response.headers['x-originating-url']; // Get the original URL
                    let region = url.split('/')[3]; // Extract the region
                    region = region.split('-')[0]; // Split and get the region code
                    if (region == 'title') { // If region is 'title'
                        region = 'US'; // Set to US
                    }
                    if (region != null) { // If there is a region code
                        region = region.toUpperCase(); // Convert to uppercase
                    }
                    resolve(region); // Return the region code
                    return;
                }

                reject('Error'); // Return error for other cases
            });
        });
    }

    let netflix_check_result = 'Netflix ➟ '; // Initialize check result

    await inner_check(81280792) // Check the first movie ID
        .then((code) => {
            if (code === 'Not Found') { // If not found, check the second movie ID
                return inner_check(80018499);
            }
            netflix_check_result += '✅\u2009' + code; // If available, add the mark and region code
            return Promise.reject('BreakSignal'); // Break signal
        })
        .then((code) => {
            if (code === 'Not Found') { // If not found, return not available
                return Promise.reject('Not Available');
            }

            netflix_check_result += '⚠️\u2009' + code; // If available but with a warning, add the mark and region code
            return Promise.reject('BreakSignal'); // Break signal
        })
        .catch((error) => {
            if (error === 'BreakSignal') {
                return; // Return if it is a break signal
            }
            if (error === 'Not Available') {
                netflix_check_result += '❌'; // Return Not Available
                return;
            }
            netflix_check_result += 'N/A'; // Return N/A
        });

    return netflix_check_result; // Return the check result
}

// Check Disney+
async function testDisneyPlus() {
    try {
        let { region, cnbl } = await Promise.race([testHomePage(), timeout(7000)]); // Simultaneously check the homepage and timeout

        let { countryCode, inSupportedLocation } = await Promise.race([getLocationInfo(), timeout(7000)]); // Simultaneously get location info and timeout

        region = countryCode ?? region; // Use countryCode if it exists

        if (region != null) {
            region = region.toUpperCase(); // Convert to uppercase
        }

        // Coming soon
        if (inSupportedLocation === false || inSupportedLocation === 'false') {
            return { region, status: STATUS_COMING }; // Return coming soon status
        } else {
            return { region, status: STATUS_AVAILABLE }; // Return available status
        }

    } catch (error) {
        if (error === 'Not Available') {
            return { status: STATUS_NOT_AVAILABLE }; // Return not available status
        }

        if (error === 'Timeout') {
            return { status: STATUS_TIMEOUT }; // Return timeout status
        }

        return { status: STATUS_ERROR }; // Return error status
    }
}

// Get location information
function getLocationInfo() {
    return new Promise((resolve, reject) => {
        let opts = {
            url: 'https://disney.api.edge.bamgrid.com/graph/v1/device/graphql', // Request URL
            headers: {
                'Accept-Language': 'en', // Set accepted language
                Authorization: 'ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84', // Set authorization header
                'Content-Type': 'application/json', // Set request content type
                'User-Agent': UA, // Set user agent
            },
            body: JSON.stringify({
                query: 'mutation registerDevice($input: RegisterDeviceInput!) { registerDevice(registerDevice: $input) { grant { grantType assertion } } }', // GraphQL query
                variables: {
                    input: {
                        applicationRuntime: 'chrome', // Application runtime environment
                        attributes: {
                            browserName: 'chrome', // Browser name
                            browserVersion: '94.0.4606', // Browser version
                            manufacturer: 'apple', // Manufacturer
                            model: null, // Model
                            operatingSystem: 'macintosh', // Operating system
                            operatingSystemVersion: '10.15.7', // Operating system version
                            osDeviceIds: [], // Device IDs
                        },
                        deviceFamily: 'browser', // Device family
                        deviceLanguage: 'en', // Device language
                        deviceProfile: 'macosx', // Device profile
                    },
                },
            }),
        }

        $httpClient.post(opts, function (error, response, data) {
            if (error) {
                reject('Error'); // Reject the Promise
                return;
            }

            if (response.status !== 200) {
                reject('Not Available'); // Return Not Available
                return;
            }

            data = JSON.parse(data); // Parse the returned JSON data
            if (data?.errors) {
                reject('Not Available'); // Return Not Available
                return;
            }

            let {
                token: { accessToken }, // Get access token
                session: {
                    inSupportedLocation, // Get if in a supported location
                    location: { countryCode }, // Get country code
                },
            } = data?.extensions?.sdk;
            resolve({ inSupportedLocation, countryCode, accessToken }); // Return the result
        });
    });
}

// Test homepage availability
function testHomePage() {
    return new Promise((resolve, reject) => {
        let opts = {
            url: 'https://www.disneyplus.com/', // Request URL
            headers: {
                'Accept-Language': 'en', // Set accepted language
                'User-Agent': UA, // Set user agent
            },
        }

        $httpClient.get(opts, function (error, response, data) {
            if (error) {
                reject('Error'); // Reject the Promise
                return;
            }
            if (response.status !== 200 || data.indexOf('Sorry, Disney+ is not available in your region.') !== -1) {
                reject('Not Available'); // Return Not Available
                return;
            }

            let match = data.match(/Region: ([A-Za-z]{2})[\s\S]*?CNBL: ([12])/); // Regex to match region and CNBL
            if (!match) {
                resolve({ region: '', cnbl: '' }); // Return empty values
                return;
            }

            let region = match[1]; // Get region
            let cnbl = match[2]; // Get CNBL
            resolve({ region, cnbl }); // Return the result
        });
    });
}

// Timeout function
function timeout(delay = 5000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Timeout'); // Reject the Promise, return timeout
        }, delay);
    });
}

// Get icon
function getIcon(code, icons) {
    if (code != null && code.length === 2) { // Check if the code exists and has a length of 2
        for (let i = 0; i < icons.length; i++) { // Iterate through the icons array
            if (icons[i][0] === code) { // If a matching code is found
                return icons[i][1] + code; // Return the icon plus the code
            }
        }
    }
    return code; // Return the code
}
