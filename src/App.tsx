import "./App.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { DarkTheme, LightTheme } from "./theme";
import { isDarkAtom } from "./atom";
import CreatePage from "Components/Create";
import FindPage from "Components/Find";
import FindIdPage from "Components/FindId";
import FindPwPage from "Components/FindPw";
import LoginPage from "Components/Login";
import LetterTest from "Pages/LetterTest";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Editor from "Components/Editor";

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
  return (
    <div>
      <div>
        <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
          <GlobalStyle />
          <HashRouter>
            <Routes>
              <Route path={"/"} element={<Editor />} />
              <Route path={"/login"} element={<LoginPage />} />
              <Route path={"/find"} element={<FindPage />}>
                <Route path={"Id"} element={<FindIdPage />} />
                <Route path={"Pw"} element={<FindPwPage />} />
              </Route>
              <Route path={"/create"} element={<CreatePage />} />
              <Route path={"/letterTest"} element={<LetterTest />} />
            </Routes>
          </HashRouter>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
