import { ReactComponent as EditIcon } from './EditIcon.svg';
import { ReactComponent as RemoveIcon } from './RemoveIcon.svg';
import { ReactComponent as SaveIcon } from './SaveIcon.svg';
import { ReactComponent as CancelIcon } from './CancelIcon.svg';

type IconsType = {
  name: string;
  color: string;
};
export const Icons = ({ name, color }: IconsType) => {
  if (name === 'EditIcon') {
    return <EditIcon name={name} color={color} />;
  }
  if (name === 'RemoveIcon') {
    return <RemoveIcon name={name} color={color} />;
  }
  if(name === 'SaveIcon'){
    return <SaveIcon name={name} color={color}/>
  }
  if(name === 'CancelIcon'){
    return <CancelIcon name={name} color={color}/>
  }
  return null;
};
