import { Signal, WritableSignal } from '@angular/core';

export type MenuItem = {
  Display?: 'Button' | 'Icon';
  Text?: string;
  Icon?: string;
  // AllowedRoles or Allowed arrow func
  Visible?: boolean | Signal<boolean>;
  Disabled?: boolean | Signal<boolean>;
  Tooltip?: string | Signal<string>;
} & (
  | {
      Type: 'Menu';
      Submenus: MenuItem[];
      SubmenuOpen?: boolean;
    }
  | {
      Type: 'Link';
      Link: string | string[]; // Equivalent to ActionRoute
    }
  | {
      Type: 'Action';
      Action: () => void;
    }
  | {
      Type: 'Select';
      Options: string[] | { Name: string; Value: unknown }[];
      Label?: string;
      Change?: (Value: unknown) => void;
      Value?: unknown;
    }
  | {
      Type: 'IconToggle';
      LeftIcon: string;
      RightIcon: string;
      Change?: (Value: boolean) => void;
      Value: WritableSignal<boolean>;
    }
  | {
      Type: 'Checkbox';
      Change?: (Value: boolean) => void;
      Value: WritableSignal<boolean>;
    }
);
