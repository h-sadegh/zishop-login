import { useSellers } from "../../service/api/Seller";
import { SellersType } from "./Seller.props";
import { useStorePersist } from "../../store/Store";

function useSeller() {
  const sellers = useSellers();
  const activeSeller: number = useStorePersist((state) => state.activeSeller);

  return {
    ...sellers,
    data: (sellers?.data?.find((i: SellersType) => i.id === activeSeller) ||
      sellers?.data?.[0]) as SellersType,
  };
}

export default useSeller;
