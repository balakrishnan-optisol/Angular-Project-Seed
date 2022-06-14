import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main-components/header/header.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { SidebarComponent } from './main-components/sidebar/sidebar.component';
import { TokenInterceptor } from './service/token.interceptor';
import { AuthService } from './service/auth.service';
import { ModuleGuard } from './service/module-guard.service';
import { AuthGuard } from './service/auth-guard.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state-management/index';
import { AuthEffects } from './state-management/userauth.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('user_auth', reducers),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      }
    },
    AuthService,
    ModuleGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
