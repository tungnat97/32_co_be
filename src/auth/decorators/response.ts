import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  description?: string,
  statusCode: number = 200,
) => {
  return applyDecorators(
    // 1. Tell Swagger to generate schemas for both DTOs
    ApiExtraModels(PaginationDto, model),

    // 2. Define the response structure
    ApiResponse({
      status: statusCode,
      description:
        description || `Successfully retrieved paginated list of ${model.name}`,
      schema: {
        // Use allOf to combine the base PaginationDto properties with the dynamic 'data' property
        allOf: [
          // Reference the base PaginationDto schema (for total, page, limit)
          { $ref: getSchemaPath(PaginationDto) },
          {
            // Define the properties that need to override or be explicitly set
            properties: {
              data: {
                type: 'array',
                // This is the key: it tells Swagger that the items in 'data' are of type 'model' (i.e., Order)
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiRecordResponse = <TModel extends Type<any>>(
  model: TModel,
  description?: string,
  statusCode: number = 200,
) => {
  return applyDecorators(
    ApiExtraModels(model),
    ApiResponse({
      status: statusCode,
      description:
        description || `Successfully retrieved record of ${model.name}`,
      schema: { $ref: getSchemaPath(model) },
    }),
  );
};
