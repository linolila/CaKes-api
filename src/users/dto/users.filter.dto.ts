export class UsersFilterDto {
  readonly page?: number;
  readonly limit?: number;
  readonly search?: string;
  readonly sortBy?: string;
  readonly name?: string;
  readonly sortOrder?: 'ASC' | 'DESC';
}
