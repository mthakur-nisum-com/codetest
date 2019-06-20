
import appConfig from '../../../config/config';
const { appPort } = appConfig;
export const formatQueryParams= (params=null) => {
    let keyString ='';
    if(params) {
        for(let keys of Object.keys(params)) {
            keyString+= `${keys}=${params[keys]}`;
            keyString+= Object.keys(params)[Object.keys(params).length-1] === keys ? '':'&';
        };
    }
    return keyString;
}

export const buildServiceUrl = () => {
    if (process.browser) {
        const { host, protocol } = window.location;
        const serviceUrl = `${protocol}//${host}`;
        return serviceUrl;
    }
    else {
        return '';
    }
    
}

export const formatUrl = (url,queryString = null) => queryString? `${url}?${queryString}`:`${url}`;