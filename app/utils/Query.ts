// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export function useGetCrypto(){
//    const { data , isLoading } = useQuery({
//       queryKey: ["market-trades"],
//       queryFn: async () => {
//          const response = await axios.get(Market_URL);
//          return response.data;
//       }
//    });
//    return { data , isLoading };
// }