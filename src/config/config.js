import Env from './env';

let baseUrl = '';
let uploadUrl = '';

if (Env === 'development') {
    baseUrl = 'http://localhost:8080/api/';
    uploadUrl = 'http://localhost:8080/upload/';
} else if (Env === 'hd') {
    baseUrl = 'https://kangyonggan.com/api/';
    uploadUrl = 'https://kangyonggan.com/upload/';
} else if (Env === 'production') {
    baseUrl = 'https://kangyonggan.com/api/';
    uploadUrl = 'https://kangyonggan.com/upload/';
}

let config = {
    env: Env,
    baseUrl: baseUrl,
    uploadUrl: uploadUrl
};

export default config;
