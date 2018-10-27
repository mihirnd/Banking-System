import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NewUserComponent } from './new-user/new-user.component';


const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'fund-transfer', component: FundTransferComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'confirm', component: ConfirmationComponent},
    { path: 'new-user', component: NewUserComponent},
];

export const routes = RouterModule.forRoot(appRoutes);
