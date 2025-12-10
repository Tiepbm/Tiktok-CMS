import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ value, onChange }) => {
    const editor = useRef(null);
    const [content, setContent] = useState(value || "");

    return (
        <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => {
                setContent(newContent);
                onChange(newContent);
            }}
            config={{
                readonly: false,
                height: 400,
                uploader: { insertImageAsBase64URI: true },
                toolbarAdaptive: false,
                placeholder: "Nhập nội dung bài viết...",
            }}
        />
    );
};

export default Editor;
