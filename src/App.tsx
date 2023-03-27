import './App.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './theme';
import {useRecoilValue} from 'recoil';
import { isDarkAtom } from './atom';
import Test from './Components/Test';
import { HashRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import Router from './Router';
import Editor from './Components/Editor';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body, p, div {
  font-weight: 300;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
  transition: all 1s ease-in;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  console.log(isDark);
  return (
    <div>
      <div>
        <ThemeProvider theme={isDark? DarkTheme:LightTheme}>
          <GlobalStyle />
          <HashRouter>
            <Routes>
              <Route path={'/'} element={<Editor />} />   
            </Routes>
          </HashRouter>
        </ThemeProvider>
      </div> 
    </div>
  );
}

export default App;



