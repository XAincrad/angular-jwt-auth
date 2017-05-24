import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';

import { AppRoutingModule, routingComponents } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/shared/header/header.component';
import { FooterComponent }   from './pages/shared/footer/footer.component';
import { SidebarComponent }   from './pages/shared/sidebar/sidebar.component';
import { PagetitleComponent } from './pages/shared/pagetitle/pagetitle.component';

//services...
import { AuthService } from './codebase/services/auth/auth.service';
import { AuthapiService } from './codebase/services/auth/authapi.service';
import { AuthGuardService } from './codebase/services/auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent, routingComponents, HeaderComponent, FooterComponent, SidebarComponent, PagetitleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ AuthService, AuthapiService, AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
