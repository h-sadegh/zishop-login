import { useQuery } from "react-query";
import { SellersType } from "../../components/seller/Seller.props";
import { Axios } from "../Axios";

export const useSellers = () => {
  async function f() {
    const { data } = await Axios({
      url: `users/sellers`,
    });
    return data as SellersType[];
  }
  return useQuery([`user/sellers`], f, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retryDelay: 3000,
  });
};
