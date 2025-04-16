import { useSelector } from "react-redux";

export const HomeViewModel = () => {
  const { isLoading,user } = useSelector((state) => state.user);
  
  return {isLoading,user}
};
