import {IconType} from '../../graphql/generated';

export interface RoomDto {
  groupId: string;
  name: string;
  color: string;
  iconName: string;
  iconType: IconType;
  id: string;
}
