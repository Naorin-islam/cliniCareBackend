import { Project, PropertyDeclaration, SourceFile, Scope } from 'ts-morph';
import * as path from 'path';
import * as fs from 'fs';

const project = new Project({
  tsConfigFilePath: 'tsconfig.json',
});

const modulesToProcess = [
  'admissions', 'appointments', 'beds', 'billing', 'departments', 
  'doctors', 'laboratory', 'medical-records', 'medicines', 
  'notifications', 'patients', 'prescriptions', 'reports', 'schedules'
];

function getDtoType(type: string): string {
  if (type.includes('Date')) return 'Date';
  if (type.includes('number')) return 'number';
  if (type.includes('boolean')) return 'boolean';
  return 'string';
}

function getSwaggerType(type: string): string {
  if (type.includes('Date')) return 'String';
  if (type.includes('number')) return 'Number';
  if (type.includes('boolean')) return 'Boolean';
  return 'String';
}

function generateDto(entityName: string, properties: PropertyDeclaration[], modulePath: string, fileName: string) {
  const dtoDir = path.join(modulePath, 'dto');
  if (!fs.existsSync(dtoDir)) {
    fs.mkdirSync(dtoDir);
  }

  const createDtoPath = path.join(dtoDir, `create-${fileName}.dto.ts`);
  const createDtoFile = project.createSourceFile(createDtoPath, '', { overwrite: true });

  createDtoFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/swagger',
    namedImports: ['ApiProperty', 'ApiPropertyOptional']
  });
  createDtoFile.addImportDeclaration({
    moduleSpecifier: 'class-validator',
    namedImports: ['IsString', 'IsNumber', 'IsBoolean', 'IsOptional', 'IsDate', 'IsEnum', 'IsNotEmpty']
  });

  const createDtoClass = createDtoFile.addClass({
    name: `Create${entityName}Dto`,
    isExported: true,
  });

  for (const prop of properties) {
    const propName = prop.getName();
    if (['id', 'createdAt', 'updatedAt'].includes(propName)) continue;

    const hasColumnDecorator = prop.getDecorators().some(d => d.getName() === 'Column');
    if (!hasColumnDecorator) continue;

    const typeStr = prop.getType().getText(prop);
    const dtoType = getDtoType(typeStr);
    
    // Check if nullable from decorator
    const columnDecorator = prop.getDecorators().find(d => d.getName() === 'Column');
    const isNullable = columnDecorator?.getArguments().some(a => a.getText().includes('nullable: true')) || false;
    
    const swaggerDec = isNullable ? 'ApiPropertyOptional' : 'ApiProperty';
    
    createDtoClass.addProperty({
      name: propName + (isNullable ? '?' : ''),
      type: dtoType,
      decorators: [
        { name: swaggerDec, arguments: [] },
        { name: isNullable ? 'IsOptional' : 'IsNotEmpty', arguments: [] },
        { name: dtoType === 'string' ? 'IsString' : dtoType === 'number' ? 'IsNumber' : dtoType === 'boolean' ? 'IsBoolean' : 'IsString', arguments: [] }
      ]
    });
  }

  const updateDtoPath = path.join(dtoDir, `update-${fileName}.dto.ts`);
  const updateDtoFile = project.createSourceFile(updateDtoPath, '', { overwrite: true });
  updateDtoFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/swagger',
    namedImports: ['PartialType']
  });
  updateDtoFile.addImportDeclaration({
    moduleSpecifier: `./create-${fileName}.dto`,
    namedImports: [`Create${entityName}Dto`]
  });

  updateDtoFile.addClass({
    name: `Update${entityName}Dto`,
    isExported: true,
    extends: `PartialType(Create${entityName}Dto)`
  });
}

