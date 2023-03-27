import 'styled-components';

//styled-component
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string,
    bgColor: string,
    accentColor: string,
  }
}