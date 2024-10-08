import { ReactComponent as EditIcon } from './EditIcon.svg';
import { ReactComponent as RemoveIcon } from './RemoveIcon.svg';

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

  return null;
};
