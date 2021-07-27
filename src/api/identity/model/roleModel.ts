import {
  ListResultDto,
  PagedAndSortedResultRequestDto,
  PagedResultDto,
} from '../../model/baseModel';

export class RoleBase {
  name!: string;
  isDefault!: boolean;
  isPublic!: boolean;
}

export class Role extends RoleBase {
  id!: string;
  isStatic!: boolean;
  concurrencyStamp?: string;
}

export class RoleListResult extends ListResultDto<Role> {}

export class RolePagedResult extends PagedResultDto<Role> {}

export class GetRolePagedRequest extends PagedAndSortedResultRequestDto {
  filter = '';
}

export class CreateRole extends RoleBase {
  constructor() {
    super();
    this.isDefault = false;
    this.isPublic = true;
    this.name = '';
  }
}

export class UpdateRole extends RoleBase {
  concurrencyStamp?: string;
}

export class ChangeRoleOrganizationUnitDto {
  organizationUnitIds: string[] = [];
}

export class CreateOrUpdateRoleClaim {
  claimType = '';
  claimValue = '';
}

export class DeleteRoleClaim {
  claimType = '';
  claimValue = '';
}

export class RoleClaim extends CreateOrUpdateRoleClaim {
  id!: string;
}
