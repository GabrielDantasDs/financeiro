import axios from "axios";
import Constants from "./constants";

export function SetupAxios() {
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["Authorization"] = 'Bearer ' +
    localStorage.getItem("access_token")?.replace(/['"]+/g, '')
}

export function formatCnpjCpf(value) {
  if (value.length == 4) {
    return (value = value.replace(/(\d{3})(\d)/, "$1.$2"));
  }

  if (value.length == 8) {
    return (value = value.replace(/(\d{3})(\d)/, "$1.$2"));
  }

  if (value.length == 11) {
    return (value = value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/g,
      "$1.$2.$3-$4"
    ));
  }

  if (value.length == 12) {
    return (value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"));
  }

  if (value.length == 14) {
    return (value = value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5"
    ));
  }

  if (value.length == 15) {
    return (value = value
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})/g, "$1.$2.$3/$4"));
  }

  if (value.length == 17) {
    return (value = value
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5"));
  }

  return value;
}

export function formatCnpjCpfInput(input) {
  input.target.value = formatCnpjCpf(input.target.value);
  return input;
}

export function formatTelefoneInput(input) {
  input.target.value = formatTelefone(input.target.value);
  return input;
}

export function formatBRLInput(input) {
  input.target.value = Number(input.target.value.toString().replace(/[^0-9\.-]+/g,"")) / 100;
  
  input.target.value = Number(input.target.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  return input;
}

export function formatBRL(value) {
  value = Number(value.toString().replace(/[^0-9\.-]+/g, ""));

	value = Number(value).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
	return value;
}

export function formatTelefone(value) {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

export const states = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goías" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraíma" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export function handleCepInput(input) {
  input.target.value = handleCep(input.target.value);
  return input;
}

export function handleCep(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");

}

export const getViaCep = async (value) => {
  let response  = await fetch(`https://viacep.com.br/ws/${value}/json/`).then(res => {
    return res.json()
  })

  return response;
};

export async function handleViaCep(value, setFieldValue, page) {
  if (value.length == 9) {
    let payload = await getViaCep(removeSpecialCharacters(value));

    setFieldValue("address", payload.logradouro);
    setFieldValue("state", payload.uf);
    setFieldValue("city", payload.localidade);
    setFieldValue("neighborhood", payload.bairro);
  }
}

export function removeSpecialCharacters(value) {
  return value.replace(/^a-zA-Z0-9 ]/g, '');
}

export const formatCurrency = (value) => {
  if (value < 0) {
    value = value * -1;
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);
};

