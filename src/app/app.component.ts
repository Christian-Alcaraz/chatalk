import { Component, OnDestroy, OnInit } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import * as heroIconsMicro from '@ng-icons/heroicons/micro';
import * as heroIconsMini from '@ng-icons/heroicons/mini';
import * as heroIconsOutline from '@ng-icons/heroicons/outline';
import * as heroIconsSolid from '@ng-icons/heroicons/solid';
import * as iconSaxBold from '@ng-icons/iconsax/bold';
import * as iconSaxBulk from '@ng-icons/iconsax/bulk';
import * as iconSaxOutline from '@ng-icons/iconsax/outline';

import { RouterOutlet } from '@angular/router';

const compiledIcons = {
  ...iconSaxBold,
  ...iconSaxOutline,
  ...iconSaxBulk,
  ...heroIconsMicro,
  ...heroIconsMini,
  ...heroIconsOutline,
  ...heroIconsSolid,
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  viewProviders: [provideIcons(compiledIcons)],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chatalk';

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
