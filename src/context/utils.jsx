import axios from 'axios';
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const emailRegexp = /^[A-Z\da-z._%+-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,64}$/g;
export const passRegexp = /^.{8,}$/g;
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function getDateString(str, squeeze = false) {
    const date = new Date(str);
    if (squeeze)
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${fmtTime(date)}`;
}

export function fmtTime(dt) {
    if (!dt) return null;
    if (typeof dt === 'number')
        dt = new Date(dt * 1000);
    let h = dt.getHours();
    let m = dt.getMinutes();
    if (m < 10) m = '0' + m;
    if (h < 10) h = '0' + h;
    return `${h}:${m}`;
}

export function timestampToDate(timestamp) {
    if (typeof timestamp === 'number')
        return new Date(timestamp * 1000);
    return timestamp;
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function colorChar(string, saturation = 50, level = 48) {
    let lt = string[0];
    if (!lt) return '';
    lt.codePointAt(0) >= 0xD800 ? lt += string[1] : lt = lt.toUpperCase();
    return `hsl(${(lt.charCodeAt(0) - 65) * 360 / 26}deg, ${saturation}%, ${level}%)`;
}

export const apiUrl = import.meta.env.VITE_API_URL;
export const backUrl = import.meta.env.VITE_BACK_URL;
export const s3Url = import.meta.env.VITE_S3_URL;

export const methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    DElETE: 'delete',
}

export const apiRequest = async (method, path, data = null, config = {}) => {
    if (Number.parseInt(import.meta.env.VITE_DEBUG)) {
        if (!config.headers) config.headers = {};
        config.headers.Authorization = 'Bearer ' + Cookies.get('token');
        delete config.withCredentials;
    }
    const request = async () => {
        if (['get', 'delete'].includes(method))
            return await axios[method](apiUrl + path, config);
        return await axios[method](apiUrl + path, data, config);
    }
    return await request().catch(e => toast.error(e.response.data.message));
}

export const downloadFile = async (filename, title) => {
    const res = await axios.get(`${s3Url}${filename}.json`, {responseType: 'blob'})
    const url = window.URL
        .createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
export const pagination = (item, postParams, setPostParams) => {
    const changePage = page => setPostParams({...postParams, page})

    const pages_range = 2;
    let last_curr = item.last_page;
    let first_page = item.current_page - pages_range;
    if (first_page < 1)
        first_page = 1;
    if (last_curr > item.current_page + pages_range)
        last_curr = item.current_page + pages_range;
    let pages = [];
    for (let i = first_page; i < item.current_page; i++)
        pages.push(<li className="page-item" key={i}>
            <button className="page-link" onClick={() => changePage(i)}>{i}</button>
        </li>);
    pages.push(<li className="page-item active" aria-current="page" key={-1}><span
        className="page-link">{item.current_page}</span></li>);
    for (let i = item.current_page + 1; i < last_curr + 1; i++)
        pages.push(<li className="page-item" key={i}>
            <button className="page-link" onClick={() => changePage(i)}>{i}</button>
        </li>);
    return (
        <nav aria-label="...">
            <ul className="pagination pagination-sm">
                <li className="page-item">
                    <button className="page-link" onClick={() => changePage(1)}>First</button>
                </li>
                {pages}
                <li className="page-item">
                    <button className="page-link" onClick={() => changePage(item.last_page)}>Last</button>
                </li>
            </ul>
        </nav>
    );
}