function toClassName(str: string) {
  return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function generateService(moduleName: string, entityName: string, fileName: string, serviceFile: SourceFile) {
  serviceFile.removeText();
  
  serviceFile.addImportDeclaration({ moduleSpecifier: '@nestjs/common', namedImports: ['Injectable', 'NotFoundException'] });
  serviceFile.addImportDeclaration({ moduleSpecifier: '@nestjs/typeorm', namedImports: ['InjectRepository'] });
  serviceFile.addImportDeclaration({ moduleSpecifier: 'typeorm', namedImports: ['Repository'] });
  serviceFile.addImportDeclaration({ moduleSpecifier: `./entities/${fileName}.entity`, namedImports: [entityName] });
  serviceFile.addImportDeclaration({ moduleSpecifier: `./dto/create-${fileName}.dto`, namedImports: [`Create${entityName}Dto`] });
  serviceFile.addImportDeclaration({ moduleSpecifier: `./dto/update-${fileName}.dto`, namedImports: [`Update${entityName}Dto`] });

  const className = toClassName(moduleName);

  const serviceClass = serviceFile.addClass({
    name: `${className}Service`,
    isExported: true,
    decorators: [{ name: 'Injectable', arguments: [] }]
  });

  serviceClass.addConstructor({
    parameters: [{
      name: 'repository',
      type: `Repository<${entityName}>`,
      decorators: [{ name: 'InjectRepository', arguments: [entityName] }],
      scope: Scope.Private,
    }]
  }).replaceWithText(`  constructor(
    @InjectRepository(${entityName})
    private readonly repository: Repository<${entityName}>,
  ) {}`);

  serviceClass.addMethod({
    name: 'create',
    isAsync: true,
    parameters: [{ name: 'createDto', type: `Create${entityName}Dto` }],
    returnType: `Promise<${entityName}>`,
    statements: `const entity = this.repository.create(createDto as any);\nreturn this.repository.save(entity as any);`
  });

  serviceClass.addMethod({
    name: 'findAll',
    isAsync: true,
    returnType: `Promise<${entityName}[]>`,
    statements: `return this.repository.find();`
  });

  serviceClass.addMethod({
    name: 'findOne',
    isAsync: true,
    parameters: [{ name: 'id', type: 'string' }],
    returnType: `Promise<${entityName}>`,
    statements: `const entity = await this.repository.findOne({ where: { id } as any });\nif (!entity) throw new NotFoundException(\`${entityName} with id \${id} not found\`);\nreturn entity;`
  });

  serviceClass.addMethod({
    name: 'update',
    isAsync: true,
    parameters: [{ name: 'id', type: 'string' }, { name: 'updateDto', type: `Update${entityName}Dto` }],
    returnType: `Promise<${entityName}>`,
    statements: `const entity = await this.findOne(id);\nObject.assign(entity as any, updateDto as any);\nreturn this.repository.save(entity as any);`
  });

  serviceClass.addMethod({
    name: 'remove',
    isAsync: true,
    parameters: [{ name: 'id', type: 'string' }],
    returnType: `Promise<void>`,
    statements: `const entity = await this.findOne(id);\nawait this.repository.remove(entity);`
  });
}

function generateController(moduleName: string, entityName: string, fileName: string, controllerFile: SourceFile) {
  controllerFile.removeText();
  
  const className = toClassName(moduleName);
  
  controllerFile.addImportDeclaration({ moduleSpecifier: '@nestjs/common', namedImports: ['Controller', 'Get', 'Post', 'Body', 'Patch', 'Param', 'Delete', 'UseGuards'] });
  controllerFile.addImportDeclaration({ moduleSpecifier: '@nestjs/swagger', namedImports: ['ApiTags', 'ApiOperation', 'ApiBearerAuth'] });
  controllerFile.addImportDeclaration({ moduleSpecifier: '../common/guards/jwt-auth.guard', namedImports: ['JwtAuthGuard'] });
  controllerFile.addImportDeclaration({ moduleSpecifier: `./${moduleName}.service`, namedImports: [`${className}Service`] });
  controllerFile.addImportDeclaration({ moduleSpecifier: `./dto/create-${fileName}.dto`, namedImports: [`Create${entityName}Dto`] });
  controllerFile.addImportDeclaration({ moduleSpecifier: `./dto/update-${fileName}.dto`, namedImports: [`Update${entityName}Dto`] });

  const controllerClass = controllerFile.addClass({
    name: `${className}Controller`,
    isExported: true,
    decorators: [
      { name: 'ApiTags', arguments: [`'${className}'`] },
      { name: 'ApiBearerAuth', arguments: [] },
      { name: 'UseGuards', arguments: ['JwtAuthGuard'] },
      { name: 'Controller', arguments: [`'${moduleName}'`] }
    ]
  });

  controllerClass.addConstructor({
    parameters: [{
      name: 'service',
      type: `${className}Service`,
      scope: Scope.Private,
    }]
  }).replaceWithText(`  constructor(private readonly service: ${className}Service) {}`);

  controllerClass.addMethod({
    name: 'create',
    decorators: [
      { name: 'Post', arguments: [] },
      { name: 'ApiOperation', arguments: [`{ summary: 'Create a new ${entityName}' }`] }
    ],
    parameters: [{ name: 'createDto', type: `Create${entityName}Dto`, decorators: [{ name: 'Body', arguments: [] }] }],
    statements: `return this.service.create(createDto);`
  });

  controllerClass.addMethod({
    name: 'findAll',
    decorators: [
      { name: 'Get', arguments: [] },
      { name: 'ApiOperation', arguments: [`{ summary: 'Get all ${entityName}s' }`] }
    ],
    statements: `return this.service.findAll();`
  });

  controllerClass.addMethod({
    name: 'findOne',
    decorators: [
      { name: 'Get', arguments: [`':id'`] },
      { name: 'ApiOperation', arguments: [`{ summary: 'Get a ${entityName} by id' }`] }
    ],
    parameters: [{ name: 'id', type: 'string', decorators: [{ name: 'Param', arguments: [`'id'`] }] }],
    statements: `return this.service.findOne(id);`
  });

  controllerClass.addMethod({
    name: 'update',
    decorators: [
      { name: 'Patch', arguments: [`':id'`] },
      { name: 'ApiOperation', arguments: [`{ summary: 'Update a ${entityName}' }`] }
    ],
    parameters: [
      { name: 'id', type: 'string', decorators: [{ name: 'Param', arguments: [`'id'`] }] },
      { name: 'updateDto', type: `Update${entityName}Dto`, decorators: [{ name: 'Body', arguments: [] }] }
    ],
    statements: `return this.service.update(id, updateDto);`
  });

  controllerClass.addMethod({
    name: 'remove',
    decorators: [
      { name: 'Delete', arguments: [`':id'`] },
      { name: 'ApiOperation', arguments: [`{ summary: 'Delete a ${entityName}' }`] }
    ],
    parameters: [{ name: 'id', type: 'string', decorators: [{ name: 'Param', arguments: [`'id'`] }] }],
    statements: `return this.service.remove(id);`
  });
}

function generateModule(moduleName: string, entityName: string, fileName: string, moduleFile: SourceFile) {
  moduleFile.removeText();

  const className = toClassName(moduleName);

  moduleFile.addImportDeclaration({ moduleSpecifier: '@nestjs/common', namedImports: ['Module'] });
  moduleFile.addImportDeclaration({ moduleSpecifier: '@nestjs/typeorm', namedImports: ['TypeOrmModule'] });
  moduleFile.addImportDeclaration({ moduleSpecifier: `./${moduleName}.service`, namedImports: [`${className}Service`] });
  moduleFile.addImportDeclaration({ moduleSpecifier: `./${moduleName}.controller`, namedImports: [`${className}Controller`] });
  moduleFile.addImportDeclaration({ moduleSpecifier: `./entities/${fileName}.entity`, namedImports: [entityName] });

  moduleFile.addClass({
    name: `${className}Module`,
    isExported: true,
    decorators: [{
      name: 'Module',
      arguments: [`{
  imports: [TypeOrmModule.forFeature([${entityName}])],
  controllers: [${className}Controller],
  providers: [${className}Service],
  exports: [${className}Service],
}`]
    }]
  });
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

for (const mod of modulesToProcess) {
  console.log(`Processing module: ${mod}`);
  const modulePath = path.join(__dirname, 'src', mod);
  if (!fs.existsSync(modulePath)) continue;

  const entitiesDir = path.join(modulePath, 'entities');
  if (!fs.existsSync(entitiesDir)) continue;

  const files = fs.readdirSync(entitiesDir);
  const entityFile = files.find(f => f.endsWith('.entity.ts'));
  
  if (!entityFile) continue;

  const fileName = entityFile.replace('.entity.ts', '');
  
  const entitySource = project.getSourceFile(path.join(entitiesDir, entityFile));
  if (!entitySource) continue;

  const classes = entitySource.getClasses();
  if (classes.length === 0) continue;
  
  const entityClass = classes[0];
  const entityName = entityClass.getName();
  if (!entityName) continue;

  console.log(`  Found entity: ${entityName}`);

  // DTOs
  generateDto(entityName, entityClass.getProperties(), modulePath, fileName);

  // Service
  const serviceFile = project.getSourceFile(path.join(modulePath, `${mod}.service.ts`));
  if (serviceFile) {
    generateService(mod, entityName, fileName, serviceFile);
  } else {
    console.warn(`  Service file not found for ${mod}`);
  }

  // Controller
  const controllerFile = project.getSourceFile(path.join(modulePath, `${mod}.controller.ts`));
  if (controllerFile) {
    generateController(mod, entityName, fileName, controllerFile);
  } else {
    console.warn(`  Controller file not found for ${mod}`);
  }

  // Module
  const moduleFile = project.getSourceFile(path.join(modulePath, `${mod}.module.ts`));
  if (moduleFile) {
    generateModule(mod, entityName, fileName, moduleFile);
  } else {
    console.warn(`  Module file not found for ${mod}`);
  }
}

project.saveSync();
console.log('Done generating boilerplate!');
