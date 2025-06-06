import axios from "axios";
import Constants from "../constants";

const constants = new Constants();
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const create = async (data) => {
	let response = await axios.post(constants.baseUrl + "/customer", data);

	return response;
};

export const list = async (customers_id) => {
	let response = await axios.get(constants.baseUrl + "/customer", { customers_id });

	return response;
};

export const edit = async (id, data) => {
	let response = await axios.patch(constants.baseUrl + `/customer/${id}`, data);

	return response;
};

export const get = async (id) => {
	let response = await axios.get(constants.baseUrl + `/customer/${id}`);

	return response;
};

export const remove = async (id) => {
	let response = await axios.delete(constants.baseUrl + `/customer/${id}`);

	return response;
};

export const simpleList = async (customer_id) => {
	let response = await axios.get(constants.baseUrl + `/customer/simple-list/${client_id}`);

	return response;
};
