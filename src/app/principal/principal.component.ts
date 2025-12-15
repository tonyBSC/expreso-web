import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { RouterModule } from "@angular/router";
import { RouterOutlet } from '@angular/router';
import { MenuResponsive } from "./components/menu-responsive/menu-responsive";

@Component({
  selector: 'app-principal',
  imports: [Navbar, RouterModule, RouterOutlet, MenuResponsive],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrincipalComponent { }
