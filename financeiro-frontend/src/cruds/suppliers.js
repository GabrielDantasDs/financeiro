import axios from "axios";
import Constants from "../constants";

const constants = new Constants();
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const create = async (data) => {
    let response = await axios.post(constants.baseUrl + "/supplier", data);

    return response;
};

export const list = async (params) => {
    let url = constants.baseUrl + `/supplier/list/${params.client_id}?page=${params.page}`;

    if (params.search && params.search !== "") {
        url += `&search=${encodeURIComponent(params.search)}`;
    }

    let response = await axios.get(url);

    return response;
};

export const update = async (id, data) => {
    let response = await axios.patch(
        constants.baseUrl + `/supplier/${id}`,
        data
    );

    return response;
};

export const get = async (id) => {
    let response = await axios.get(constants.baseUrl + `/supplier/${id}`);

    return response;
};

export const remove = async (id) => {
    let response = await axios.delete(constants.baseUrl + `/supplier/${id}`);

    return response;
};

export const simpleList = async (customer_id) => {
    let response = await axios.get(
        constants.baseUrl + `/supplier/simple-list/${customer_id}`
    );

    return response;
};
