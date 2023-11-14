import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserMasterComponent } from './user-master/user-master.component';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialCommonModule } from '../material-common/material-common.module';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { UserEntityService } from './service/user-entity.service';
import { UserDataService } from './service/user-data.service';

const entityMetaData: EntityMetadataMap = {
  User: {

  }
}

@NgModule({
  declarations: [
    UserMasterComponent,
    UserListComponent
  ],
  imports: [
    UserRoutingModule,
    MaterialCommonModule
  ],
  providers: [
    UserEntityService,
    UserDataService
  ]
})
export class UserModule {

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService
  ) {
    eds.registerMetadataMap(entityMetaData)
    entityDataService.registerService('User', userDataService)
  }
}
