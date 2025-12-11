
import { simpleList as getCategories } from "../../cruds/category";
import { simpleList as getCostCenters } from "../../cruds/cost-center";
import { simpleList as getBankAccounts } from "../../cruds/bank-account";
import Swal from "sweetalert2";

export async function fetchCommonData(client) {
    const [categories, costCenters, bankAccountList] =
      await Promise.all([
        getCategories(client)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            Swal.fire(
              "Ops",
              "Houve um erro ao buscar as categorias",
              "error"
            );
            return;
          }),
        getCostCenters(client)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            Swal.fire(
              "Ops",
              "Houve um erro ao buscar as categorias",
              "error"
            );
            return;
          }),
        getBankAccounts(client)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            Swal.fire(
              "Ops",
              "Houve um erro ao buscar as contas bancárias",
              "error"
            );
            return;
          }),
      ]);
  
      return [categories, costCenters, bankAccountList];
}