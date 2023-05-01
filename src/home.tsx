import "./styles/quillstyle.css";
import "react-quill/dist/quill.snow.css";
import { Quill } from "react-quill";
import { ImageResize } from "quill-image-resize-module-ts";
import QuillToolbar from "./EditorToolBar";
import { Link } from "react-router-dom";
import TagCreater from "./Components/TagCreater";
import QuillCustom from "./Components/ReactQuill";

Quill.register("modules/ImageResize", ImageResize);

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["arial", "buri", "gangwon"];
Quill.register(Font, true);

function Home() {
  return (
    <div>
      <section>
        <Link to={"/letterTest"}>
          <button>letterTest</button>
        </Link>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "4px",
            }}
          >
            <TagCreater />
          </div>
          <QuillToolbar />
          <QuillCustom />
        </div>
      </section>
    </div>
  );
}

export default Home;
