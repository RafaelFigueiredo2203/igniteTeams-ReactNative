import { TouchableOpacityProps } from "react-native";
import { ContainerFilter, FilterStyleProps, Title } from "./styles";


type Props = TouchableOpacityProps & FilterStyleProps & {
  title:string;
}

export function Filter({title, isFilterActive = false , ...rest} : Props ){
  return(
    <ContainerFilter isFilterActive={isFilterActive} {...rest} >
      <Title>{title}</Title>
    </ContainerFilter>
  )
}