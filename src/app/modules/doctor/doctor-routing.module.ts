import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewExamComponent } from "./components/new-exam/new-exam.component";

const routes: Routes = [

    // {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full'
    // },
    { path: 'new-Exam', component: NewExamComponent },



    // { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DoctorRoutingModule { }
