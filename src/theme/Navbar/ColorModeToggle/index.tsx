import React, {type ReactNode} from 'react';
import {useColorMode, useThemeConfig} from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import type {Props} from '@theme/Navbar/ColorModeToggle';

import styles from './styles.module.css';

/**
 * Swizzled navbar color-mode toggle.
 *
 * We keep `respectPrefersColorScheme: true` in the site config so first-time
 * visitors get their OS theme. By default that also turns the toggle into a
 * 3-state cycle (system -> light -> dark), which made the first click off
 * "system" only swap the icon without changing the theme.
 *
 * To get one-click toggling *and* OS-respect on first load, we drive the
 * button from the resolved `colorMode` (never null) and force the 2-state
 * transition by passing `respectPrefersColorScheme={false}` to the inner
 * toggle. First load still follows the OS; the first click then flips to the
 * opposite of whatever is currently showing.
 */
export default function NavbarColorModeToggle({className}: Props): ReactNode {
  const navbarStyle = useThemeConfig().navbar.style;
  const {disableSwitch} = useThemeConfig().colorMode;
  const {colorMode, setColorMode} = useColorMode();

  if (disableSwitch) {
    return null;
  }

  return (
    <ColorModeToggle
      className={className}
      buttonClassName={
        navbarStyle === 'dark' ? styles.darkNavbarColorModeToggle : undefined
      }
      respectPrefersColorScheme={false}
      value={colorMode}
      onChange={setColorMode}
    />
  );
}
