import {
  AuditedEntityDto,
  PagedAndSortedResultRequestDto,
  PagedResultDto,
} from '/@/api/model/baseModel';

export interface Resource extends AuditedEntityDto {
  id: string;
  enable: boolean;
  name: string;
  displayName: string;
  description: string;
}

export interface ResourceCreateOrUpdate {
  enable: boolean;
  name: string;
  displayName: string;
  description: string;
}

export class ResourcePagedResult extends PagedResultDto<Resource> {}

export class GetResourcePagedRequest extends PagedAndSortedResultRequestDto {
  filter = '';
}
